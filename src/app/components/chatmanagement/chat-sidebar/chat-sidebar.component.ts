import { TokenService } from 'src/app/service/usermanagement/token-svc/token-service.service';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { StompSubscription } from '@stomp/stompjs';
import { Subscription } from 'rxjs';
import { ChatListService } from 'src/app/service/chatmanagement/chat-list/chat-list.service';
import { StompService } from 'src/app/service/chatmanagement/stomp-service/stomp-service.service';
import { UserServiceService } from 'src/app/service/chatmanagement/user-service/user-service.service';
import { ChatStateService } from 'src/app/shared/chat-state.service';
import { IChatPreview, IUser } from 'src/app/shared/interfaces';
import { ChatService } from 'src/app/service/chatmanagement/chat/chat.service';

@Component({
  selector: 'app-chat-sidebar',
  templateUrl: './chat-sidebar.component.html',
  styleUrls: ['./chat-sidebar.component.css']
})
export class ChatSidebarComponent implements OnInit, OnDestroy {
  user: IUser | null = null;
  chats: IChatPreview[] = [];
  searchTerm: string = '';
  private chatUpdatesSubscription: StompSubscription | undefined;
  private userSubscription: Subscription | undefined;

  constructor(
    private chatService: ChatService,
    private userService: UserServiceService,
    private chatListService: ChatListService,
    private chatStateService: ChatStateService,
    private stompService: StompService,
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.userService.getUserProfile().subscribe({
      next: (userData: IUser) => {
        if (userData && userData.userId) {
          
          this.user = userData;
          if (this.user && this.user.userId) {
            this.fetchInitialChatList(this.user.userId);
            this.subscribeToChatUpdates(this.user.userId);
          }
        } else {
          console.error('User data is undefined or does not have userId');
        }
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
      }
    });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
    if (this.user && this.user.userId && this.chatUpdatesSubscription) {
      this.stompService.unsubscribe(`/topic/user${this.user.userId}`);
    }
  }

  private fetchInitialChatList(userId: number): void {
    if (userId != null) { 
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
    if (userId != null) {  
      const topic = `/topic/user${userId}`;
      this.chatUpdatesSubscription = this.stompService.subscribe(topic, (message) => {
        console.log("Update notification received, refetching chats.");
        this.fetchInitialChatList(userId);
      });
    }
  }

  filteredChats(): IChatPreview[] {
    return this.chats.filter(chat => 
      chat.name.toLowerCase().includes(this.searchTerm.toLowerCase()) 
    );
  }
  selectChat(chatId: number, otherUserId: number): void {
    this.chatStateService.changeChatId(chatId);
    this.chatStateService.changeOtherUserId(otherUserId);
  }
  

  trackByChatId(index: number, chat: IChatPreview): number {
    return chat.chatId; 
  }

  deleteChat(chatId: number): void {
    this.chatService.deleteChat(chatId).subscribe({
      next: response => {
        console.log('Chat deleted successfully');
        this.chats = this.chats.filter(chat => chat.chatId !== chatId); 
      },
      error: error => console.error('Error deleting chat', error)
    });
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
