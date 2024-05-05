import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Conversation } from "src/app/models/conversation/conversation.model";
import { UserMessage } from "src/app/models/userMessage/user-message.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AiAssistantService {
  private baseUrl = environment.kanban + "/api/conversation";

  constructor(private http: HttpClient) {}

  getAllConversations(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(`${this.baseUrl}`);
  }
  getAllConversationsByUserId(userId: number): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(`${this.baseUrl}/user/${userId}`);
  }
  getConversationById(id: number): Observable<Conversation> {
    return this.http.get<Conversation>(`${this.baseUrl}/${id}`);
  }

  createOrUpdateConversation(
    message: string,
    userId?: number,
    conversationId?: number
  ): Observable<Conversation> {
    const userMessage: UserMessage = { message };
    const params = userId ? `?userId=${userId}` : "";
    const url = conversationId
      ? `${this.baseUrl}?conversationId=${conversationId}${params}`
      : `${this.baseUrl}${params}`;
    return this.http.post<Conversation>(url, userMessage);
  }

  deleteConversation(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: "text" });
  }
  
}
