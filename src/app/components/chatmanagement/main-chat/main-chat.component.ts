import { SendMessageService } from './../../../service/chatmanagement/send-message/send-message.service';
import { Component, OnInit } from '@angular/core';
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
export class MainChatComponent implements OnInit {
  chatData: any;
  thisUserId = 1;
  newMessage: string = '';
  currentSubscription: any;

  constructor(
    private chatService: FetchChatService,
    private chatStateService: ChatStateService,
    private stompService: StompService,
    private sendMessageService: SendMessageService,
    private profileService: ProfileService
    // private webSocketService: WebSocketService // Injected WebSocketService
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
    // Unsubscribe previous subscription if it exists
    if (this.currentSubscription) {
      this.currentSubscription.unsubscribe();
    }
    const topic = `/topic/chat${chatId}`;
    this.currentSubscription = this.stompService.subscribe(topic, (message: any) => {
      const newMessage = JSON.parse(message.body);
      this.chatData.messages.push(newMessage);
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim() !== '') {
      const message: IMessageCreate = { // Make sure this conforms to the IMessageCreate interface
        content: this.newMessage,
        chatId: this.chatData.chatId,
        userId: this.thisUserId
      };
  
      // Send the message using the SendMessageService
      this.sendMessageService.sendMessage(message.content, message.chatId, message.userId)
        .subscribe({
          next: (response) => {
            console.log('Message sent successfully', response);
            // The WebSocket subscription will update the chat with the new message
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
