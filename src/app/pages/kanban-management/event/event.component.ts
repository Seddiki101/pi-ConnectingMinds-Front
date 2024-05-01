import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Project } from 'src/app/models/project/project.model';
import { EventService } from 'src/app/service/kanban-management/event/event.service';
import { ProjectService } from 'src/app/service/kanban-management/project/project.service';
import { TeamService } from 'src/app/service/kanban-management/team/team.service';
import { CoreService } from 'src/app/service/notificationDialog/core.service';
import { SharedUserService } from 'src/app/service/usermanagement/shared/shared-user.service';
import { TokenService } from 'src/app/service/usermanagement/token-svc/token-service.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit{
  showEvents: boolean = false;
  projects: Project[] = [];
  selectedProject: Project | null = null;

  constructor(
    private projectService: ProjectService,
    private teamService: TeamService,
    private sharedUser: SharedUserService,
    private _coreService: CoreService,
    private dialog: MatDialog,
    private tokenService: TokenService,
    private eventService: EventService
  ) {}
  ngOnInit(): void {
    
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
}
