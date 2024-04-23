import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_ENDPOINTS } from "src/app/config/endpoints";
import { Team } from "src/app/models/team/team.model";

@Injectable({
  providedIn: "root",
})
export class TeamService {
  private baseUrl = API_ENDPOINTS.kanban + "team";

  constructor(private http: HttpClient) {}
  getAllTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.baseUrl}`);
  }

  getTeamById(id: number): Observable<Team> {
    return this.http.get<Team>(`${this.baseUrl}/${id}`);
  }

  createTeam(projectId: number, team: Team): Observable<Team> {
    return this.http.post<Team>(`${this.baseUrl}/${projectId}`, team);
  }

  updateTeam(team: Team): Observable<Team> {
    return this.http.put<Team>(`${this.baseUrl}`, team);
  }

  deleteTeam(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: "text" });
  }
}
