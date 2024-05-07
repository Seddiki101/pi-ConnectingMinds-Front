import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Project } from "src/app/models/project/project.model";
import { ProjectService } from "src/app/service/kanban-management/project/project.service";
import { ProjectSharedDataService } from "src/app/service/kanban-management/shared-data/project-shared-data.service";
import { TaskService } from "src/app/service/kanban-management/task/task.service";
import { AuthenticService } from "src/app/service/usermanagement/authentic/authentic.service";
import { SharedUserService } from "src/app/service/usermanagement/shared/shared-user.service";

@Component({
  selector: "app-project-overview",
  templateUrl: "./project-overview.component.html",
  styleUrls: ["./project-overview.component.css"],
})
export class ProjectOverviewComponent implements OnInit {
  estimatedTime: number | null;
  upcomingTasks: any[] = [];
  project: Project | null;
  projectId: number;
  ownerId:number;
  constructor(
    private projectSharedData: ProjectSharedDataService,
    private taskService: TaskService,
    private sharedUserService: SharedUserService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private authenticService: AuthenticService
  ) {}
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.projectId = +params["projectId"];
      this.authenticService.getId().subscribe((id) => {
        this.ownerId = id;
      });
      if (!isNaN(this.projectId)) {
        this.projectService
          .getProjectById(this.projectId)
          .subscribe((project) => {
            if (project) {
              this.project = project;
              this.projectSharedData.setSelectedProject(project);
              this.loadLatestTasks();
              this.calculateEstimatedTime();
            }
          });
      } else {
        this.project = this.projectSharedData.getSelectedProject();
        this.loadLatestTasks();
        this.calculateEstimatedTime();
      }
    });
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

  loadLatestTasks() {
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
                    deadline: new Date(task.deadLine),
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
}
