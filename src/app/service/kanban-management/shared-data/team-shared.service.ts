import { Injectable } from "@angular/core";
import { Team } from "src/app/models/team/team.model";

@Injectable({
  providedIn: "root",
})
export class TeamSharedService {
  private selectedTeam: Team | null = null;
  private projectName: string;

  setSelectedTeam(Team: Team) {
    this.selectedTeam = Team;
  }

  getSelectedTeam() {
    return this.selectedTeam;
  }
  setProjectName(projectName: string) {
    this.projectName = projectName;
  }

  getProjectName() {
    return this.projectName;
  }
}
