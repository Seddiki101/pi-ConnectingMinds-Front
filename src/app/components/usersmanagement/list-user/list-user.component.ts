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
    this.loadAllUsers();
  }

  loadAllUsers(): void {
    this.listUserService.getAllUsers().subscribe({
      next: (data) => this.users = data,
      error: (err) => this.errorHandling(err, 'Failed to retrieve users. Please try again.')
    });
  }

  searchUsers(keyword: string): void {
    if (!keyword) {
      this.loadAllUsers();
      return;
    }
    this.listUserService.searchUsers(keyword).subscribe({
      next: (data) => this.users = data,
      error: (err) => this.errorHandling(err, 'Failed to search users.')
    });
  }

  blockUser(user: userAdvanced): void {
    this.listUserService.blockUserById2(user.email).subscribe({
      next: (response) => {
        console.log(response); 
        alert('User has been blocked successfully');
        user.locked = true;
      },
      error: (err) => this.errorHandling(err, 'Error blocking user')
    });
  }



/*
  blockUser(user: userAdvanced): void {
    this.listUserService.blockUserById(user.id).subscribe({
      next: (response) => {
        console.log(response); 
        alert('User has been blocked successfully');
        user.locked = true;
      },
      error: (err) => this.errorHandling(err, 'Error blocking user')
    });
  }
  */

  private errorHandling(err: any, message: string): void {
    console.error(err);
    this.error = message;
  }
}
