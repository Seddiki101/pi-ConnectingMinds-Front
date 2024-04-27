import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Team } from "src/app/models/team/team.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class TeamService {
  private baseUrl = environment.kanban + "team";

  constructor(private http: HttpClient) {}
  getAllTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.baseUrl}`);
  }

  getTeamById(id: number): Observable<Team> {
    return this.http.get<Team>(`${this.baseUrl}/${id}`);
  }
  createTeam(
    projectId: number,
    team: Team,
    file: File | null
  ): Observable<Team> {
    const formData: FormData = new FormData();
    formData.append(
      "team",
      new Blob([JSON.stringify(team)], {
        type: "application/json",
      })
    );
    // Append file if it exists
    if (file) {
      formData.append("file", file, file.name); // Append file with its name
    }
    return this.http.post<Team>(`${this.baseUrl}/${projectId}`, formData);
  }

  updateTeam(team: Team, file: File | null): Observable<Team> {
    const formData: FormData = new FormData();
    formData.append(
      "team",
      new Blob([JSON.stringify(team)], {
        type: "application/json",
      })
    );
    // Append file if it exists
    if (file) {
      formData.append("file", file, file.name); // Append file with its name
    }
    return this.http.put<Team>(`${this.baseUrl}`, formData);
  }

  deleteTeam(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: "text" });
  }
}
