import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetpassService {
  private baseUrl = 'http://localhost:8082/reset_password';

  constructor(private httpClient: HttpClient) { }

  resetPassword(token: string, newPassword: string): Observable<any> {
    // Construct HttpParams

console.log("this is token "+ token + "" )

    let params = new HttpParams()
      .set('token', token)
      .set('password', newPassword);

    return this.httpClient.post<any>(this.baseUrl, null, { params: params });
  }
}
