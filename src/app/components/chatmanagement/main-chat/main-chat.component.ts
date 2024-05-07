import { Component, OnDestroy, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FetchChatService } from 'src/app/service/chatmanagement/fetch-chat/fetch-chat.service';
import { ChatStateService } from 'src/app/shared/chat-state.service';
import { IMessage, IUser } from 'src/app/shared/interfaces';
import { StompService } from 'src/app/service/chatmanagement/stomp-service/stomp-service.service';
import { MessageService } from 'src/app/service/chatmanagement/message-service/message.service';
import { UserServiceService } from 'src/app/service/chatmanagement/user-service/user-service.service';
import { IMessage as StompMessage } from '@stomp/stompjs';
import { ChatFooterComponent } from '../chat-footer/chat-footer.component';



@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.css'],
})
export class MainChatComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  @ViewChild(ChatFooterComponent) private chatFooterComponent: ChatFooterComponent;

  chatData: any;
  user: IUser | null = null;
  otherUser: IUser | null = null;
  newMessage: string = '';
  currentSubscription: any;
  private destroy$ = new Subject<void>();

  constructor(
    private chatService: FetchChatService,
    private chatStateService: ChatStateService,
    private stompService: StompService,
    private messageService: MessageService,
    private userService: UserServiceService
  ) { }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  ngOnInit(): void {
    this.userService.getUserProfile().pipe(takeUntil(this.destroy$)).subscribe({
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadChatData(chatId: number): void {
    this.chatService.getChat(chatId).subscribe({
      next: (data) => {
        this.chatData = data;


        this.scrollToBottom();
      },
      error: (error) => {
        console.error('Error fetching chat data:', error);
      }
    });
  }

  private subscribeToChatUpdates(chatId: number): void {
    const topic = `/topic/chat${chatId}`;
    if (this.currentSubscription) {
      this.currentSubscription.unsubscribe();
    }
    this.currentSubscription = this.stompService.subscribe(topic, (stompResponse: StompMessage) => {
      const message: IMessage = JSON.parse(stompResponse.body);
      this.processReceivedMessage(message);
    });
  }

  private processReceivedMessage(message: IMessage): void {
    if (!message.content) {
      console.error("Received empty or malformed message:", message);
      return;
    }

    const existingMessageIndex = this.chatData.messages.findIndex((m: IMessage) => m.messageId === message.messageId);
    if (existingMessageIndex === -1) {
      this.chatData.messages.push(message);
    } else {
      this.chatData.messages[existingMessageIndex] = message;
    }

    this.forceUpdate();
  }



  sendMessage(): void {
    if (this.newMessage.trim() !== '' && this.user && this.user.userId) {
      const messagePayload = {
        content: this.newMessage,
        chatId: this.chatData.chatId,
        userId: this.user.userId
      };

      this.messageService.sendMessage(messagePayload.content, messagePayload.chatId, messagePayload.userId)
        .subscribe({
          next: (fullMessage: IMessage) => {

            this.chatData.messages.push(fullMessage);
            this.newMessage = '';
            this.scrollToBottom();
          },
          error: (error) => {
            console.error('Error sending message', error);
          }
        });
    }
  }


  deleteMessage(message: IMessage): void {
    this.messageService.deleteMessage(message.messageId).subscribe({
      next: () => {
        const index = this.chatData.messages.findIndex((m: IMessage) => m.messageId === message.messageId);
        if (index !== -1) {
          this.chatData.messages[index].deleted = true;
          this.chatData.messages[index].content = "This message was deleted";
          this.chatData.messages[index].seen = true;

          this.forceUpdate();
        }
      },
      error: (error) => {
        console.error('Error deleting message:', error);
      }
    });
  }

  editMessage(message: IMessage): void {
    if (this.chatFooterComponent) {
      this.chatFooterComponent.setEditingMessage(message);
    } else {
      console.error('ChatFooterComponent is not available.');
    }
  }

  private forceUpdate() {
    this.chatData = { ...this.chatData };
  }


  private scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Could not scroll to bottom:', err);
    }
  }

  trackByMessageId(index: number, message: any): number {
    return message.id;
  }
  isLastMessageFromUser(index: number): boolean {
    if (index + 1 === this.chatData.messages.length) return true;
    return this.chatData.messages[index].userId === this.chatData.messages[index + 1].userId ? false : true;
  }
}
