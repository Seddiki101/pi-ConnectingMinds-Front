import { Component, OnInit } from "@angular/core";
import { Project } from "src/app/models/project/project.model";
import { ProjectService } from "src/app/service/kanban-management/project/project.service";
import { ProjectSharedDataService } from "src/app/service/kanban-management/shared-data/project-shared-data.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-project-grid",
  templateUrl: "./project-grid.component.html",
  styleUrls: ["./project-grid.component.css"],
})
export class ProjectGridComponent implements OnInit {
  projects?: Project[];
  constructor(
    private projectService: ProjectService,
    private projectSharedData: ProjectSharedDataService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loadProjects();
  }
  loadProjects(): void {
    this.projectService.getProjectByOwnerId(1).subscribe(
      (projects: Project[]) => {
        this.projects = projects;
      },
      (error) => {
        console.error("Error loading projects:", error);
      }
    );
  }
  deleteProject(projectId: number): void {
    if (confirm("Are you sure you want to delete this project?")) {
      this.projectService.deleteProject(projectId).subscribe(
        () => {
          console.log("Project deleted successfully");
          // Reload the list of projects after deletion
          this.loadProjects();
        },
        (error) => {
          console.error("Error deleting project:", error);
        }
      );
    }
  }
  onSelectProject(project: Project): void {
    this.projectSharedData.setSelectedProject(project);
    this.router.navigate(["/project-management/project-page"]);
  }
}
