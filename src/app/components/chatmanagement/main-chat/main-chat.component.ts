import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FetchChatService } from 'src/app/service/chatmanagement/fetch-chat/fetch-chat.service';
import { ChatStateService } from 'src/app/shared/chat-state.service';
import { IMessageCreate, IUser } from 'src/app/shared/interfaces';
import { StompService } from 'src/app/service/chatmanagement/stomp-service/stomp-service.service';
import { SendMessageService } from 'src/app/service/chatmanagement/send-message/send-message.service';
import { UserServiceService } from 'src/app/service/chatmanagement/user-service/user-service.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.css'],
})
export class MainChatComponent implements OnInit, OnDestroy {
  chatData: any;
  user: IUser | null = null;
  otherUser: IUser | null = null;
  newMessage: string = '';
  currentSubscription: any;
  private userSubscription: Subscription | undefined;
  private destroy$ = new Subject<void>();

  constructor(
    private chatService: FetchChatService,
    private chatStateService: ChatStateService,
    private stompService: StompService,
    private sendMessageService: SendMessageService,
    private userService: UserServiceService 
  ) {}

  
ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();
}

  ngOnInit(): void {
    this.userService.getUserProfile().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (userData: IUser) => {  
        this.user = userData;
        if (this.user && this.user.userId) {
          this.chatStateService.currentChatId.subscribe(chatId => {
            this.loadChatData(chatId);
            this.subscribeToChatUpdates(chatId);
          });
          this.chatStateService.otherUser.subscribe((user: IUser | null) => {
            this.otherUser = user;
          });
        } else {
          console.error('User data is undefined or does not have userId');
        }
      },
      error: (error: unknown) => {
        console.error('Error fetching user data:', error);
      }
    });
  }

  loadChatData(chatId: number): void {
    this.chatService.getChat(chatId).subscribe({
      next: (data) => {
        this.chatData = data;
      },
      error: (error) => {
        console.error('Error fetching chat data:', error);
      }
    });
  }

  private subscribeToChatUpdates(chatId: number): void {
    if (this.currentSubscription) {
      this.stompService.unsubscribe(this.currentSubscription);
      this.currentSubscription = null;
    }
    const topic = `/topic/chat${chatId}`;
    const subscription = this.stompService.subscribe(topic, (message: any) => {
      const newMessage = JSON.parse(message.body);
      if (newMessage.content) {
        this.chatData.messages.push(newMessage);
      } else {
        console.warn("Received empty message:", message);
      }
    });

    if (subscription) {
      this.currentSubscription = subscription;
    } else {
      console.warn('Subscription could not be established immediately.');
    }
  }

  sendMessage(): void {
    if (this.newMessage.trim() !== '' && this.user && this.user.userId) {
      const message: IMessageCreate = {
        content: this.newMessage,
        chatId: this.chatData.chatId,
        userId: this.user.userId,
        timestamp: new Date()  // Set the current date and time as the timestamp
      };

      this.sendMessageService.sendMessage(message.content, message.chatId, message.userId)
        .subscribe({
          next: (response) => {
            console.log('Message sent successfully', response);
          },
          error: (error) => {
            console.error('Error sending message', error);
          }
        });

      this.newMessage = '';
    }
  }

  trackByMessageId(index: number, message: any): number {
    return message.id;
  }
}
