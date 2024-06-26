import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchChatService {

  private baseUrl: string = 'http://localhost:8083/chats';

  constructor(private http: HttpClient) { }

  getChat(chatId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${chatId}`);
  }
}