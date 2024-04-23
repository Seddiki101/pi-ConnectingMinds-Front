import { Component, OnInit } from "@angular/core";
import { Project } from "src/app/models/project/project.model";
import { ProjectSharedDataService } from "src/app/service/kanban-management/shared-data/project-shared-data.service";

@Component({
  selector: "app-project-page",
  templateUrl: "./project-page.component.html",
  styleUrls: ["./project-page.component.css"],
})
export class ProjectPageComponent implements OnInit {
  project: Project | null;
  constructor(private projectSharedData: ProjectSharedDataService) {}
  ngOnInit() {
    this.project = this.projectSharedData.getSelectedProject();
    console.log(this.project);
  }
}
