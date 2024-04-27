import { Component, OnInit } from "@angular/core";
import { Project } from "src/app/models/project/project.model";
import { ActivatedRoute, Router } from "@angular/router";
import { ProjectService } from "src/app/service/kanban-management/project/project.service";
import { DatePipe } from "@angular/common";
import { CoreService } from "src/app/service/notificationDialog/core.service";

@Component({
  selector: "app-edit-project",
  templateUrl: "./edit-project.component.html",
  styleUrls: ["./edit-project.component.css"],
})
export class EditProjectComponent implements OnInit {
  selectedFile: File | null = null;
  fileError: string | null = null; // Error message for file validation
  imageSrc: string | ArrayBuffer | null = null; // Selected image preview
  fieldsError: string = "";
  nameError: string = ""; // Error message for name validation
  scopeError: string = ""; // Error message for scope validation
  resourcesError: string = ""; // Error message for resources validation
  endDateError: string = ""; // Error message for end date validation

  private from: string;
  projectId: number;
  project: Project = new Project();
  startDateString: string | null;
  endDateString: string | null;
  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router,
    private datePipe: DatePipe,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.from = params["from"];
    });
    this.route.params.subscribe((params) => {
      this.projectId = params["id"];
      this.projectService.getProjectById(this.projectId).subscribe(
        (project: Project) => {
          this.startDateString = project.startDate
            ? this.datePipe.transform(project.startDate, "yyyy-MM-dd")
            : null;
          this.endDateString = project.endDate
            ? this.datePipe.transform(project.endDate, "yyyy-MM-dd")
            : null;
          this.project = project;
          if (this.project.imageUrl) {
            this.imageSrc = this.project.imageUrl;
          }
        },
        (error) => {
          console.error("Error fetching project:", error);
        }
      );
    });
  }
  onSubmit(): void {
    // Reset error messages
    this.fieldsError = "";
    this.nameError = "";
    this.scopeError = "";
    this.resourcesError = "";
    this.endDateError = "";

    // Check if the required fields are filled
    if (
      !this.project.name ||
      !this.project.scope ||
      !this.project.resources ||
      !this.project.startDate ||
      !this.project.endDate
    ) {
      // Inform the user that all fields are required
      this.fieldsError = "All fields are required.";
      return; // Stop further execution
    }

    // Check if the name has at least 3 characters
    if (this.project.name.length < 3) {
      // Set error message for name validation
      this.nameError = "Name must have at least 3 characters.";
      return; // Stop further execution
    }

    // Check if the end date is greater than the start date
    if (this.project.endDate <= this.project.startDate) {
      // Set error message for end date validation
      this.endDateError = "End date must be greater than start date.";
      return; // Stop further execution
    }

    // Check if the end date is in the future
    if (new Date(this.project.endDate) <= new Date()) {
      // Set error message for end date validation
      this.endDateError = "End date must be in the future.";
      return; // Stop further execution
    }
    this.project.startDate = this.startDateString
      ? new Date(this.startDateString)
      : undefined;
    this.project.endDate = this.endDateString
      ? new Date(this.endDateString)
      : undefined;
    this.projectService
      .updateProject(this.project, this.selectedFile)
      .subscribe(
        (updatedProject: Project) => {
          this._coreService.openSnackBar(
            "Project updated successfully!",
            "done",
            2000
          );
          this.router.navigate(["/project-management"]);
        },
        (error) => {
          console.error("Error updating project:", error);
        }
      );
  }
  navigateBack(): void {
    if (this.from === "grid") {
      this.router.navigate(["/project-management/project-grid"]);
    } else if (this.from === "list") {
      this.router.navigate(["/project-management/project-list"]);
    } else {
      this.router.navigate(["/project-management"]);
    }
  }
  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files.length !== 1) {
      this.fileError = "Please select only one file.";
      this.imageSrc = null;
      return;
    }

    const file = files[0];
    if (!file.type.startsWith("image")) {
      this.fileError = "Please select an image file.";
      this.imageSrc = null;
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => (this.imageSrc = reader.result as string);
    reader.readAsDataURL(file);
    this.selectedFile = file;
    this.fileError = null;
  }
}
