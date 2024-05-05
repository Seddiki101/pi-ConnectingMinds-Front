import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  set token(token: string) {
    localStorage.setItem('token', token);
  }

  get token() {
    return localStorage.getItem('token') as string;
  }

  isTokenValid() {
    const token = this.token;
    if (!token) {
      return false;
    }
    // decode the token
    const jwtHelper = new JwtHelperService();
    // check expiry date
    const isTokenExpired = jwtHelper.isTokenExpired(token);
    if (isTokenExpired) {
      localStorage.clear();
      return false;
    }
    return true;
  }

  isTokenNotValid() {
    return !this.isTokenValid();
  }

  get userRoles(): string[] {
    const token = this.token;
    if (token) {
      const jwtHelper = new JwtHelperService();
      const decodedToken = jwtHelper.decodeToken(token);
      const roles = decodedToken.roles as string[]; // Ensure this key matches your token's claim for roles
      return roles || [];
    }
    return [];
  }
  /*
  get userRoles(): string[] {
    const token = this.token;
    if (token) {
      const jwtHelper = new JwtHelperService();
      const decodedToken = jwtHelper.decodeToken(token);
      console.log(decodedToken.authorities);
      return decodedToken.authorities;
    }
    return [];
  }
*/

getTokenDetails() {
  const token = this.token;
  if (token) {
    const jwtHelper = new JwtHelperService();
    const decodedToken = jwtHelper.decodeToken(token);
    console.log('Token Details:', decodedToken);
    return decodedToken; // Return the decoded token
  } else {
    console.log('No token found');
    return null;
  }
}


getName(): string | null {
  const token = this.token;
  if (token) {
    const jwtHelper = new JwtHelperService();
    const decodedToken = jwtHelper.decodeToken(token);
    return decodedToken.firstname; // Make sure the claim name matches the one in your token
  }
  return null;
}


getEmail(): string | null {
  const token = this.token;
  if (token) {
    const jwtHelper = new JwtHelperService();
    const decodedToken = jwtHelper.decodeToken(token);
    return decodedToken.sub; 
  }
  return null;
}


getPic():string | null {
  const token = this.token;
  if (token) {
  const name =  this.getName();
  if (name) {
    const firstLetter = name[0].toUpperCase(); 
    return `assets/profl/${firstLetter}.png`;
  }
}
return null;
}


 getHeaders(): HttpHeaders {
  const token = this.token;
  return new HttpHeaders().set('Authorization', `Bearer ${token}`);
}


}