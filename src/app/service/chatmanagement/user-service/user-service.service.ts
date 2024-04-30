import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../../usermanagement/token-svc/token-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private apiUrl = 'http://localhost:8082/back/user/getUserData'; // URL to your backend endpoint

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getUserProfile(): Observable<any> { // Using any since no User model is defined
    const token = this.tokenService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    if(this.tokenService.isTokenValid() ) {  console.log("This is a log message : valid token"); }
    console.log("This is a log message of decoded token  "+this.tokenService.getTokenDetails() );
    return this.http.get<any>(this.apiUrl, { headers: headers });
  }
}
