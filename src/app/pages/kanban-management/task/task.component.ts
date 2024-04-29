import { Component, OnInit } from "@angular/core";
import { Status } from "src/app/models/enums/status";
import { Project } from "src/app/models/project/project.model";
import { Task } from "src/app/models/task/task.model";
import { Team } from "src/app/models/team/team.model";
import { ProjectService } from "src/app/service/kanban-management/project/project.service";
import { TaskService } from "src/app/service/kanban-management/task/task.service";
import { TeamService } from "src/app/service/kanban-management/team/team.service";
import { userAdvanced } from "src/app/service/usermanagement/requestTypes/userAdvanced";
import { SharedUserService } from "src/app/service/usermanagement/shared/shared-user.service";

@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.css"],
})
export class TaskComponent implements OnInit {
  projects: Project[] = [];
  selectedProject: Project | null = null;
  selectedTeam: Team | null = null;
  showKanbanBoard: boolean = false;
  tasks: Task[] = [];

  backlog: Task[] = [];
  todo: Task[] = [];
  doing: Task[] = [];
  done: Task[] = [];
  cachedUserData: userAdvanced[] = [];

  constructor(
    private projectService: ProjectService,
    private teamService: TeamService,
    private taskService: TaskService,
    private sharedUser: SharedUserService,

  ) {}

  ngOnInit(): void {
    this.loadProjects();
    this.loadSelectedValues();
    this.sharedUser.getAllUsers().subscribe((users) => {
      this.cachedUserData = users;
    });
  }

  loadProjects() {
    this.projectService.getAllProjects().subscribe((projects) => {
      this.projects = projects;
    });
  }

  loadSelectedValues() {
    const selectedProjectId = localStorage.getItem("selectedProjectId");
    const selectedTeamId = localStorage.getItem("selectedTeamId");
    if (selectedProjectId && selectedTeamId) {
      this.showKanbanBoard = true;
      this.projectService
        .getProjectById(parseInt(selectedProjectId))
        .subscribe((project) => {
          this.selectedProject = project;
          if (selectedProjectId) {
            this.teamService
              .getTeamById(parseInt(selectedTeamId))
              .subscribe((team) => {
                this.selectedTeam = team;
                if (this.selectedTeam?.tasks) {
                  this.tasks = this.selectedTeam.tasks;
                  this.updateTaskLists();
                  this.checkShowKanbanBoard();
                }
              });
          }
        });
    }
    this.sharedUser.getAllUsers().subscribe((users) => {
      this.cachedUserData = users;
    });
  }

  onProjectChange() {
    if (this.selectedProject && this.selectedProject.projectId) {
      localStorage.setItem(
        "selectedProjectId",
        this.selectedProject.projectId.toString()
      );
      localStorage.removeItem("selectedTeamId");
      this.selectedTeam = null;
      this.tasks = [];
      this.backlog = [];
      this.todo = [];
      this.doing = [];
      this.done = [];
      this.checkShowKanbanBoard();
    }
  }

  onTeamChange() {
    if (this.selectedTeam && this.selectedTeam.teamId) {
      localStorage.setItem(
        "selectedTeamId",
        this.selectedTeam.teamId?.toString()
      );
      if (this.selectedTeam.tasks) {
        this.tasks = this.selectedTeam.tasks;
      }
      this.updateTaskLists();
      this.checkShowKanbanBoard();
    }
  }

  checkShowKanbanBoard() {
    this.showKanbanBoard = !!this.selectedProject && !!this.selectedTeam;
  }

  updateTaskLists() {
    this.backlog = this.tasks.filter((task) => task.status === Status.BACKLOG);
    this.todo = this.tasks.filter((task) => task.status === Status.TODO);
    this.doing = this.tasks.filter((task) => task.status === Status.DOING);
    this.done = this.tasks.filter((task) => task.status === Status.DONE);
  }

  onDragStart(event: DragEvent, task: Task) {
    event.dataTransfer!.setData("text/plain", JSON.stringify(task));
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent, status: string) {
    event.preventDefault();
    const _status: Status = Status[status.toUpperCase() as keyof typeof Status];
    const taskData = event.dataTransfer!.getData("text/plain");
    const droppedTask: Task = JSON.parse(taskData);
    if (droppedTask.status !== _status) {
      droppedTask.status = _status;
      this.updateTaskStatus(droppedTask);
    }
  }

  updateTaskStatus(task: Task) {
    this.taskService.updateTask(task).subscribe(() => {
      // Reload tasks after updating
      this.loadSelectedValues();
    });
  }

  public get Status(): typeof Status {
    return Status;
  }
  getUserFullNameById(userId: number): string {
    const user = this.cachedUserData.find((u) => u.id === userId);
    return user ? `${user.firstName} ${user.lastName}` : "";
  }
}
