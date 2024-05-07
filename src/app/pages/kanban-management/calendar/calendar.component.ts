import { Component, OnInit } from "@angular/core";
import { CalendarOptions, EventDropArg } from "@fullcalendar/core";
import { Event } from "src/app/models/event/event.model";
import { Project } from "src/app/models/project/project.model";
import { Task } from "src/app/models/task/task.model";
import { ProjectService } from "src/app/service/kanban-management/project/project.service";
import { CoreService } from "src/app/service/notificationDialog/core.service";
import { AuthenticService } from "src/app/service/usermanagement/authentic/authentic.service";
import { TokenService } from "src/app/service/usermanagement/token-svc/token-service.service";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, {
  EventResizeDoneArg,
} from "@fullcalendar/interaction";
import { AddEditEventComponent } from "../add-edit-event/add-edit-event.component";
import { MatDialog } from "@angular/material/dialog";
import { AddEditTaskComponent } from "../add-edit-task/add-edit-task.component";
import { EventClickArg } from "@fullcalendar/core";
import { TaskService } from "src/app/service/kanban-management/task/task.service";
import { EventService } from "src/app/service/kanban-management/event/event.service";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.css"],
})
export class CalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: "dayGridMonth",
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
    events: [], // Initialize empty array for events
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
    eventDisplay: "block", // Display events as blocks
    editable: true, // Allow date navigation via dragging
    eventClick: this.handleEventClick.bind(this), // Handle event click event
    droppable: true, // Enable dropping external events onto the calendar
    eventDrop: this.handleEventDrop.bind(this), // Handle event drop event
    eventResize: this.handleEventResize.bind(this),
  };
  projects: Project[];
  ownerId: number;
  tokenDetails: any;
  tasks: Task[];
  events: Event[];

  constructor(
    private projectService: ProjectService,
    private _coreService: CoreService,
    private authenticService: AuthenticService,
    private tokenService: TokenService,
    private dialog: MatDialog,
    private taskService: TaskService,
    private eventService: EventService
  ) {}
  ngOnInit(): void {
    this.authenticService.getId().subscribe((id) => {
      this.ownerId = id;
      this.tokenDetails = this.tokenService.getTokenDetails();
      this.projects = [];
      this.tasks = [];
      this.events = [];
      this.calendarOptions.events = [];
      this.loadProjects();
    });
  }

  loadProjects(): void {
    this.projectService.getProjectsByUserId(this.ownerId).subscribe(
      (projects: Project[]) => {
        this.projects = projects;
        this.loadTasksAndEvents();
      },
      (error) => {
        this._coreService.openSnackBar("Error loading...!", "cancel", 3000);
      }
    );
  }

  loadTasksAndEvents(): void {
    this.tasks = [];
    this.events = [];
    this.projects.forEach((project) => {
      if (project.teams) {
        project.teams.forEach((team) => {
          if (team.tasks && team.tasks.length > 0) {
            this.tasks.push(...team.tasks);
          }
          if (team.events && team.events.length > 0) {
            this.events.push(...team.events);
          }
        });
      }
    });
    this.loadValues(this.tasks, this.events);
  }

  loadValues(tasks: Task[], events: Event[]) {
    // Map tasks to FullCalendar event format
    const taskEvents = tasks.map((task) => ({
      title: "Task : " + task.name,
      start: task.createdAt,
      end: task.deadLine,
      backgroundColor: "#6ab4d9",
      borderColor: "#6ab4d9",
      extendedProps: {
        task: task, // Attach task object to task for reference
      },
    }));
    const calendarEvents = events.map((event) => ({
      title: "Event : " + event.name,
      start: event.startDate,
      end: event.endDate,
      backgroundColor: "#704ded",
      borderColor: "#704ded",
      extendedProps: {
        event: event, // Attach event object to event for reference
      },
    }));
    //restart to empty events to update list
    this.calendarOptions.events = [];

    // Concatenate tasks & events to calendarOptions.events
    this.calendarOptions.events = this.calendarOptions.events.concat(
      taskEvents,
      calendarEvents
    );
  }
  openEditEventForm(event?: Event): void {
    if (this.projects.length > 0) {
      const project = this.projects[0];
      if (project.ownerId === this.ownerId) {
        if (event) {
          //edit
          const dialogRef = this.dialog.open(AddEditEventComponent, {
            data: { event },
          });
          dialogRef.afterClosed().subscribe((result) => {
            if (result) {
              this.loadProjects();
            } else {
              this.loadProjects();
            }
          });
        }
      } else {
        this._coreService.openSnackBar(
          "Sorry you can't do that you are not the owner!",
          "cancel",
          3000
        );
      }
    }
  }
  openEditTaskForm(task?: Task, teamId?: number): void {
    if (task) {
      const dialogRef = this.dialog.open(AddEditTaskComponent, {
        data: { task }, // Passing the task data if editing
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.loadProjects();
        } else {
          this.loadProjects();
        }
      });
    }
  }

  handleEventClick(eventInfo: EventClickArg) {
    // Check if the clicked item has an extended property indicating it's a task
    const isTask =
      eventInfo.event.extendedProps && eventInfo.event.extendedProps["task"];
    if (isTask) {
      // Clicked item is a task, redirect to openEditTaskForm
      this.openEditTaskForm(eventInfo.event.extendedProps["task"]);
    } else {
      // Clicked item is an event, redirect to openEditEventForm
      this.openEditEventForm(eventInfo.event.extendedProps["event"]);
    }
  }
  handleEventDrop(dropInfo: EventDropArg) {
    var event: Event;
    var task: Task;
    const isTask =
      dropInfo.event.extendedProps && dropInfo.event.extendedProps["task"];
    if (!isTask) {
      event = dropInfo.event.extendedProps["event"];
      const newStartDate = dropInfo.event.start;
      const newEndDate = dropInfo.event.end;
      if (newStartDate && newEndDate) {
        event.startDate = new Date(newStartDate);
        event.endDate = new Date(newEndDate);
      }
      // Update the event with the new start date
      this.eventService.updateEvent(event).subscribe(
        (response) => {
          this._coreService.openSnackBar("Event has been updated!", "Ok", 3000);
        },
        (error) => {
          this._coreService.openSnackBar(
            "Error : sorry something wrong!",
            "cancel",
            3000
          );
        }
      );
    } else {
      task = dropInfo.event.extendedProps["task"];
      const newStartDate = dropInfo.event.start;
      const newEndDate = dropInfo.event.end;
      if (newStartDate && newEndDate) {
        task.createdAt = new Date(newStartDate);
        task.deadLine = new Date(newEndDate);
      }
      // Update the task with the new start date
      this.taskService.updateTask(task).subscribe(
        (response) => {
          this._coreService.openSnackBar("Task has been updated!", "Ok", 3000);
        },
        (error) => {
          this._coreService.openSnackBar(
            "Error : sorry something wrong!",
            "cancel",
            3000
          );
        }
      );
    }
  }

  handleEventResize(resizeInfo: EventResizeDoneArg) {
    // Handle event drop
    var event: Event;
    var task: Task;
    const isTask =
      resizeInfo.event.extendedProps && resizeInfo.event.extendedProps["task"];
    if (!isTask) {
      event = resizeInfo.event.extendedProps["event"];
      const newStartDate = resizeInfo.event.start;
      const newEndDate = resizeInfo.event.end;

      if (event && newEndDate && newStartDate) {
        event.startDate = new Date(newStartDate);
        event.endDate = new Date(newEndDate);
        // Update the task with the new start and end dates
        this.eventService.updateEvent(event).subscribe(
          (response) => {
            this._coreService.openSnackBar(
              "Event has been updated!",
              "Ok",
              3000
            );
          },
          (error) => {
            this._coreService.openSnackBar(
              "Error : sorry something wrong!",
              "cancel",
              3000
            );
          }
        );
      }
    } else {
      task = resizeInfo.event.extendedProps["task"];
      const newStartDate = resizeInfo.event.start;
      const newEndDate = resizeInfo.event.end;
      if (task && newEndDate && newStartDate) {
        task.createdAt = new Date(newStartDate);
        task.deadLine = new Date(newEndDate);
        this.taskService.updateTask(task).subscribe(
          (response) => {
            this._coreService.openSnackBar(
              "Task has been updated!",
              "Ok",
              3000
            );
          },
          (error) => {
            this._coreService.openSnackBar(
              "Error : sorry something wrong!",
              "cancel",
              3000
            );
          }
        );
      }
    }
  }
}
