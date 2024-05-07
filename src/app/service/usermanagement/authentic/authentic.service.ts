import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../token-svc/token-service.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticService {

  private apiUrl = environment.userApiUrl; // Base URL for API
  private logoutUrl = "http://localhost:8082";

  constructor(
    private router: Router,
    private http: HttpClient,
    private tokenService: TokenService  // Inject TokenService
  ) { }

  endSession() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.http.post(`${this.logoutUrl}/logout`, {}, { headers: this.tokenService.getHeaders() }).subscribe();
  }

  getId(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/back/getUserSpot`, { headers: this.tokenService.getHeaders() });
  }

}


/*
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
*/