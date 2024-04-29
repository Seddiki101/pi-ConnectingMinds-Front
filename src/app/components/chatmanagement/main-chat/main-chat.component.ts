import { SendMessageService } from './../../../service/chatmanagement/send-message/send-message.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FetchChatService } from 'src/app/service/chatmanagement/fetch-chat/fetch-chat.service';
import { ChatStateService } from 'src/app/shared/chat-state.service';
import { IMessageCreate } from 'src/app/shared/interfaces';
import { StompService } from 'src/app/service/chatmanagement/stomp-service/stomp-service.service';
import { ProfileService } from 'src/app/service/usermanagement/profile-svc/profile.service';

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.css'],
})
export class MainChatComponent implements OnInit, OnDestroy {
  chatData: any;
  thisUserId = 1;
  newMessage: string = '';
  currentSubscription: any;

  constructor(
    private chatService: FetchChatService,
    private chatStateService: ChatStateService,
    private stompService: StompService,
    private sendMessageService: SendMessageService,
  ) {}

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.currentSubscription) {
      this.currentSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.chatStateService.currentChatId.subscribe(chatId => {
      this.loadChatData(chatId);
      this.subscribeToChatUpdates(chatId);
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
      // console.log("Received message:", message);
      const newMessage = JSON.parse(message.body);
      if (newMessage.content) {
        this.chatData.messages.push(newMessage);
        // console.log('New message received===========================:', newMessage);
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
  if (this.newMessage.trim() !== '') {
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
          // Remove local addition here, WebSocket will handle the update
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
