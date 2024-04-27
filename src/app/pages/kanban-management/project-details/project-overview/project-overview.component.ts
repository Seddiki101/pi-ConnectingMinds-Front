import { Component, OnInit } from "@angular/core";
import { Project } from "src/app/models/project/project.model";
import { ProjectSharedDataService } from "src/app/service/kanban-management/shared-data/project-shared-data.service";
import { TaskService } from "src/app/service/kanban-management/task/task.service";
import { SharedUserService } from "src/app/service/usermanagement/shared/shared-user.service";

@Component({
  selector: "app-project-overview",
  templateUrl: "./project-overview.component.html",
  styleUrls: ["./project-overview.component.css"],
})
export class ProjectOverviewComponent implements OnInit {
  project: Project | null;
  estimatedTime: number | null;
  upcomingTasks: any[] = [];

  constructor(
    private projectSharedData: ProjectSharedDataService,
    private taskService: TaskService,
    private sharedUserService: SharedUserService
  ) {}
  ngOnInit() {
    this.project = this.projectSharedData.getSelectedProject();
    this.calculateEstimatedTime();
    if (this.project) {
      this.taskService
        .getUpcomingTasksByProjectId(this.project.projectId)
        .subscribe(
          (tasks: any[]) => {
            // For each task, retrieve the associated user information
            tasks.forEach((task) => {
              this.sharedUserService.getUserById(task.memberId).subscribe(
                (user: any) => {
                  // Construct the task object with user information
                  const upcomingTask = {
                    memberId: task.memberId,
                    memberName: user.firstName + " " + user.lastName,
                    //memberAvatarUrl: user.avatarUrl,
                    name: task.name,
                    deadline: task.deadline,
                  };
                  // Add the task to the list of upcoming tasks
                  this.upcomingTasks.push(upcomingTask);
                },
                (error) => {
                  console.error("Error fetching user:", error);
                }
              );
            });
          },
          (error) => {
            console.error("Error fetching tasks:", error);
          }
        );
    }
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
  calculateDaysUntilLaunch(): number {
    var differenceInDays: number = 0;
    if (this.project && this.project.startDate && this.project.endDate) {
      const currentDate = new Date();
      const oneDay = 1000 * 60 * 60 * 24;
      const parsedDate = new Date(this.project.endDate);
      const differenceInMilliseconds =
        parsedDate.getTime() - currentDate.getTime();
      differenceInDays = differenceInMilliseconds / oneDay;
    }
    return Math.round(differenceInDays);
  }
}
