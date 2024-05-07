import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Project } from "src/app/models/project/project.model";
import { EventService } from "src/app/service/kanban-management/event/event.service";
import { ProjectService } from "src/app/service/kanban-management/project/project.service";
import { CoreService } from "src/app/service/notificationDialog/core.service";
import { AuthenticService } from "src/app/service/usermanagement/guard/authentic.service";
import { AddEditEventComponent } from "../add-edit-event/add-edit-event.component";
import { Event } from "src/app/models/event/event.model";
import { EventDetailsComponent } from "../event-details/event-details.component";
import { Team } from "src/app/models/team/team.model";

@Component({
  selector: "app-event",
  templateUrl: "./event.component.html",
  styleUrls: ["./event.component.css"],
})
export class EventComponent implements OnInit {
  showEvents: boolean = false;
  projects: Project[] = [];
  filteredTeams: Team[] | undefined;
  selectedProject: Project | undefined;
  ownerId: number;
  searchTeam: string = "";
  constructor(
    private projectService: ProjectService,
    private _coreService: CoreService,
    private dialog: MatDialog,
    private eventService: EventService,
    private authenticService: AuthenticService
  ) {}
  ngOnInit(): void {
    this.authenticService.getId().subscribe((id) => {
      this.ownerId = id;
      this.loadProjects();
    });
  }
  applyFilter() {
    this.filteredTeams = this.selectedProject?.teams?.filter((team) =>
      this.matchesSearchCriteria(team)
    );
  }
  matchesSearchCriteria(team: Team): boolean {
    const searchTerms = this.searchTeam.trim().toLowerCase().split(/\s+/);
    return searchTerms.some((keyword) =>
      team.name?.toLowerCase().includes(keyword)
    );
  }
  clearFilter(): void {
    this.searchTeam = "";
    this.applyFilter();
  }
  loadProjects(): void {
    if (this.ownerId) {
      this.projectService.getProjectsByUserId(this.ownerId).subscribe(
        (projects: Project[]) => {
          this.projects = projects;
          const selectedProjectId = localStorage.getItem("selectedProjectId");
          if (selectedProjectId) {
            this.selectedProject = this.projects.find(
              (project) => project.projectId === parseInt(selectedProjectId)
            );
            this.applyFilter();
          }
          if (this.selectedProject) {
            this.showEvents = true;
            this.applyFilter();
          } else {
            this.showEvents = false;
          }
        },
        (error) => {
          this._coreService.openSnackBar(
            "Error loading projects!",
            "error",
            2000
          );
        }
      );
    }
  }
  onProjectChange() {
    if (this.selectedProject && this.selectedProject.projectId) {
      localStorage.setItem(
        "selectedProjectId",
        this.selectedProject.projectId.toString()
      );
      this.showEvents = true;
    } else {
      this.showEvents = false;
    }
  }
  openAddEditEventForm(event?: Event, teamId?: number): void {
    if (this.selectedProject?.ownerId === this.ownerId) {
      const project = this.selectedProject;
      if (event) {
        //edit
        const dialogRef = this.dialog.open(AddEditEventComponent, {
          data: { event, project },
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.loadProjects();
          } else {
            this.loadProjects();
          }
        });
      } else {
        //create
        const dialogRef = this.dialog.open(AddEditEventComponent, {
          data: { teamId, project },
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
  deleteEvent(eventId: number): void {
    if (this.selectedProject?.ownerId === this.ownerId) {
      if (confirm("Are you sure you want to delete this Event?")) {
        this.eventService.deleteEvent(eventId).subscribe(
          () => {
            this._coreService.openSnackBar(
              "Event deleted successfully!",
              "done",
              2000
            );
            // Reload the list of projects after deletion
            this.loadProjects();
          },
          (error) => {
            this._coreService.openSnackBar(
              "Error deleting Event!",
              "Error",
              2000
            );
          }
        );
      }
    } else {
      this._coreService.openSnackBar(
        "Sorry you can't do that you are not the owner!",
        "cancel",
        3000
      );
    }
  }
  onViewDetails(event: Event) {
    if (event) {
      //edit
      const dialogRef = this.dialog.open(EventDetailsComponent, {
        data: { event }, // Pass the team data if editing
      });
    }
  }
}
