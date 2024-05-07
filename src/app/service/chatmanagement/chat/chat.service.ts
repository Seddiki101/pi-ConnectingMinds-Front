import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private baseUrl: string = 'http://localhost:8083/chats';

  constructor(private http: HttpClient) {}

  deleteChat(chatId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${chatId}`, { responseType: 'text' });
  }
}
