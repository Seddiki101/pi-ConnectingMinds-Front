import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Notification } from "src/app/models/notification/notification.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  private baseUrl = environment.forum + "/api/notification";
  constructor(private http: HttpClient) {}

  getAllNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.baseUrl);
  }
  getRecentNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.baseUrl}/recent`);
  }
  getNotification(id: number): Observable<Notification> {
    return this.http.get<Notification>(`${this.baseUrl}/${id}`);
  }

  createNotification(notification: Notification): Observable<Notification> {
    return this.http.post<Notification>(this.baseUrl, notification);
  }

  updateNotification(notification: Notification): Observable<Notification> {
    return this.http.put<Notification>(this.baseUrl, notification);
  }

  deleteNotification(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: "text" });
  }
}
