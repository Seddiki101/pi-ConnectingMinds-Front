import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Team } from "src/app/models/team/team.model";
import { TeamSharedService } from "src/app/service/kanban-management/shared-data/team-shared.service";
import { TeamService } from "src/app/service/kanban-management/team/team.service";
import { CoreService } from "src/app/service/notificationDialog/core.service";
import { userAdvanced } from "src/app/service/usermanagement/requestTypes/userAdvanced";
import { SharedUserService } from "src/app/service/usermanagement/shared/shared-user.service";
import { AddEditTeamComponent } from "../add-edit-team/add-edit-team.component";
import { ActivatedRoute } from "@angular/router";
import { ProjectService } from "src/app/service/kanban-management/project/project.service";
import { Project } from "src/app/models/project/project.model";
import { AuthenticService } from "src/app/service/usermanagement/guard/authentic.service";

@Component({
  selector: "app-team-details",
  templateUrl: "./team-details.component.html",
  styleUrls: ["./team-details.component.css"],
})
export class TeamDetailsComponent implements OnInit {
  cachedMembersData: userAdvanced[] = [];
  scrumMaster: userAdvanced | null;
  team: Team | null;
  porjectName: string = "";
  teamId: number;
  projectId: number;
  ownerId: number;
  filteredMembers: userAdvanced[] = [];
  searchQuery: string = "";
  project: Project;
  constructor(
    private teamService: TeamService,
    private projectService: ProjectService,
    private dialog: MatDialog,
    private sharedUser: SharedUserService,
    private _coreService: CoreService,
    private route: ActivatedRoute,
    private authenticService: AuthenticService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.projectId = +params["projectId"];
      this.teamId = +params["teamId"];
      if (this.projectId && this.teamId) {
        this.teamService.getTeamById(this.teamId).subscribe((team) => {
          this.team = team;
          this.loadMemberData();
        });
        this.projectService
          .getProjectById(this.projectId)
          .subscribe((project) => {
            if (project.name) {
              this.porjectName = project.name;
              this.project = project;
            }
          });
        this.authenticService.getId().subscribe((id) => {
          this.ownerId = id;
        });
      }
    });
  }

  openAddEditTeamForm(team?: Team): void {
    if (this.project.ownerId === this.ownerId) {
      if (team) {
        const dialogRef = this.dialog.open(AddEditTeamComponent, {
          data: { team }, // Pass the team data if editing
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (this.team?.teamId) {
            this.teamService.getTeamById(this.team.teamId).subscribe((team) => {
              if (team) {
                this.team = team;
                this.loadMemberData();
              }
            });
          } else {
            this._coreService.openSnackBar(
              "Error: Missing team ID!",
              "cancel",
              2000
            );
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

  loadMemberData() {
    if (this.team?.members && this.team.scrumMaster) {
      this.sharedUser.getUsersByIds(this.team?.members).subscribe((users) => {
        this.cachedMembersData = users;
        this.searchMembers();
        if (this.team && this.team.scrumMaster) {
          this.sharedUser
            .getUserById(this.team.scrumMaster)
            .subscribe((user) => {
              this.scrumMaster = user;
              if (this.scrumMaster) {
                this.cachedMembersData.unshift(this.scrumMaster);
                this.searchMembers();
              }
            });
        }
      });
    }
  }
  searchMembers(): void {
    const searchTerms = this.searchQuery.trim().toLowerCase().split(/\s+/);
    this.filteredMembers = this.cachedMembersData.filter((member) => {
      const fullName = `${member.firstName} ${member.lastName}`.toLowerCase();
      const email = member.email.toLowerCase();
      const phone = member.phone.toLowerCase();
      return searchTerms.every(
        (term) =>
          fullName.includes(term) ||
          email.includes(term) ||
          phone.includes(term)
      );
    });
  }
}
