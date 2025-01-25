import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import {environment} from "../../environments/environment";
import {Pageable} from "../models/Pageable";
import {Event} from "../models/event";
import {Availability} from "../components/availability/model/Availability";
import {Password} from "../models/password";
import {ResponseMessage} from "../models/response-message";
import {parseDate} from "../shared/autocomplete/DateUtils";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.backendUrl;

  constructor(private http: HttpClient) {
  }

  getUsersByDate(date: Date): Observable<User[]> {
    return this.http.post<User[]>(`${this.apiUrl}/users/availableUsers`,date);
  }
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users/create`, user);
  }

  editUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/update`, user);
  }

  changePassword(passwords:Password):Observable<any>{
    return this.http.put<Password>(`${this.apiUrl}/users/changePassword`,passwords)
  }

  updateUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  getUsers(page: number, size: number, filters: any = null): Observable<Pageable<User>> {
    return this.http.post<Pageable<User>>(`${this.apiUrl}/users`, {...filters,page,size});
  }

  getAvailability(page: number, size: number, filters: any = null) {
    return this.http.post<Pageable<Availability>>(`${this.apiUrl}/workdaysList`, {...filters,page,size});
  }

  deleteAvailability(date: string) {
    return this.http.delete<any>(`${this.apiUrl}/users/availableUsers/${date}`);
  }

  getSelf():Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users`);
  }

  deleteUser(id: string) :Observable<ResponseMessage>{
    return this.http.delete<ResponseMessage>(`${this.apiUrl}/users/${id}`);
  }
}
