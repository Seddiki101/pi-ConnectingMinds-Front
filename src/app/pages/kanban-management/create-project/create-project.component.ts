import { Component, Inject, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Project } from "src/app/models/project/project.model";
import { ProjectService } from "src/app/service/kanban-management/project/project.service";
import { jwtDecode } from "jwt-decode";
import { CoreService } from "src/app/service/notificationDialog/core.service";

@Component({
  selector: "app-create-project",
  templateUrl: "./create-project.component.html",
  styleUrls: ["./create-project.component.css"],
})
export class CreateProjectComponent implements OnInit {
  fileError: string | null = null; // Error message for file validation
  imageSrc: string | ArrayBuffer | null = null; // Selected image preview
  fieldsError: string = ""; //Error message for fields
  nameError: string = ""; // Error message for name validation
  scopeError: string = ""; // Error message for scope validation
  resourcesError: string = ""; // Error message for resources validation
  endDateError: string = ""; // Error message for end date validation
  ownerName: string = "John Doe"; //---
  ownerId: number = 1; //---- to change when i decode the token info

  private from: string;
  project: Project = new Project();
  selectedFile: File | null = null;
  
  constructor(
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute,
    private _coreService: CoreService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.from = params["from"];
    });
    /* const token = localStorage.getItem("auth_token");
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
    }*/
  }
  onSubmit() {
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
      !this.project.endDate ||
      !this.project.projectStatus
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
    this.project.owner = this.ownerName;
    this.project.ownerId = this.ownerId;
    this.projectService
      .createProject(this.project, this.selectedFile)
      .subscribe(
        (response) => {
          this._coreService.openSnackBar(
            "Project created successfully!",
            "done",
            2000
          );
          this.router.navigate(["/project-management"]);
          // handle successful creation here
        },
        (error) => {
          console.error("Error creating project:", error);
          // handle error here
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
