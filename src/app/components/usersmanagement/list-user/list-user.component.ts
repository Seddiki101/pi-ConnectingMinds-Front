import { Component, OnInit } from '@angular/core';
import { ListUserService } from '../../../service/usermanagement/listUserSvc/list-user-service.service';
import { userAdvanced } from '../../../service/usermanagement/requestTypes/userAdvanced';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  users: userAdvanced[] = [];
  error: string = '';

  constructor(private listUserService: ListUserService) { }

  ngOnInit() {
    this.listUserService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to retrieve users. Please try again.';
      }
    });
  }

  blockUser(user: userAdvanced): void {
    this.listUserService.blockUserById(user.id).subscribe({
      next: (response) => {
        console.log(response); // Log the server response
        alert('User has been blocked successfully');
        user.locked = true; // Assuming the 'locked' field exists and is to be updated
      },
      error: (err) => {
        console.error('Failed to block the user:', err);
        alert('Error blocking user');
      }
    });
  }
}
