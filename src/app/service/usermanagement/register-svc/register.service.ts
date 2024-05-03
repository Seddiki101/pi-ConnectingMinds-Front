import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { User } from '../requestTypes/userLogin';
import { Observable } from 'rxjs';
import { UserRegister } from '../requestTypes/userRegister';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  user:UserRegister= new UserRegister();
  private baseUrl="http://localhost:8082/register";
  constructor(private httpClient:HttpClient) {
    
   }
   
   registerUser(user: UserRegister): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}`, user);
}

   /*
   registerUser(user:User):Observable<Object>{
    console.log(user)

    return this.httpClient.post(`${this.baseUrl}`,user)

   }
   */

  }
