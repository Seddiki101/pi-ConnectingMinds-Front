import { Injectable } from "@angular/core";
import { Project } from "src/app/models/project/project.model";

@Injectable({
  providedIn: "root",
})
export class ProjectSharedDataService {
  private selectedProject: Project | null = null;

  setSelectedProject(project: Project) {
    this.selectedProject = project;
  }

  getSelectedProject() {
    return this.selectedProject;
  }
}
