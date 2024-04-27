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
  filteredMembers: userAdvanced[] = [];
  searchQuery: string = "";

  constructor(
    private teamService: TeamService,
    private projectService: ProjectService,
    private dialog: MatDialog,
    private sharedUser: SharedUserService,
    private _coreService: CoreService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.projectId = +params["projectId"];
      this.teamId = +params["teamId"];
    });
    if (this.projectId && this.teamId) {
      this.teamService.getTeamById(this.teamId).subscribe((team) => {
        this.team = team;
        if (this.team?.members && this.team.scrumMaster) {
          this.sharedUser
            .getUsersByIds(this.team?.members)
            .subscribe((users) => {
              this.cachedMembersData = users;
              this.searchMembers();
            });
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
      this.projectService
        .getProjectById(this.projectId)
        .subscribe((project) => {
          if (project.name) {
            this.porjectName = project.name;
          }
        });
    }
  }

  openAddEditTeamForm(team?: Team): void {
    if (team) {
      const dialogRef = this.dialog.open(AddEditTeamComponent, {
        data: { team }, // Pass the team data if editing
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (this.team?.teamId) {
          this.teamService.getTeamById(this.team.teamId).subscribe((team) => {
            if (team) {
              this.team = team;
              this.updateCachedMembersData(team);
            }
          });
        } else {
          console.log("Error: Missing team ID");
        }
      });
    }
  }
  updateCachedMembersData(team: Team): void {
    if (team.members && team.scrumMaster) {
      this.sharedUser.getUsersByIds(team.members).subscribe((users) => {
        this.cachedMembersData = [...users]; // Use spread operator to create a new array
        // Find the Scrum Master in the cached members data
        const scrumMasterIndex = this.cachedMembersData.findIndex(
          (user) => user.id === team.scrumMaster
        );
        if (scrumMasterIndex !== -1) {
          const scrumMaster = this.cachedMembersData.splice(
            scrumMasterIndex,
            1
          )[0];
          this.cachedMembersData.unshift(scrumMaster); // Move the Scrum Master to the first index
        }
      });
    }
  }

  searchMembers(): void {
    this.filteredMembers = this.cachedMembersData.filter(
      (member) =>
        member.firstName
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase()) ||
        member.lastName
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        member.phone.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
