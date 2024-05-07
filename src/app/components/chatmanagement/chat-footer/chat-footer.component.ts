import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from '../../../service/chatmanagement/message-service/message.service';
import { IMessageCreate } from '../../../shared/interfaces';
import { StompService } from 'src/app/service/chatmanagement/stomp-service/stomp-service.service';
import { UserServiceService } from 'src/app/service/chatmanagement/user-service/user-service.service';
import { ChatStateService } from 'src/app/shared/chat-state.service';


@Component({
  selector: 'app-chat-footer',
  templateUrl: './chat-footer.component.html',
  styleUrls: ['./chat-footer.component.css']
})
export class ChatFooterComponent implements OnInit, OnDestroy {
  @Input() newMessage: string = '';
  @Output() messageSent = new EventEmitter<void>();

  typingTimeout: any;
  private userId: number | null = null;
  private currentChatId: number | null = null;
  private userSubscription: Subscription;


  constructor(
    private messageService: MessageService,
    private userService: UserServiceService,
    private chatStateService: ChatStateService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.userService.getUserProfile().subscribe({
      next: (userData: any) => {
        this.userId = userData.userId;
        if (this.userId) {
          this.chatStateService.currentChatId.subscribe(chatId => {
            this.currentChatId = chatId;
          })
        }
      },
      error: (error) => {
        console.error('Failed to fetch user data:', error);
      }
    });
    
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  sendMessage(): void {
    // Ensure both userId and chatId are not null
    if (this.newMessage.trim() !== '' && this.userId && this.currentChatId !== null) {
      const message: IMessageCreate = {
        content: this.newMessage,
        chatId: this.currentChatId,
        userId: this.userId,
        timestamp: new Date()
      };
  
      this.messageService.sendMessage(message.content, message.chatId, message.userId).subscribe({
        next: (response) => {
          this.messageSent.emit();
        },
        error: (error) => console.error('Error sending message', error)
      });
  
      this.newMessage = '';
    } else {
      console.error('Cannot send message, chatId or userId is null');
    }
  }
  
}
