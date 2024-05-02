import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatStateService {
  private chatIdSource = new BehaviorSubject<number>(1);
  private otherUserIdSource = new BehaviorSubject<number| null>(null);
  currentChatId = this.chatIdSource.asObservable();
  otherUserId = this.otherUserIdSource.asObservable();


  constructor() {}

  changeChatId(chatId: number): void {
    this.chatIdSource.next(chatId);
  }

  changeOtherUserId(userId: number): void {
    this.otherUserIdSource.next(userId);
  }
}
