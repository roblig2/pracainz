import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Event} from '../models/event';
import {Pageable} from "../models/Pageable";
import {environment} from "../../environments/environment";
import {ErrorDialogComponent} from "../shared/error-dialog/error-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ResponseMessage} from "../models/response-message";

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = environment.backendUrl;
  constructor(private http: HttpClient,private dialog: MatDialog) {
  }
  getEventById(id:string):Observable<Event>{
    return this.http.get<Event>(`${this.apiUrl}/events/${id}`)
  }
  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(`${this.apiUrl}/events`, event);
  }

  editEvent(event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/events`, event);
  }

  getEvents(page: number, size: number, filters: any = null): Observable<Pageable<Event>> {
    return this.http.post<Pageable<Event>>(`${this.apiUrl}/eventList`, {...filters,page,size});
  }
  getUserEvents(page: number, size: number, filters: any = null): Observable<Pageable<Event>> {
    return this.http.post<Pageable<Event>>(`${this.apiUrl}/userEventList`, {...filters,page,size});
  }

  acceptEvent(id: string) {
    return this.http.put<Event>(`${this.apiUrl}/events/userConfirmation`, id);
  }

  deleteEvent(id: string): Observable<ResponseMessage> {
    return this.http.delete<ResponseMessage>(`${this.apiUrl}/events/${id}`);
  }
}
