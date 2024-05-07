import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { User } from '../requestTypes/userLogin';
import { Observable } from 'rxjs';
import { UserRegister } from '../requestTypes/userRegister';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  user:UserRegister= new UserRegister();
  private baseUrl= environment.userApiUrl+"/auth/register";
  constructor(private httpClient:HttpClient) {
    
   }
   
   registerUser(user: UserRegister): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}`, user);
}



  }
