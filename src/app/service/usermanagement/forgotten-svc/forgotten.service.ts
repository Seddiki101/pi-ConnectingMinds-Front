import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ForgottenService {
  private baseUrl = environment.userApiUrl+'/auth/forgot_password'; 

  constructor(private httpClient: HttpClient) { }

  forgotPassword(email: string): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl, { email });
  }
}
