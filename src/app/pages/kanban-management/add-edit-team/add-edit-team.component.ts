import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Team } from "src/app/models/team/team.model";
import { TeamService } from "src/app/service/kanban-management/team/team.service";
import { CoreService } from "src/app/service/notificationDialog/core.service";
import { userAdvanced } from "src/app/service/usermanagement/requestTypes/userAdvanced";
import { SharedUserService } from "src/app/service/usermanagement/shared/shared-user.service";

@Component({
  selector: "app-add-edit-team",
  templateUrl: "./add-edit-team.component.html",
  styleUrls: ["./add-edit-team.component.css"],
})
export class AddEditTeamComponent {
  fileError: string | null = null; // Error message for file validation
  imageSrc: string | ArrayBuffer | null = null; // Selected image preview
  fieldsError: string = ""; //Error message for fields
  memberListError: string = ""; //Error message for team members

  nameError: string = ""; // Error message for name validation
  descriptionError: string = ""; // Error message for scope validation
  ownerName: string = "John Doe"; //---
  projectId: number; //---- to change when i decode the token info
  searchResults: userAdvanced[] = [];
  searchResultsScrumMaster: userAdvanced[] = [];
  searchQuery: string = "";
  searchQueryScrum: string = "";
  cachedUserData: userAdvanced[] = [];

  team: Team = new Team();
  selectedFile: File | null = null;
  constructor(
    private teamService: TeamService,
    private router: Router,
    private route: ActivatedRoute,
    private _coreService: CoreService,
    private _dialogRef: MatDialogRef<AddEditTeamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sharedUserService: SharedUserService
  ) {}
  ngOnInit(): void {
    if (this.data?.team) {
      this.team = this.data.team;
      if (this.team.imageUrl) {
        this.imageSrc = this.team.imageUrl;
      }
    }
    if(this.data.projectId){
      this.projectId = this.data.projectId;
    }
    this.sharedUserService.getAllUsers().subscribe((users) => {
      this.cachedUserData = users;
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
    this.descriptionError = ""; // Check if the required fields are filled
    this.memberListError = "";
    if (!this.team.name || !this.team.description || !this.team.scrumMaster) {
      // Inform the user that all fields are required
      this.fieldsError = "All fields are required.";
      return; // Stop further execution
    }
    if (!this.team.members || this.team.members.length === 0) {
      this.memberListError = "At least one team member is required."; // Display error message
      return; // Stop further execution
    }
    // Check if the name has at least 3 characters
    if (this.team.name.length < 3) {
      // Set error message for name validation
      this.nameError = "Name must have at least 3 characters.";
      return; // Stop further execution
    }
    if (!this.data?.team) {
      this.team.projectId = this.projectId;
      this.teamService
        .createTeam(this.team.projectId, this.team, this.selectedFile)
        .subscribe(
          (response) => {
            this._coreService.openSnackBar(
              "Team created successfully!",
              "done",
              2000
            );
            this._dialogRef.close(true);
          },
          (error) => {
            this._coreService.openSnackBar(
              "Error creating team!",
              "error",
              2000
            );
            // handle error here
          }
        );
    } else {
      this.teamService.updateTeam(this.team, this.selectedFile).subscribe(
        (response) => {
          this._coreService.openSnackBar(
            "Team updated successfully!",
            "done",
            2000
          );
          this._dialogRef.close(true);
        },
        (error) => {
          this._coreService.openSnackBar("Error Updating team!", "error", 2000);
          // handle error here
        }
      );
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

  searchUsers(): void {
    if (this.searchQuery.trim() === "") {
      this.searchResults = [];
      return;
    }

    this.searchResults = this.cachedUserData.filter(
      (user) =>
        user.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.lastName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
  searchScrumMaster(): void {
    if (this.searchQueryScrum.trim() === "") {
      this.searchResultsScrumMaster = [];
      return;
    }

    this.searchResultsScrumMaster = this.cachedUserData.filter(
      (user) =>
        user.firstName
          .toLowerCase()
          .includes(this.searchQueryScrum.toLowerCase()) ||
        user.lastName
          .toLowerCase()
          .includes(this.searchQueryScrum.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchQueryScrum.toLowerCase())
    );
  }

  selectMember(user: userAdvanced): void {
    if (!this.team.members) {
      this.team.members = [];
    }
    if (!this.team.members.includes(user.id)) {
      this.team.members.push(user.id);
    }
  }

  removeMember(userId: number): void {
    if (this.team.members) {
      this.team.members = this.team.members.filter((id) => id !== userId);
    }
  }
  selectScrumMaster(user: userAdvanced): void {
    this.team.scrumMaster = user.id;
  }

  removeScrumMaster(): void {
    this.team.scrumMaster = undefined;
  }
  getUserFullNameById(userId: number): string {
    const user = this.cachedUserData.find((u) => u.id === userId);
    return user ? `${user.firstName} ${user.lastName}` : "";
  }
}
