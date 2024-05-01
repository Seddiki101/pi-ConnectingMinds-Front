import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticService {

  constructor(private router: Router , private http: HttpClient) { }

  endSession() {

    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.http.post('http://localhost:8082/logout', {});
   
  }

}
