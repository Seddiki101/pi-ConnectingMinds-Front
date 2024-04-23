import { Component, OnInit } from "@angular/core";
import { Project } from "src/app/models/project/project.model";
import { ProjectSharedDataService } from "src/app/service/kanban-management/shared-data/project-shared-data.service";

@Component({
  selector: "app-project-overview",
  templateUrl: "./project-overview.component.html",
  styleUrls: ["./project-overview.component.css"],
})
export class ProjectOverviewComponent implements OnInit {
  project: Project | null;
  estimatedTime: number | null;

  constructor(private projectSharedData: ProjectSharedDataService) {}
  ngOnInit() {
    this.project = this.projectSharedData.getSelectedProject();
    this.calculateEstimatedTime();
    console.log(this.project?.endDate);
    console.log(this.estimatedTime);
  }
  calculateEstimatedTime(): void {
    if (this.project && this.project.startDate && this.project.endDate) {
      const startDate = new Date(this.project.startDate);
      const endDate = new Date(this.project.endDate);

      if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
        const oneDay = 1000 * 60 * 60 * 24; // milliseconds in a day
        const differenceInMilliseconds = Math.abs(
          endDate.getTime() - startDate.getTime()
        );
        this.estimatedTime = Math.round(differenceInMilliseconds / oneDay);
      } else {
        this.estimatedTime = null; // Handle invalid dates
      }
    } else {
      this.estimatedTime = null; // Handle missing startDate or endDate
    }
  }
}
