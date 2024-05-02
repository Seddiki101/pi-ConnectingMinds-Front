import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from './interfaces';
import { UserServiceService } from '../service/chatmanagement/user-service/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class ChatStateService {
  private chatIdSource = new BehaviorSubject<number>(1);
  private otherUserSource = new BehaviorSubject<IUser| null>(null);
  currentChatId = this.chatIdSource.asObservable();
  otherUser = this.otherUserSource.asObservable();


  constructor(
    private userService: UserServiceService,
  ) {}

  changeChatId(chatId: number): void {
    this.chatIdSource.next(chatId);
  }

  changeOtherUserId(otherUserId: number): void {
    this.userService.getUserDetails(otherUserId).subscribe({
      next: (user: IUser) => {
        this.otherUserSource.next(user);
      }
    });
  }
}
