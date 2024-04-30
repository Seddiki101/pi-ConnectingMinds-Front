import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Priority } from 'src/app/models/enums/priority';
import { Task } from 'src/app/models/task/task.model';
import { Team } from 'src/app/models/team/team.model';
import { TaskService } from 'src/app/service/kanban-management/task/task.service';
import { TeamService } from 'src/app/service/kanban-management/team/team.service';
import { userAdvanced } from 'src/app/service/usermanagement/requestTypes/userAdvanced';
import { SharedUserService } from 'src/app/service/usermanagement/shared/shared-user.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit{
  teamMembers: userAdvanced[] = [];
  scrumMaster: userAdvanced;
  deadLineString: string | null;
  task: Task = new Task();
  team: Team;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sharedUserService: SharedUserService,
    private teamService: TeamService,
    private datePipe: DatePipe
  ) {}
  ngOnInit(): void {
    if (this.data.task) {
      this.task = this.data.task;
      this.deadLineString = this.task.deadLine
        ? this.datePipe.transform(this.task.deadLine, "yyyy-MM-dd")
        : null;
      if (this.task.teamId) this.loadMembers(this.task.teamId);
    }
  }
  loadMembers(teamId: number) {
    this.teamService.getTeamById(teamId).subscribe((team) => {
      if (team) {
        this.team = team;
        if (this.team.members && this.team.scrumMaster) {
          this.sharedUserService
            .getUsersByIds(this.team.members)
            .subscribe((members) => {
              this.teamMembers = members;
            });
          this.sharedUserService
            .getUserById(this.team.scrumMaster)
            .subscribe((scrumMaster) => {
              this.scrumMaster = scrumMaster;
            });
        }
      }
    });
  }
  public get Priority(): typeof Priority {
    return Priority;
  }
}
