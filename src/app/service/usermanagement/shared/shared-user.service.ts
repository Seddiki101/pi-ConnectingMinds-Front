import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenService } from "../token-svc/token-service.service";
import { userAdvanced } from "../requestTypes/userAdvanced";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class SharedUserService {
  private baseUrl = environment.userApiUrl + "/back/user";

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) {}

  getUserData(): Observable<userAdvanced> {
    const token = this.tokenService.token;
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);

    return this.httpClient.get<userAdvanced>(`${this.baseUrl}/getUserData`, {
      headers: headers,
    });
  }

  getAllUsers(): Observable<userAdvanced[]> {
    const token = this.tokenService.token;
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);

    return this.httpClient.get<userAdvanced[]>(`${this.baseUrl}/all`, {
      headers: headers,
    });
  }

  getUserById(id: number): Observable<userAdvanced> {
    const token = this.tokenService.token;
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);

    return this.httpClient.get<userAdvanced>(`${this.baseUrl}/${id}`, {
      headers: headers,
    });
  }

  getUsersByIds(ids: number[]): Observable<userAdvanced[]> {
    const token = this.tokenService.token;
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);

    return this.httpClient.post<userAdvanced[]>(`${this.baseUrl}/ids`, ids, {
      headers: headers,
    });
  }

}
