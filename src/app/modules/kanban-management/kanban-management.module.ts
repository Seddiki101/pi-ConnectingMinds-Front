import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { KanbanMainpageComponent } from "src/app/pages/kanban-management/kanban-mainpage/kanban-mainpage.component";
import { SidenavComponent } from "src/app/components/sidenav/sidenav.component";
import { ProjectGridComponent } from "src/app/pages/kanban-management/project-grid/project-grid.component";
import { ProjectListComponent } from "src/app/pages/kanban-management/project-list/project-list.component";
import { CreateProjectComponent } from "src/app/pages/kanban-management/create-project/create-project.component";
import { EditProjectComponent } from "src/app/pages/kanban-management/edit-project/edit-project.component";
import { FormsModule } from "@angular/forms";
import { ProjectPageComponent } from "src/app/pages/kanban-management/project-details/project-page/project-page.component";
import { ProjectOverviewComponent } from "src/app/pages/kanban-management/project-details/project-overview/project-overview.component";
import { ProjectSummaryComponent } from "src/app/pages/kanban-management/project-details/project-summary/project-summary.component";
import { ProjectTaskComponent } from "src/app/pages/kanban-management/project-details/project-task/project-task.component";
import { ProjectTeamComponent } from "src/app/pages/kanban-management/project-details/project-team/project-team.component";
import { EventComponent } from "src/app/pages/kanban-management/event/event.component";
import { CalendarComponent } from "src/app/pages/kanban-management/calendar/calendar.component";
import { TaskComponent } from "src/app/pages/kanban-management/task/task.component";
import { SharedModule } from "../shared/shared.module";
import { TeamComponent } from "src/app/pages/kanban-management/team/team.component";
import { AddEditTeamComponent } from "src/app/pages/kanban-management/add-edit-team/add-edit-team.component";
import { MatDialogModule } from "@angular/material/dialog";
import { TeamDetailsComponent } from "src/app/pages/kanban-management/team-details/team-details.component";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AddEditTaskComponent } from "src/app/pages/kanban-management/add-edit-task/add-edit-task.component";
import { TaskDetailsComponent } from "src/app/pages/kanban-management/task-details/task-details.component";

const routes: Routes = [
  {
    path: "",
    component: KanbanMainpageComponent,
    children: [
      { path: "", redirectTo: "project-grid", pathMatch: "full" }, // Redirect to project-grid by default
      {
        path: "project-grid",
        component: ProjectGridComponent,
        data: { title: "Project Grid" },
      },
      {
        path: "project-page",
        component: ProjectPageComponent,
        children: [
          {
            path: "",
            redirectTo: "project-overview",
            pathMatch: "full",
          },
          {
            path: "project-overview",
            component: ProjectOverviewComponent,
            data: { title: "Project | Overview" },
          },
          {
            path: "project-summary",
            component: ProjectSummaryComponent,
            data: { title: "Project | Summary" },
          },
          {
            path: "project-task",
            component: ProjectTaskComponent,
            data: { title: "Project | Task" },
          },
          {
            path: "project-team",
            component: ProjectTeamComponent,
            data: { title: "Project | Team" },
          },
        ],
        data: { title: "Project Overview" },
      },
      {
        path: "create-project",
        component: CreateProjectComponent,
        data: { title: "Create Project" },
      },
      {
        path: "edit-project/:id",
        component: EditProjectComponent,
        data: { title: "Edit Project" },
      },
      {
        path: "project-list",
        component: ProjectListComponent,
        data: { title: "Project List" },
      },
      {
        path: "task",
        component: TaskComponent,
        data: { title: "Task" },
      },
      {
        path: "team",
        component: TeamComponent,
        data: { title: "Team" },
      },
      { 
        path:"team-details",
        component: TeamDetailsComponent,
        data:{title:"Team Details"}
      },
      {
        path: "event",
        component: EventComponent,
        data: { title: "Event" },
      },
      {
        path: "calendar",
        component: CalendarComponent,
        data: { title: "Calendar" },
      },
      // Add more child routes as needed
    ],
    data: { title: "Project Management" },
  },
  // Add more routes as needed
];

@NgModule({
  declarations: [
    SidenavComponent,
    KanbanMainpageComponent,
    ProjectGridComponent,
    ProjectListComponent,
    CreateProjectComponent,
    EditProjectComponent,
    ProjectPageComponent,
    ProjectOverviewComponent,
    ProjectSummaryComponent,
    ProjectTaskComponent,
    ProjectTeamComponent,
    CalendarComponent,
    EventComponent,
    TaskComponent,
    TeamComponent,
    AddEditTeamComponent,
    TeamDetailsComponent,
    AddEditTaskComponent,
    TaskDetailsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    SharedModule,
    MatDialogModule,
    DragDropModule
  ],
  providers: [DatePipe],
})
export class KanbanManagementModule {}
