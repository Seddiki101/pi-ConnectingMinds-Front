import { TokenService } from 'src/app/service/usermanagement/token-svc/token-service.service';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { StompSubscription } from '@stomp/stompjs';
import { Subscription } from 'rxjs';
import { ChatListService } from 'src/app/service/chatmanagement/chat-list/chat-list.service';
import { StompService } from 'src/app/service/chatmanagement/stomp-service/stomp-service.service';
import { UserServiceService } from 'src/app/service/chatmanagement/user-service/user-service.service';
import { ChatStateService } from 'src/app/shared/chat-state.service';
import { IChatPreview } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-chat-sidebar',
  templateUrl: './chat-sidebar.component.html',
  styleUrls: ['./chat-sidebar.component.css']
})
export class ChatSidebarComponent implements OnInit, OnDestroy {
  userId: number | null = null;  // It's initially null
  firstName: string | null = null;
  lastName: string | null = null;
  userImage: string | null = null;
  chats: IChatPreview[] = [];
  private chatUpdatesSubscription: StompSubscription | undefined;
  private userSubscription: Subscription | undefined;

  constructor(
    private userService: UserServiceService,
    private chatListService: ChatListService,
    private chatStateService: ChatStateService,
    private stompService: StompService,
    private TokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.userService.getUserProfile().subscribe({
      next: (userData) => {
        if (userData && userData.userId) {
          this.firstName = userData.firstName
          this.lastName = userData.lastName
          this.userId = userData.userId
          if (this.userId) {
            this.fetchInitialChatList(this.userId);
            this.subscribeToChatUpdates(this.userId);
          }
        } else {
          console.error('User data is undefined or does not have userId');
        }
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
      }
    });
    this.userImage = this.TokenService.getPic();
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
    if (this.userId && this.chatUpdatesSubscription) {
      this.stompService.unsubscribe(`/topic/user${this.userId}`);
    }
  }

  private fetchInitialChatList(userId: number): void {
    if (userId != null) {  // Checking null before calling the service
      this.chatListService.getChatsForUser(userId).subscribe({
        next: (chats) => {
          this.chats = chats;
        },
        error: (error) => {
          console.error('Error fetching chats:', error);
        }
      });
    }
  }

  private subscribeToChatUpdates(userId: number): void {
    if (userId != null) {  // Checking null before subscribing
      const topic = `/topic/user${userId}`;
      this.chatUpdatesSubscription = this.stompService.subscribe(topic, (message) => {
        console.log("Update notification received, refetching chats.");
        this.fetchInitialChatList(userId);
      });
    }
  }

  selectChat(chatId: number, otherUserId: number): void {
    console.log(`Selecting chat - Chat ID: ${chatId}, Other User ID: ${otherUserId}`);
    this.chatStateService.changeChatId(chatId);
    this.chatStateService.changeOtherUserId(otherUserId);
  }
  

  trackByChatId(index: number, chat: IChatPreview): number {
    return chat.chatId; // Use chatId for unique identification
  }

  calculateTimeAgo = (dateStr: Date): string => {
    const dateCreated = new Date(dateStr);
    const dateNow = new Date();
    const timeDiff = dateNow.getTime() - dateCreated.getTime();

    const millisecondsInMinute = 60000;
    const millisecondsInHour = millisecondsInMinute * 60;
    const millisecondsInDay = millisecondsInHour * 24;
    const millisecondsInWeek = millisecondsInDay * 7;
    const millisecondsInMonth = millisecondsInDay * 30;
    const millisecondsInYear = millisecondsInDay * 365;

    if (timeDiff < millisecondsInMinute) {
      return `a few seconds ago`;
    }else if (timeDiff < millisecondsInHour) {
      const diffInMinutes = Math.floor(timeDiff / millisecondsInMinute);
      return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;
    }else if (timeDiff < millisecondsInDay) {
      const diffInHours = Math.floor(timeDiff / millisecondsInHour);
      return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
    } else if (timeDiff < millisecondsInWeek) {
      const diffInDays = Math.floor(timeDiff / millisecondsInDay);
      return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
    } else if (timeDiff < millisecondsInMonth) {
      const diffInWeeks = Math.floor(timeDiff / millisecondsInWeek);
      return `${diffInWeeks} week${diffInWeeks === 1 ? "" : "s"} ago`;
    } else if (timeDiff < millisecondsInYear) {
      const diffInMonths = Math.floor(timeDiff / millisecondsInMonth);
      return `${diffInMonths} month${diffInMonths === 1 ? "" : "s"} ago`;
    } else {
      const diffInYears = Math.floor(timeDiff / millisecondsInYear);
      return `${diffInYears} year${diffInYears === 1 ? "" : "s"} ago`;
    }
  };

}
