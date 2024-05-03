import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { SendMessageService } from 'src/app/service/chatmanagement/send-message/send-message.service';
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
    private sendMessageService: SendMessageService,
    
  ) {
    this.loadAllUsers();
    this.loggedInUserEmail = this.tokenService.getEmail(); // Get logged in user's email
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
        this.filterUsers();  // Call filter users to initially filter out the logged in user
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
      user.email !== this.loggedInUserEmail // Filter out the logged in user from the search results as well
    );
  }

  selectUser(user: any, event: MouseEvent) {
    event.preventDefault(); // Prevents the default link behavior
    this.selectedUser = user;
  }

  backToList() {
    this.selectedUser = null; // Deselects any selected user and shows the list again
  }

  sendMessage() {
    if (this.selectedUser && this.messageContent && this.user?.userId) {
      this.sendMessageService.newMessage(this.messageContent, this.user?.userId, this.selectedUser.id).subscribe({
        next: (response) => {
          console.log('Message sent successfully', response);
        },
        error: (error) => {
          console.error('Failed to send message', error);
        }
      });
    }
  }
  // closeModal() {
  //   const modalElement = document.getElementById('newchatModal');
  //   if (modalElement) {
  //     const modalInstance = bootstrap.Modal.getInstance(modalElement);  
  //     if (modalInstance) {
  //       modalInstance.hide();
  //     }
  //   }
  //   this.selectedUser = null;
  //   this.messageContent = '';
  // }
}
