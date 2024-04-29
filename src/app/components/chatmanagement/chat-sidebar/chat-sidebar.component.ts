
import { Component, OnDestroy, OnInit } from '@angular/core';
import { StompSubscription } from '@stomp/stompjs';
import { Subscription } from 'rxjs';
import { ChatListService } from 'src/app/service/chatmanagement/chat-list/chat-list.service';
import { StompService } from 'src/app/service/chatmanagement/stomp-service/stomp-service.service';
import { ChatStateService } from 'src/app/shared/chat-state.service';
import { IChatPreview } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-chat-sidebar',
  templateUrl: './chat-sidebar.component.html',
  styleUrls: ['./chat-sidebar.component.css']
})
export class ChatSidebarComponent implements OnInit, OnDestroy {
  userId = 1;
  chats: IChatPreview[] = [];
  private chatUpdatesSubscription: StompSubscription | undefined;

  constructor(private chatListService: ChatListService, private chatStateService: ChatStateService, private stompService: StompService) { }

  ngOnInit(): void {
    this.fetchInitialChatList(this.userId);
    this.subscribeToChatUpdates(this.userId);
  }
  ngOnDestroy(): void {
    if (this.chatUpdatesSubscription) {
      this.stompService.unsubscribe(`/topic/user${this.userId}`);
    }
  }

  private fetchInitialChatList(userId: number): void {
    this.chatListService.getChatsForUser(userId).subscribe({
      next: (chats) => {
        this.chats = chats;
      },
      error: (error) => {
        console.error('Error fetching chats:', error);
      }
    });
  }

  selectChat(chatId: number): void {
    this.chatStateService.changeChatId(chatId);
  }
  private subscribeToChatUpdates(userId: number): void {
    const topic = `/topic/user${userId}`;  // This should match the server-side format now
    console.log(`Subscribing to ${topic}`);  // Debug log to confirm subscription topic

    this.chatUpdatesSubscription = this.stompService.subscribe(topic, (message) => {
      console.log("Update notification received, refetching chats.");
      console.log(message);

      this.fetchInitialChatList(userId);  // Refresh the entire list upon receiving an update notification
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
