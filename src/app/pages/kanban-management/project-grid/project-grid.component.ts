import { Component, OnInit } from "@angular/core";
import { Project } from "src/app/models/project/project.model";
import { ProjectService } from "src/app/service/kanban-management/project/project.service";
import { ProjectSharedDataService } from "src/app/service/kanban-management/shared-data/project-shared-data.service";
import { Router } from "@angular/router";
import { CoreService } from "src/app/service/notificationDialog/core.service";
import { jwtDecode } from "jwt-decode";
import { TokenService } from "src/app/service/usermanagement/token-svc/token-service.service";
import { AuthenticService } from "src/app/service/usermanagement/authentic/authentic.service";
@Component({
  selector: "app-project-grid",
  templateUrl: "./project-grid.component.html",
  styleUrls: ["./project-grid.component.css"],
})
export class ProjectGridComponent implements OnInit {
  projects?: Project[];
  filteredProjects: undefined | Project[] = [];
  searchInput: string = "";
  selectedStatus: string = "";
  ownerId: number;
  tokenDetails: any;

  constructor(
    private projectService: ProjectService,
    private projectSharedData: ProjectSharedDataService,
    private router: Router,
    private _coreService: CoreService,
    private tokenService: TokenService,
    private authenticService: AuthenticService
  ) {}
  ngOnInit(): void {
    this.authenticService.getId().subscribe((id) => {
      this.ownerId = id;
      this.tokenDetails = this.tokenService.getTokenDetails();
      this.loadProjects();
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
          "error",
          2000
        );
      }
    );
  }
  deleteProject(projectId: number): void {
    if (confirm("Are you sure you want to delete this project?")) {
      this.projectService.deleteProject(projectId).subscribe(
        () => {
          this._coreService.openSnackBar(
            "Project deleted successfully!",
            "done",
            2000
          );
          this.loadProjects();
        },
        (error) => {
          this._coreService.openSnackBar(
            "Error deleting project!",
            "error",
            2000
          );
        }
      );
    }
  }
  onSelectProject(project: Project): void {
    this.projectSharedData.setSelectedProject(project);
    this.router.navigate(["/project-management/project-page"]);
  }
  calculateProgress(project: Project): number {
    if (!project || !project.teams) {
      return 0; // Return 0 if project or teams are not available
    }

    let totalTasks = 0;
    let completedTasks = 0;

    project.teams.forEach((team) => {
      if (team.tasks) {
        totalTasks += team.tasks.length;
        completedTasks += team.tasks.filter(
          (task) => task.status === "DONE"
        ).length;
      }
    });

    if (totalTasks === 0) {
      return 0; // Return 0 if there are no tasks
    }

    const progressPercentage = (completedTasks / totalTasks) * 100;
    return Number(progressPercentage.toFixed(0));
  }
  applyFilters() {
    // Apply search filter
    this.filteredProjects = this.projects?.filter((project) =>
      this.matchesSearchCriteria(project)
    );

    // Apply status filter
    if (this.selectedStatus) {
      this.filteredProjects = this.filteredProjects?.filter(
        (project) => project.projectStatus === this.selectedStatus
      );
    }
  }

  matchesSearchCriteria(project: Project): boolean {
    const searchKeywords = this.searchInput.toLowerCase().split(" ");

    // Check if any property of the project matches the search keywords
    return searchKeywords.some(
      (keyword) =>
        project.name?.toLowerCase().includes(keyword) ||
        project.scope?.toLowerCase().includes(keyword) ||
        project.projectStatus?.toLowerCase().includes(keyword) ||
        this.dateMatchesKeyword(project.startDate, keyword) ||
        this.dateMatchesKeyword(project.endDate, keyword)
    );
  }

  dateMatchesKeyword(date: Date | undefined, keyword: string): boolean {
    if (!date) return false; // Return false if the date is undefined
    // Ensure date is a valid Date object
    const parsedDate = new Date(date);

    const day = parsedDate.getDate().toString().padStart(2, "0");
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
    const year = parsedDate.getFullYear().toString();

    const formattedDateWithDash = `${day}-${month}-${year}`;
    const formattedDateWithSlash = `${day}/${month}/${year}`;
    return (
      formattedDateWithDash.includes(keyword) ||
      formattedDateWithSlash.includes(keyword)
    );
  }

  clearFilters() {
    this.searchInput = "";
    this.selectedStatus = "";
    this.applyFilters();
  }
}
