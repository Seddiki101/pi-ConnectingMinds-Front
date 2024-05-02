import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Event } from "src/app/models/event/event.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class EventService {
  private baseUrl = environment.kanban + "/api/event";

  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.baseUrl);
  }

  getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.baseUrl}/${id}`);
  }

  createEvent(teamId: number, event: Event): Observable<Event> {
    return this.http.post<Event>(`${this.baseUrl}/${teamId}`, event);
  }

  updateEvent(event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.baseUrl}`, event);
  }

  deleteEvent(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: "text" });
  }
}
