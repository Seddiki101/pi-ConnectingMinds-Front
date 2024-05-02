import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FetchChatService } from 'src/app/service/chatmanagement/fetch-chat/fetch-chat.service';
import { ChatStateService } from 'src/app/shared/chat-state.service';
import { IMessageCreate } from 'src/app/shared/interfaces';
import { StompService } from 'src/app/service/chatmanagement/stomp-service/stomp-service.service';
import { SendMessageService } from 'src/app/service/chatmanagement/send-message/send-message.service';
import { UserServiceService } from 'src/app/service/chatmanagement/user-service/user-service.service';

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.css'],
})
export class MainChatComponent implements OnInit, OnDestroy {
  chatData: any;
  thisUserId: number | null = null; // Initially null
  newMessage: string = '';
  currentSubscription: any;
  private userSubscription: Subscription | undefined;

  constructor(
    private chatService: FetchChatService,
    private chatStateService: ChatStateService,
    private stompService: StompService,
    private sendMessageService: SendMessageService,
    private userService: UserServiceService 
  ) {}

  ngOnDestroy(): void {
    if (this.currentSubscription) {
      this.currentSubscription.unsubscribe();
    }
    this.userSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.userSubscription = this.userService.getUserProfile().subscribe({
      next: (userData: unknown) => {  // Change type to unknown
        const user = userData as { userId: number };  // Type assertion
        if (user && user.userId) {
          this.thisUserId = user.userId;
          this.chatStateService.currentChatId.subscribe(chatId => {
            this.loadChatData(chatId);
            this.subscribeToChatUpdates(chatId);
            console.log("main-chat component ===========")
            console.log("chat id "+ chatId)
            console.log("user id "+this.thisUserId)
          });
        } else {
          console.error('User data is undefined or does not have userId');
        }
      },
      error: (error: unknown) => {  // Change type to unknown
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
    if (this.newMessage.trim() !== '' && this.thisUserId) {
      const message: IMessageCreate = {
        content: this.newMessage,
        chatId: this.chatData.chatId,
        userId: this.thisUserId,
        timestamp: new Date()  // Set the current date and time as the timestamp
      };

      // Send the message using the SendMessageService
      this.sendMessageService.sendMessage(message.content, message.chatId, message.userId)
        .subscribe({
          next: (response) => {
            console.log('Message sent successfully', response);
          },
          error: (error) => {
            console.error('Error sending message', error);
          }
        });

      // Clear the input field after sending the message
      this.newMessage = '';
    }
  }
}
