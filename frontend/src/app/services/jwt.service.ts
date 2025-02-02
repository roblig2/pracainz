import {Injectable} from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import {BehaviorSubject, Observable} from "rxjs";
import {RoleEnum} from "../models/role.enum";

const TOKEN = "token";

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor() { }

  setToken(token: string) {
    localStorage.setItem(TOKEN, token);
    this.loggedIn.next(!!token);
  }

  getToken():string|null{
    let token = localStorage.getItem(TOKEN);
    this.loggedIn.next(!!token);
    return token;
  }
  isLoggedIn():boolean{
    let token = localStorage.getItem(TOKEN);
    return token != null && this.notExpired(token);
  }
  isLoggedInContinuesCheck(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
  private notExpired(token: string) {
    let tokendDecoded = jwtDecode<any>(token);

    let isNotExpired = (tokendDecoded.exp * 1000) > new Date().getTime();
    if (!isNotExpired) {
      localStorage.removeItem(TOKEN);
    }
    return isNotExpired;
  }

  private parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  logout() {
    localStorage.removeItem(TOKEN);
    this.loggedIn.next(false);
    return true;
  }

  getRoles():string[] {
    const token = this.getToken();
    return token ? this.parseJwt(token)?.autorities : [];
  }
  isAdmin():boolean{
    let roles = this.getRoles();
    return (roles && roles.includes(RoleEnum.ADMIN));
  }

  isUser() {
    let roles = this.getRoles();
    return (roles && roles.includes(RoleEnum.ADMIN) || roles.includes(RoleEnum.USER));
  }
}
