import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Team } from "src/app/models/team/team.model";
import { CoreService } from "src/app/service/notificationDialog/core.service";
import { SharedUserService } from "src/app/service/usermanagement/shared/shared-user.service";

@Component({
  selector: "app-add-edit-task",
  templateUrl: "./add-edit-task.component.html",
  styleUrls: ["./add-edit-task.component.css"],
})
export class AddEditTaskComponent {
  fieldsError: string = ""; //Error message for fields
  nameError: string = ""; // Error message for name validation
  descriptionError: string = ""; // Error message for description validation
  teamMembers: Team[] = [];
  
  constructor(
    private _coreService: CoreService,
    private _dialogRef: MatDialogRef<AddEditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sharedUserService: SharedUserService
  ) {}
}
