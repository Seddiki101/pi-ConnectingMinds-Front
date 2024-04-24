import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatStateService {
  private chatIdSource = new BehaviorSubject<number>(1); // Default user ID
  currentChatId = this.chatIdSource.asObservable();

  constructor() {}

  changeChatId(chatId: number): void {
    this.chatIdSource.next(chatId);
  }
}
