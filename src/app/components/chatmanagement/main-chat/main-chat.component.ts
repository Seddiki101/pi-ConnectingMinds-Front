import { Component, OnDestroy, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FetchChatService } from 'src/app/service/chatmanagement/fetch-chat/fetch-chat.service';
import { ChatStateService } from 'src/app/shared/chat-state.service';
import { IMessageCreate, IUser } from 'src/app/shared/interfaces';
import { StompService } from 'src/app/service/chatmanagement/stomp-service/stomp-service.service';
import { SendMessageService } from 'src/app/service/chatmanagement/send-message/send-message.service';
import { UserServiceService } from 'src/app/service/chatmanagement/user-service/user-service.service';

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.css'],
})
export class MainChatComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
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
        this.scrollToBottom(); // Scroll after data is loaded
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
    this.currentSubscription = this.stompService.subscribe(topic, (message: any) => {
      const newMessage = JSON.parse(message.body);
      if (newMessage.content) {
        this.chatData.messages.push(newMessage);
        this.scrollToBottom(); // Scroll after message is received
      } else {
        console.warn("Received empty message:", message);
      }
    });
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
            this.chatData.messages.push(message); // Add the message to chat data
            this.newMessage = ''; // Clear input field
            this.scrollToBottom(); // Scroll after message sent
            console.log('Message sent successfully', response);
          },
          error: (error) => {
            console.error('Error sending message', error);
          }
        });
    }
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
  isLastMessageFromUser(index: number, userId: number): boolean {
    if (index + 1 === this.chatData.messages.length) return true; // Last message in array
    return this.chatData.messages[index].userId === this.chatData.messages[index + 1].userId ? false : true;
  }
  
}
