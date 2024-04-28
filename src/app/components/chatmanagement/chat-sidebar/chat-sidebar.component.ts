
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatListService } from 'src/app/service/chatmanagement/chat-list/chat-list.service';
import { ChatStateService } from 'src/app/shared/chat-state.service';
import { IChatPreview } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-chat-sidebar',
  templateUrl: './chat-sidebar.component.html',
  styleUrls: ['./chat-sidebar.component.css']
})
export class ChatSidebarComponent {

  
  chats: IChatPreview[] = [ ];

  constructor(private chatListService: ChatListService,private chatStateService: ChatStateService) {}

  ngOnInit(): void {
    const userId = 1;
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

    if (timeDiff < millisecondsInHour) {
        const diffInMinutes = Math.floor(timeDiff / millisecondsInMinute);
        return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;
    } else if (timeDiff < millisecondsInDay) {
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
