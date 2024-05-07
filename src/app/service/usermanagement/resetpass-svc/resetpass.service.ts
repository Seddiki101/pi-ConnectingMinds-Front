import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ResetpassService {
  private baseUrl = environment.userApiUrl+'/auth/reset_password';

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
