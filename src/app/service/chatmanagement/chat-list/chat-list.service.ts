import { ListUserService } from './../../usermanagement/listUserSvc/list-user-service.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IChatPreview } from 'src/app/shared/interfaces';
import { TokenService } from '../../usermanagement/token-svc/token-service.service';

@Injectable({
  providedIn: 'root'
})
export class ChatListService {
  private baseUrl = 'http://localhost:8083/chats/user';

  constructor(private http: HttpClient , private tokenService: TokenService) {}

  getChatsForUser(userId: number): Observable<IChatPreview[]> {
    const headers = this.tokenService.getHeaders();
    return this.http.get<IChatPreview[]>(`${this.baseUrl}/${userId}`, {headers});
  }
}