import { Component, OnInit } from '@angular/core';
import { chatUserDetails } from 'src/app/service/chatmanagement/request-types/chatUserDetails';
import { ProfileService } from 'src/app/service/usermanagement/profile-svc/profile.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html'
})
export class UserDetailsComponent implements OnInit {
  firstname: string | undefined;
  lastname: string | undefined;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.getProfile().subscribe({
      next: (data) => {     // Assuming 'userId' is the correct property in your UserRegister
        this.firstname = data.firstName; // Assuming 'firstname' is the correct property in your UserRegister
        this.lastname = data.lastName;   // Assuming 'lastname' is the correct property in your UserRegister
      },
      error: (error) => {
        console.error('Error retrieving profile:', error);
      }
    });
  }
}
