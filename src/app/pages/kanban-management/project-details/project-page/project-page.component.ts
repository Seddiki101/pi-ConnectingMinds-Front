import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Project } from "src/app/models/project/project.model";
import { ProjectService } from "src/app/service/kanban-management/project/project.service";
import { ProjectSharedDataService } from "src/app/service/kanban-management/shared-data/project-shared-data.service";

@Component({
  selector: "app-project-page",
  templateUrl: "./project-page.component.html",
  styleUrls: ["./project-page.component.css"],
})
export class ProjectPageComponent {
  project: Project = new Project();
  projectId: number;
  constructor(
    private projectSharedData: ProjectSharedDataService,
    private projectService: ProjectService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.projectId = +params["projectId"];
    });
    this.projectService.getProjectById(this.projectId).subscribe((project) => {
      if (project) {
        this.project = project;
        this.projectSharedData.setSelectedProject(project);
      }
    });
  }
}
