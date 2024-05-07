import { Component, OnInit } from '@angular/core';
import { chatUserDetails } from 'src/app/service/chatmanagement/request-types/chatUserDetails';
import { ProfileService } from 'src/app/service/usermanagement/profile-svc/profile.service';
import { UserServiceService } from 'src/app/service/chatmanagement/user-service/user-service.service';
import { ChatStateService } from 'src/app/shared/chat-state.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html'
})
export class UserDetailsComponent implements OnInit {
  firstname: string | undefined;
  lastname: string | undefined;
  pic: string | undefined;

  constructor(
    private userService: UserServiceService,
    private chatStateService: ChatStateService
  ) { }

  ngOnInit(): void {
    combineLatest([
      this.chatStateService.currentChatId,
      this.chatStateService.otherUser
    ]).subscribe(([chatId, otherUser]) => {
      if (otherUser && chatId) {
        this.userService.getUserDetails(otherUser?.userId).subscribe({
          next: (data) => {

            this.firstname = data.firstName;
            this.lastname = data.lastName;
            const firstLetter = data.firstName[0].toUpperCase();
            this.pic = `assets/profl/${firstLetter}.png`;
          },
          error: (error) => console.error('Error retrieving profile:', error)
        });
      } else {
      }
    });
  }


}
