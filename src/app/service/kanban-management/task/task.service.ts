import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Task } from "src/app/models/task/task.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  private baseUrl = environment.kanban + "task";

  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/${id}`);
  }

  getUpcomingTasksByProjectId(projectId: number |  undefined ): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/project/${projectId}`);
  }

  createTask(teamId: number, task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/${teamId}`, task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(this.baseUrl, task);
  }

  deleteTask(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/${id}`);
  }
}
