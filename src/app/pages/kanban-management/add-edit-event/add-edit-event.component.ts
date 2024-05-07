import { DatePipe } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Event } from "src/app/models/event/event.model";
import { EventService } from "src/app/service/kanban-management/event/event.service";
import { TeamService } from "src/app/service/kanban-management/team/team.service";
import { CoreService } from "src/app/service/notificationDialog/core.service";

@Component({
  selector: "app-add-edit-event",
  templateUrl: "./add-edit-event.component.html",
  styleUrls: ["./add-edit-event.component.css"],
})
export class AddEditEventComponent implements OnInit {
  fieldsError: string = ""; //Error message for fields
  event: Event = new Event();
  startDateString: string | null;
  endDateString: string | null;

  constructor(
    private _coreService: CoreService,
    private _dialogRef: MatDialogRef<AddEditEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private eventService: EventService,
    private datePipe: DatePipe
  ) {}
  ngOnInit(): void {
    if (this.data.event) {
      this.event = this.data.event;
      this.startDateString = this.event.startDate
        ? this.datePipe.transform(this.event.startDate, "yyyy-MM-ddTHH:mm")
        : null;
      this.endDateString = this.event.endDate
        ? this.datePipe.transform(this.event.endDate, "yyyy-MM-ddTHH:mm")
        : null;
    }
  }

  onSubmit() {
    this.fieldsError = "";
    this.event.startDate = this.startDateString
      ? new Date(this.startDateString)
      : undefined;
    this.event.endDate = this.endDateString
      ? new Date(this.endDateString)
      : undefined;
    // Check if the required fields are filled
    if (
      !this.event.name ||
      !this.event.description ||
      !this.event.startDate ||
      !this.event.endDate
    ) {
      // Inform the user that all fields are required
      this.fieldsError = "All fields are required.";
      return; // Stop further execution
    }

    // Check if the name has at least 3 characters
    if (this.event.name.length < 3) {
      // Set error message for name validation
      this.fieldsError = "Name must have at least 3 characters.";
      return; // Stop further execution
    }
    if (this.event.description.length < 10) {
      // Set error message for description validation
      this.fieldsError = "description must have at least 10 characters.";
      return; // Stop further execution
    }
    // Check if the end date is greater than the start date
    if (this.event.endDate <= this.event.startDate) {
      // Set error message for end date validation
      this.fieldsError = "End date must be greater than start date.";
      return; // Stop further execution
    }
    // Check if the end date is in the future
    if (new Date(this.event.endDate) <= new Date()) {
      // Set error message for end date validation
      this.fieldsError = "End date must be in the future.";
      return; // Stop further execution
    }
    if (!this.data.event && this.data.teamId) {
      this.eventService.createEvent(this.data.teamId, this.event).subscribe(
        (response) => {
          this._coreService.openSnackBar(
            "Event created successfully!",
            "done",
            2000
          );
          this._dialogRef.close(true);
        },
        (error) => {
          this._coreService.openSnackBar(
            "Error creating Event!",
            "error",
            2000
          );
          // handle error here
        }
      );
    } else {
      this.eventService.updateEvent(this.event).subscribe(
        (response) => {
          this._coreService.openSnackBar(
            "Event updated successfully!",
            "done",
            2000
          );
          this._dialogRef.close(true);
        },
        (error) => {
          this._coreService.openSnackBar("Error updated Event!", "error", 2000);
          // handle error here
        }
      );
    }
  }
}
