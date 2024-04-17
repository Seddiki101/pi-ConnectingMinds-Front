import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userLogin } from '../requestTypes/userLogin';
import { LoginResponse } from '../responses/LoginResponse'; // Make sure the path is correct

@Injectable({
  providedIn: 'root'
})
export class LoginuserService {
  private baseUrl = "http://localhost:8082/login";

  constructor(private httpClient: HttpClient) {}

  loginUser(user: userLogin): Observable<LoginResponse> { // Use LoginResponse here
    console.log(user);
    return this.httpClient.post<LoginResponse>(this.baseUrl, user);
  }
}
