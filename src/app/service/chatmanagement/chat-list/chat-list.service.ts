import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IChatPreview } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ChatListService {
  private baseUrl = 'http://localhost:8083/chats/user';

  constructor(private http: HttpClient) {}

  getChatsForUser(userId: number): Observable<IChatPreview[]> {
    return this.http.get<IChatPreview[]>(`${this.baseUrl}/${userId}`);
  }
}