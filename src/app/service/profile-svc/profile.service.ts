import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRegister } from '../../service/requestTypes/userRegister'; 

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = 'http://localhost:8082/profile'; 

  constructor(private httpClient: HttpClient) { }

  getProfile(): Observable<UserRegister> {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.get<UserRegister>(this.baseUrl, { headers: headers });
  }
}
