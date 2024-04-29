import { Injectable } from "@angular/core";
import { Project } from "src/app/models/project/project.model";

@Injectable({
  providedIn: "root",
})
export class ProjectSharedDataService {
  private localStorageKey = "selectedProject";

  setSelectedProject(project: Project) {
    // Save project data to localStorage
    localStorage.setItem(this.localStorageKey, JSON.stringify(project));
  }

  getSelectedProject(): Project | null {
    // Retrieve project data from localStorage
    const projectData = localStorage.getItem(this.localStorageKey);
    if (projectData) {
      return JSON.parse(projectData);
    } else {
      return null;
    }
  }
}
