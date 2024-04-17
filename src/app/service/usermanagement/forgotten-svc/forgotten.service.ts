import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgottenService {
  private baseUrl = 'http://localhost:8082/forgot_password'; 

  constructor(private httpClient: HttpClient) { }

  forgotPassword(email: string): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl, { email });
  }
}
