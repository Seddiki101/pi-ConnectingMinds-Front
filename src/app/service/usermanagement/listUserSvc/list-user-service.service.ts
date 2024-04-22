import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { userAdvanced } from '../requestTypes/userAdvanced'; // Adjust the path as necessary
import { TokenService } from '../token-svc/token-service.service';

@Injectable({
  providedIn: 'root'
})
export class ListUserService {
  private baseUrl = 'http://localhost:8082/admin_only';

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  getAllUsers(): Observable<userAdvanced[]> {
    //const token = localStorage.getItem('auth_token');
    const token = this.tokenService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.httpClient.get<userAdvanced[]>(`${this.baseUrl}/getAllUsers`, { headers: headers });
  }

  blockUserById(id: number): Observable<any> {
    const token = this.tokenService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = { id: id };

    return this.httpClient.post(`${this.baseUrl}/BlockUser`, body, { headers: headers, responseType: 'text' });
  }


  searchUsers(keyword: string): Observable<userAdvanced[]> {
    const token = this.tokenService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.post<userAdvanced[]>(`${this.baseUrl}/searchUsers`, { keyword }, { headers });
  //return this.httpClient.post<userAdvanced[]>(`${this.baseUrl}/searchUsers`, { keyword });
  }



}
