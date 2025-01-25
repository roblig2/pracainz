import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.backendUrl;
  constructor(private http:HttpClient) { }

  login(credential: any):Observable<any> {
    return this.http.post(`${this.apiUrl}/login`,credential)
  }
}
