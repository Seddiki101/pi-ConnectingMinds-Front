import { DatePipe } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Event } from "src/app/models/event/event.model";

@Component({
  selector: "app-event-details",
  templateUrl: "./event-details.component.html",
  styleUrls: ["./event-details.component.css"],
})
export class EventDetailsComponent {
  event: Event = new Event();
  startDateString: string | null;
  endDateString: string | null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
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
}
