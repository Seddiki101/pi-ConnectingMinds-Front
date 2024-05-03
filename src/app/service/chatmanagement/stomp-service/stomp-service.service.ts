import { Injectable } from '@angular/core';
import { IMessage, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class StompService {

  socket = new SockJS('http://localhost:8083/ws-chat');
  stompClient = Stomp.over(this.socket);

  subscribe(topic: string, callback?: any): void {
    const connected: boolean = this.stompClient.connected;
    if (connected) {
      this.subscribeToTopic(topic, callback);
      return;
    }
    this.stompClient.connect({}, (): any => {
      this.subscribeToTopic(topic, callback);
    })
  }

  private subscribeToTopic(topic: string, callback: (message: IMessage) => void): void {
    this.stompClient.subscribe(topic, (message: IMessage): void => {
      callback(message);
    });
  }
  // constructor() { }
}
