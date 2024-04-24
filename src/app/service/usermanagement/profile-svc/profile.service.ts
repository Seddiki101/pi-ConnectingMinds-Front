import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRegister } from '../../usermanagement/requestTypes/userRegister';
import { TokenService } from '../token-svc/token-service.service';
//import { UserRegister } from '../../service/usermanagement/requestTypes/userRegister'; 

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = 'http://localhost:8082'; 

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  getProfile(): Observable<UserRegister> {
   // const token = localStorage.getItem('auth_token');
    const token = this.tokenService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log("This is a log message of token "+this.tokenService.token);

    if(this.tokenService.isTokenValid() ) {  console.log("This is a log message : valid token"); }

    console.log("This is a log message of decoded token  "+this.tokenService.getTokenDetails() );

    return this.httpClient.get<UserRegister>( `${this.baseUrl}/profile` , { headers: headers });
  }



  updateProfile(user: UserRegister): Observable<any> {
    const token = this.tokenService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.put(`${this.baseUrl}/pofiledit`, user, { headers: headers });
  }



}
