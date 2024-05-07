import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/service/chatmanagement/message-service/message.service';
import { UserServiceService } from 'src/app/service/chatmanagement/user-service/user-service.service';
import { TokenService } from 'src/app/service/usermanagement/token-svc/token-service.service';
import { IUser } from 'src/app/shared/interfaces';


@Component({
  selector: 'app-send-message-modal',
  templateUrl: './send-message-modal.component.html',
  styleUrls: ['./send-message-modal.component.css']
})
export class SendMessageModalComponent {
  user: IUser | null = null;
  users: any[] = [];
  selectedUser: any | null = null;
  filteredUsers: any[] = [];
  loggedInUserEmail: string | null = null;
  messageContent: string | null = null;
  private userSubscription: Subscription | undefined;

  constructor(
    private userService: UserServiceService,
    private tokenService: TokenService,
    private messageService: MessageService,

  ) {
    this.loadAllUsers();
    this.loggedInUserEmail = this.tokenService.getEmail();
  }

  ngOnInit(): void {
    this.userSubscription = this.userService.getUserProfile().subscribe({
      next: (userData: IUser) => {
        if (userData && userData.userId) {
          this.user = userData;
        } else {
          console.error('User data is undefined or does not have userId');
        }
      }
    });
  }
  loadAllUsers() {
    this.userService.getAllUsers().subscribe(
      (users: any[]) => {
        this.users = users;
        this.filterUsers();
      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );
  }

  filterUsers() {
    this.filteredUsers = this.users.filter(user => user.email !== this.loggedInUserEmail);
  }

  searchUsers(searchTerm: string) {
    this.filteredUsers = this.users.filter(user =>
      (user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      user.email !== this.loggedInUserEmail
    );
  }

  selectUser(user: any, event: MouseEvent) {
    event.preventDefault();
    this.selectedUser = user;
  }

  backToList() {
    this.selectedUser = null;
  }

  sendMessage() {
    if (this.selectedUser && this.messageContent && this.user?.userId) {
      this.messageService.newMessage(this.messageContent, this.user?.userId, this.selectedUser.id).subscribe({
        next: (response) => {
        },
        error: (error) => {
          console.error('Failed to send message', error);
        }
      });
    }
  }
}