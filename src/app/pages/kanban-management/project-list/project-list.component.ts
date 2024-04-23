import { Component } from '@angular/core';
import { Project } from 'src/app/models/project/project.model';
import { ProjectService } from 'src/app/service/kanban-management/project/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent {
  projects?: Project[];
  constructor(private projectService: ProjectService) {}
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
}
