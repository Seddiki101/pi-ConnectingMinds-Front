import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Status } from "src/app/models/enums/status";
import { Project } from "src/app/models/project/project.model";
import { Task } from "src/app/models/task/task.model";
import { Team } from "src/app/models/team/team.model";
import { ProjectService } from "src/app/service/kanban-management/project/project.service";
import { TaskService } from "src/app/service/kanban-management/task/task.service";
import { TeamService } from "src/app/service/kanban-management/team/team.service";
import { CoreService } from "src/app/service/notificationDialog/core.service";
import { userAdvanced } from "src/app/service/usermanagement/requestTypes/userAdvanced";
import { SharedUserService } from "src/app/service/usermanagement/shared/shared-user.service";
import { AddEditTaskComponent } from "../add-edit-task/add-edit-task.component";

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
    private _coreService: CoreService,
    private dialog: MatDialog
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
    if (this.selectedProject && this.selectedTeam) {
      if (this.selectedProject.projectId && this.selectedTeam.teamId) {
        this.teamService
          .getTeamById(this.selectedTeam.teamId)
          .subscribe((team) => {
            if (team.tasks) {
              this.tasks = team.tasks;
              this.updateTaskLists();
              this.checkShowKanbanBoard();
            }
          });
      }
    } else {
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
                  if (team.tasks) {
                    this.tasks = team.tasks;
                    this.selectedTeam = team;
                    this.updateTaskLists();
                    this.checkShowKanbanBoard();
                  }
                });
            }
          });
      }
    }
  }

  onProjectChange() {
    if (this.selectedProject && this.selectedProject.projectId) {
      localStorage.setItem(
        "selectedProjectId",
        this.selectedProject.projectId.toString()
      );
      this.resetKanBan();
    } else {
      this.resetKanBan();
    }
  }
  resetKanBan() {
    localStorage.removeItem("selectedTeamId");
    this.selectedTeam = null;
    this.tasks = [];
    this.backlog = [];
    this.todo = [];
    this.doing = [];
    this.done = [];
    this.checkShowKanbanBoard();
  }
  onTeamChange() {
    if (this.selectedTeam && this.selectedTeam.teamId) {
      localStorage.setItem(
        "selectedTeamId",
        this.selectedTeam.teamId?.toString()
      );
      if (this.selectedTeam && this.selectedTeam.tasks) {
        this.tasks = this.selectedTeam.tasks;
        this.loadSelectedValues();
        this.checkShowKanbanBoard();
      }
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

  openAddEditTaskForm(task?: Task, teamId?: number, status?: Status): void {
    if (task) {
      const dialogRef = this.dialog.open(AddEditTaskComponent, {
        data: { task }, // Pass the team data if editing
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          // Handle any necessary actions after the modal closes
          // Example: Refresh the task list
          this.loadSelectedValues();
        }
      });
    } else {
      const dialogRef = this.dialog.open(AddEditTaskComponent, {
        data: { teamId, status }, // Pass the team data if editing
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          // Handle any necessary actions after the modal closes
          // Example: Refresh the task list

          this.loadSelectedValues();
        }
      });
    }
  }

  onDeleteTask(taskId: number) {
    if (confirm("Are you sure you want to delete this task?")) {
      this.taskService.deleteTask(taskId).subscribe((response) => {
        if (response) {
          this._coreService.openSnackBar(
            "Task deleted successfully!",
            "done",
            2000
          );
          this.loadSelectedValues();
        } else {
          this._coreService.openSnackBar("error deleting task!", "Error", 2000);
        }
      });
    }
  }
  onMarkDone(task: Task) {
    task.status = Status.DONE;
    this.taskService.updateTask(task).subscribe((Response) => {
      if (Response) {
        this._coreService.openSnackBar("Good Job !", "done", 2000);
        this.loadSelectedValues();
      } else {
        this._coreService.openSnackBar("Error occurs", "error", 2000);
      }
    });
  }
}
