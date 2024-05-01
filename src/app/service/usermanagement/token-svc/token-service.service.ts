import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  useLocalStorage: boolean = true; // Default to using localStorage

  set token(token: string) {
    if (this.useLocalStorage) {
      localStorage.setItem('token', token);
    } else {
      sessionStorage.setItem('token', token);
    }
  }

  get token() {
    // Try to get from sessionStorage first if localStorage is not used
    let token = this.useLocalStorage ? localStorage.getItem('token') : sessionStorage.getItem('token');
    return token as string;
  }

  clearToken() {
    if (this.useLocalStorage) {
      localStorage.removeItem('token');
    } else {
      sessionStorage.removeItem('token');
    }
  }

  isTokenValid(): boolean {
    const token = this.token;
    if (!token) {
      return false;
    }
    const jwtHelper = new JwtHelperService();
    const isTokenExpired = jwtHelper.isTokenExpired(token);
    if (isTokenExpired) {
      this.clearToken();
      return false;
    }
    return true;
  }



  isTokenNotValid() {
    return !this.isTokenValid();
  }

  getUserRoles(): string | null {
    const token = this.token;
    if (token) {
      const jwtHelper = new JwtHelperService();
      const decodedToken = jwtHelper.decodeToken(token);
      const roles = decodedToken.guise ; 
      return roles || null ;
    }
    return null;
  }
  

  getUserRole(): string | null {
    const token = this.token;
    if (token) {
      const jwtHelper = new JwtHelperService();
      const decodedToken = jwtHelper.decodeToken(token);
      const roles = decodedToken.guise ;
      var userRole:string = "" ;
      if (roles=="69") userRole = "ADMIN";
      else if (roles=="420") userRole = "USER";
      

      return userRole || null ;
    }
    return null;
  }


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

getLastName(): string | null {
  const token = this.token;
  if (token) {
    const jwtHelper = new JwtHelperService();
    const decodedToken = jwtHelper.decodeToken(token);
    return decodedToken.lastname; 
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


private getHeaders(): HttpHeaders {
  const token = this.token;
  return new HttpHeaders().set('Authorization', `Bearer ${token}`);
}


}