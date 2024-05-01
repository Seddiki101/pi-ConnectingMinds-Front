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
    const token = this.tokenService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.httpClient.get<userAdvanced[]>(`${this.baseUrl}/getAllUsers`, { headers: headers });
  }


  getAllAdmins(): Observable<userAdvanced[]> {
    const token = this.tokenService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.httpClient.get<userAdvanced[]>(`${this.baseUrl}/getAllAdmins`, { headers: headers });
  }

  blockUserById(id: number): Observable<any> {
    const token = this.tokenService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = { id: id };

    return this.httpClient.post(`${this.baseUrl}/BlockUser`, body, { headers: headers, responseType: 'text' });
  }



  blockUserById2(email: string): Observable<any> {
    const token = this.tokenService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = { email: email };

    return this.httpClient.post(`${this.baseUrl}/BlockUser`, body, { headers: headers, responseType: 'text' });
  }


  revoke(email: string): Observable<any> {
    const token = this.tokenService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = { email: email };

    return this.httpClient.post(`${this.baseUrl}/RevokeUser`, body, { headers: headers, responseType: 'text' });
  }

  giveAccess(email: string): Observable<any> {
    const token = this.tokenService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = { email: email };

    return this.httpClient.post(`${this.baseUrl}/giveAccess`, body, { headers: headers, responseType: 'text' });
  }


  searchUsers(keyword: string): Observable<userAdvanced[]> {
    const token = this.tokenService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.post<userAdvanced[]>(`${this.baseUrl}/searchUsers1`, { keyword }, { headers });
  }


  
  searchUsers2(keyword: string): Observable<userAdvanced[]> {
    const token = this.tokenService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.post<userAdvanced[]>(`${this.baseUrl}/searchUser`, { keyword }, { headers });
  }


}
