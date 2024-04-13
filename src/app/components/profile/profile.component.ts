import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../service/profile-svc/profile.service'; // Adjust the path as necessary
import { UserRegister } from '../../service/requestTypes/userRegister'; // Adjust the path as necessary

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: UserRegister | null = null;
  error: string = '';

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService.getProfile().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to retrieve profile. Please try again.';
      }
    });
  }
}
