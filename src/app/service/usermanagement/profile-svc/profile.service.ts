import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRegister } from '../../usermanagement/requestTypes/userRegister';
import { TokenService } from '../token-svc/token-service.service';
import { environment } from 'src/environments/environment.development';
//import { UserRegister } from '../../service/usermanagement/requestTypes/userRegister'; 

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = environment.userApiUrl; 

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  getProfile(): Observable<UserRegister> {

    const token = this.tokenService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log("This is a log message of token "+this.tokenService.token);

    if(this.tokenService.isTokenValid() ) {  console.log("This is a log message : valid token"); }

    console.log("This is a log message of decoded token  "+this.tokenService.getTokenDetails() );

    return this.httpClient.get<UserRegister>( `${this.baseUrl}/utils/profile` , { headers: headers });
  }



  updateProfile(user: UserRegister): Observable<any> {
    const token = this.tokenService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.put(`${this.baseUrl}/utils/profiledit`, user, { headers: headers });
  }



}
