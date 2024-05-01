import { Component, OnInit } from '@angular/core';
import { ListUserService } from '../../../service/usermanagement/listUserSvc/list-user-service.service';
import { userAdvanced } from '../../../service/usermanagement/requestTypes/userAdvanced';

@Component({
  selector: 'app-list-user2',
  templateUrl: './list-user2.component.html',
  styleUrls: ['./list-user2.component.css']
})
export class ListUser2Component implements OnInit {
  users: userAdvanced[] = [];
  error: string = '';

  constructor(private listUserService: ListUserService) { }

  ngOnInit() {
    this.loadAllUsers();
  }

  loadAllUsers(): void {
    this.listUserService.getAllAdmins().subscribe({
      next: (data) => this.users = data,
      error: (err) => this.errorHandling(err, 'Failed to retrieve users. Please try again.')
    });
  }

  searchUsers(keyword: string): void {
    if (!keyword) {
      this.loadAllUsers();
      return;
    }
    this.listUserService.searchUsers2(keyword).subscribe({
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


  revokeUser(user: userAdvanced): void {
    this.listUserService.revoke(user.email).subscribe({
      next: (response) => {
        console.log(response); 
        alert('access revoked successfully');
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
