import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../service/usermanagement/profile-svc/profile.service'; 
import { UserRegister } from '../../../service/usermanagement/requestTypes/userRegister'; 
import { Router } from '@angular/router';
import { AuthenticService } from 'src/app/service/usermanagement/authentic/authentic.service';

@Component({
  selector: 'app-profile-back',
  templateUrl: './profile-back.component.html',
  styleUrls: ['./profile-back.component.css']
})
export class ProfileBackComponent implements OnInit {
  user: UserRegister | null = null;
  originalEmail: string | null = null;  // Store the original email to check changes
  error: string = '';

  constructor(
    private profileService: ProfileService,
    private authenticservice : AuthenticService
   // private router: Router  // Inject Router
  ) {}

  ngOnInit() {
    this.profileService.getProfile().subscribe({
      next: (data) => {
        this.user = data;
        this.originalEmail = data.email;  // Store original email
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to retrieve profile. Please try again.';
      }
    });
  }

  updateProfile() {
    if (!this.user) {
      this.error = 'No user data to update.';
      return;
    }

    const emailChanged = this.user.email !== this.originalEmail;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegex.test(this.user.email)) {
      alert('Please enter a valid email address');
      return;
    }

    if (!this.isAdult(this.user.birthdate)) {
      alert('You must be over the age of 17 to update your profile.');
      return;
    }

    this.profileService.updateProfile(this.user).subscribe({
      next: () => {
        alert('Profile updated successfully');
        if (emailChanged) {
          // If the email was changed, redirect to login cuz session changed
          //this.router.navigate(['/login']);
          this.authenticservice.endSession();

        }
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to update profile. Please try again.';
      }
    });
  }

  isAdult(birthDate: Date): boolean {
    const currentDate = new Date();
    const ageDiffMs = currentDate.getTime() - new Date(birthDate).getTime();
    const ageDate = new Date(ageDiffMs);
    return ageDate.getUTCFullYear() - 1970 > 17;
  }

}

