import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Team } from "src/app/models/team/team.model";
import { TeamSharedService } from "src/app/service/kanban-management/shared-data/team-shared.service";
import { TeamService } from "src/app/service/kanban-management/team/team.service";
import { CoreService } from "src/app/service/notificationDialog/core.service";
import { userAdvanced } from "src/app/service/usermanagement/requestTypes/userAdvanced";
import { SharedUserService } from "src/app/service/usermanagement/shared/shared-user.service";
import { AddEditTeamComponent } from "../add-edit-team/add-edit-team.component";

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

  constructor(
    private teamService: TeamService,
    private teamSharedData: TeamSharedService,
    private dialog: MatDialog,
    private sharedUser: SharedUserService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.team = this.teamSharedData.getSelectedTeam();
    this.porjectName = this.teamSharedData.getProjectName();
    if (this.team?.members && this.team.scrumMaster) {
      this.sharedUser.getUsersByIds(this.team?.members).subscribe((users) => {
        this.cachedMembersData = users;
      });
      this.sharedUser.getUserById(this.team.scrumMaster).subscribe((user)=>{
        this.scrumMaster =user;
      })
    }
  }

  openAddEditTeamForm(team?: Team, projectId?: number): void {
    if (team) {
      const dialogRef = this.dialog.open(AddEditTeamComponent, {
        data: { team, projectId }, // Pass the team data if editing
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          if (this.team?.teamId) {
            console.log(this.team.teamId);
            this.teamService.getTeamById(this.team.teamId).subscribe((team) => {
              if (team) {
                this.team = team;
              }
            });
          } else {
            console.log("error at id team ");
          }
        }
      });
    }
  }
}
