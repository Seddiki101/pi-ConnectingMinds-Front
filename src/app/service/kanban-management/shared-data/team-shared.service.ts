import { Injectable } from "@angular/core";
import { Team } from "src/app/models/team/team.model";

@Injectable({
  providedIn: "root",
})
export class TeamSharedService {
  private localStorageKey = "selectedTeam";

  setSelectedTeam(Team: Team) {
    // Save Team data to localStorage
    localStorage.setItem(this.localStorageKey, JSON.stringify(Team));
  }

  getSelectedTeam(): Team | null {
    // Retrieve Team data from localStorage
    const TeamData = localStorage.getItem(this.localStorageKey);
    if (TeamData) {
      return JSON.parse(TeamData);
    } else {
      return null;
    }
  }
}
