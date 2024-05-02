import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Project } from "src/app/models/project/project.model";
import { Team } from "src/app/models/team/team.model";
import { ProjectService } from "src/app/service/kanban-management/project/project.service";
import { TeamService } from "src/app/service/kanban-management/team/team.service";
import { MatDialog } from "@angular/material/dialog";
import { AddEditTeamComponent } from "../add-edit-team/add-edit-team.component";
import { SharedUserService } from "src/app/service/usermanagement/shared/shared-user.service";
import { userAdvanced } from "src/app/service/usermanagement/requestTypes/userAdvanced";
import { CoreService } from "src/app/service/notificationDialog/core.service";
import { TokenService } from "src/app/service/usermanagement/token-svc/token-service.service";
import { AuthenticService } from "src/app/service/usermanagement/guard/authentic.service";

@Component({
  selector: "app-team",
  templateUrl: "./team.component.html",
  styleUrls: ["./team.component.css"],
})
export class TeamComponent implements OnInit {
  filteredProjects: undefined | Project[] = [];
  searchInput: string = "";
  projects?: Project[];
  teams?: Team[];
  cachedUserData: userAdvanced[] = [];
  tokenDetails: any;
  ownerId: number;

  constructor(
    private projectService: ProjectService,
    private teamService: TeamService,
    private router: Router,
    private dialog: MatDialog,
    private sharedUser: SharedUserService,
    private _coreService: CoreService,
    private tokenService: TokenService,
    private authenticService: AuthenticService
  ) {}
  ngOnInit(): void {
    this.authenticService.getId().subscribe((id) => {
      this.ownerId = id;
      this.tokenDetails = this.tokenService.getTokenDetails();
      this.loadProjects();
      this.sharedUser.getAllUsers().subscribe((users) => {
        this.cachedUserData = users;
      });
    });
  }
  loadProjects(): void {
    this.projectService.getProjectsByUserId(this.ownerId).subscribe(
      (projects: Project[]) => {
        this.projects = projects;
        this.applyFilters();
      },
      (error) => {
        this._coreService.openSnackBar(
          "Error loading projects!",
          "Error",
          2000
        );
      }
    );
  }
  openAddEditTeamForm(team?: Team, project?: Project): void {
    if (project?.ownerId === this.ownerId) {
      if (team) {
        {
          const dialogRef = this.dialog.open(AddEditTeamComponent, {
            data: { team }, // Pass the team data if editing
          });

          dialogRef.afterClosed().subscribe((result) => {
            if (result) {
              // Handle any necessary actions after the modal closes
              // Example: Refresh the team list
              this.loadProjects();
            }else{
              this.loadProjects();
            }
          });
        }
      } else {
        const projectId = project?.projectId;
        const dialogRef = this.dialog.open(AddEditTeamComponent, {
          data: { projectId }, // Pass the team data if editing
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            // Handle any necessary actions after the modal closes
            // Example: Refresh the team list
            this.loadProjects();
          }else{
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
  applyFilters() {
    // Apply search filter
    this.filteredProjects = this.projects?.filter((project) =>
      this.matchesSearchCriteria(project)
    );
  }

  matchesSearchCriteria(project: Project): boolean {
    const searchKeywords = this.searchInput.toLowerCase().split(" ");
    // Check if any property of the project matches the search keywords
    return searchKeywords.some(
      (keyword) =>
        project.name?.toLowerCase().includes(keyword) ||
        project.scope?.toLowerCase().includes(keyword) ||
        project.projectStatus?.toLowerCase().includes(keyword)
    );
  }
  clearFilters() {
    this.searchInput = "";
    this.applyFilters();
  }

  deleteTeam(teamId: number, project: Project): void {
    if (project.ownerId === this.ownerId) {
      if (confirm("Are you sure you want to delete this team?")) {
        this.teamService.deleteTeam(teamId).subscribe(
          () => {
            this._coreService.openSnackBar(
              "Team deleted successfully!",
              "done",
              2000
            );
            // Reload the list of projects after deletion
            this.loadProjects();
          },
          (error) => {
            this._coreService.openSnackBar(
              "Error deleting team!",
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
  getUserFullNameById(userId: number): string {
    const user = this.cachedUserData.find((u) => u.id === userId);
    return user ? `${user.firstName} ${user.lastName}` : "";
  }
}
