import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Project } from "src/app/models/project/project.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ProjectService {
  private baseUrl = environment.kanban + "project";
  constructor(private http: HttpClient) {}

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}`);
  }

  getProjectByOwnerId(id: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}/owner/${id}`);
  }

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/${id}`);
  }
  getProjectByName(name: String): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/unique-names/${name}`);
  }

  createProject(project: Project, file: File | null): Observable<Project> {
    const formData: FormData = new FormData();
    formData.append(
      "project",
      new Blob([JSON.stringify(project)], {
        type: "application/json",
      })
    );
    // Append file if it exists
    if (file) {
      formData.append("file", file, file.name); // Append file with its name
    }
    return this.http.post<Project>(`${this.baseUrl}`, formData);
  }
  updateProject(project: Project, file: File | null): Observable<Project> {
    const formData: FormData = new FormData();
    formData.append(
      "project",
      new Blob([JSON.stringify(project)], {
        type: "application/json",
      })
    );
    // Append file if it exists
    if (file) {
      formData.append("file", file, file.name); // Append file with its name
    }
    return this.http.put<Project>(`${this.baseUrl}`, formData);
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: "text" });
  }
}
