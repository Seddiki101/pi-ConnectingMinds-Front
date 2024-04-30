import { DatePipe } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Priority } from "src/app/models/enums/priority";
import { Task } from "src/app/models/task/task.model";
import { Team } from "src/app/models/team/team.model";
import { TaskService } from "src/app/service/kanban-management/task/task.service";
import { TeamService } from "src/app/service/kanban-management/team/team.service";
import { CoreService } from "src/app/service/notificationDialog/core.service";
import { userAdvanced } from "src/app/service/usermanagement/requestTypes/userAdvanced";
import { SharedUserService } from "src/app/service/usermanagement/shared/shared-user.service";

@Component({
  selector: "app-add-edit-task",
  templateUrl: "./add-edit-task.component.html",
  styleUrls: ["./add-edit-task.component.css"],
})
export class AddEditTaskComponent implements OnInit {
  fieldsError: string = ""; //Error message for fields
  nameError: string = ""; // Error message for name validation
  descriptionError: string = ""; // Error message for description validation
  dueDateError: string = "";
  teamMembers: userAdvanced[] = [];
  scrumMaster: userAdvanced;
  deadLineString: string | null;
  task: Task = new Task();
  team: Team;
  constructor(
    private _coreService: CoreService,
    private _dialogRef: MatDialogRef<AddEditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sharedUserService: SharedUserService,
    private teamService: TeamService,
    private taskService: TaskService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    if (this.data.task) {
      this.task = this.data.task;
      this.deadLineString = this.task.deadLine
        ? this.datePipe.transform(this.task.deadLine, "yyyy-MM-dd")
        : null;
      if (this.task.teamId) this.loadMembers(this.task.teamId);
    } else {
      if (this.data.teamId && this.data.status) {
        this.task.status = this.data.status;
        this.loadMembers(this.data.teamId);
      }
    }
  }
  loadMembers(teamId: number) {
    this.teamService.getTeamById(teamId).subscribe((team) => {
      if (team) {
        this.team = team;
        if (this.team.members && this.team.scrumMaster) {
          this.sharedUserService
            .getUsersByIds(this.team.members)
            .subscribe((members) => {
              this.teamMembers = members;
            });
          this.sharedUserService
            .getUserById(this.team.scrumMaster)
            .subscribe((scrumMaster) => {
              this.scrumMaster = scrumMaster;
            });
        }
      }
    });
  }
  onSubmit() {
    this.fieldsError = "";
    this.nameError = "";
    this.descriptionError = "";
    this.dueDateError = "";
    this.task.deadLine = this.deadLineString
      ? new Date(this.deadLineString)
      : undefined;
    if (
      !this.task.name ||
      !this.task.description ||
      !this.task.deadLine ||
      !this.task.memberId
    ) {
      // Inform the user that all fields are required
      this.fieldsError = "All fields are required.";
      return; // Stop further execution
    }
    // Check if the name has at least 3 characters
    if (this.task.name.length < 3) {
      // Set error message for name validation
      this.nameError = "Title must have at least 3 characters.";
      return; // Stop further execution
    }
    if (this.task.description.length < 10) {
      // Set error message for description validation
      this.descriptionError = "Description must have at least 10 characters.";
      return; // Stop further execution
    }
    // Check if the deadline date is in the future
    if (new Date(this.task.deadLine) < new Date()) {
      // Set error message for deadline date validation
      this.dueDateError = "Due Date must be in the future.";
      return; // Stop further execution
    }

    if (!this.data.task && this.team.teamId) {
      this.task.createdAt = new Date();
      this.taskService.createTask(this.team.teamId, this.task).subscribe(
        (response) => {
          this._coreService.openSnackBar(
            "Task created successfully!",
            "done",
            2000
          );
          this._dialogRef.close(true);
        },
        (error) => {
          this._coreService.openSnackBar("Error creating Task!", "error", 2000);
          // handle error here
        }
      );
    } else {
      this.taskService.updateTask(this.task).subscribe(
        (response) => {
          this._coreService.openSnackBar(
            "Task updated successfully!",
            "done",
            2000
          );
          this._dialogRef.close(true);
        },
        (error) => {
          this._coreService.openSnackBar("Error updating Task!", "error", 2000);
          // handle error here
        }
      );
    }
  }

  public get Priority(): typeof Priority {
    return Priority;
  }
}
