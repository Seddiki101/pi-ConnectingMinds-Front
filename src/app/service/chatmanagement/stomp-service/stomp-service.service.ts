import { Injectable } from '@angular/core';
import { IMessage, Stomp, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class StompService {
  private socket = new SockJS('http://localhost:8083/ws-chat');
  private stompClient = Stomp.over(this.socket);
  private subscriptions: { [key: string]: StompSubscription } = {};

  constructor() {
    // Configure the STOMP client here if necessary, e.g., logging, etc.
    this.stompClient.debug = (msg: string) => console.log(msg);
  }

  subscribe(topic: string, callback: (message: IMessage) => void): StompSubscription | undefined {
    if (this.subscriptions[topic]) {
      // Return existing subscription if it already exists
      return this.subscriptions[topic];
    }
    
    if (this.stompClient.connected) {
      // If already connected, subscribe immediately
      return this.subscribeToTopic(topic, callback);
    } else {
      // Connect first and then subscribe
      this.stompClient.connect({}, () => {
        if (!this.subscriptions[topic]) { // Ensure no subscription was created during the connection process
          this.subscriptions[topic] = this.subscribeToTopic(topic, callback);
        }
      }, (error: any) => {
        console.error('Connection error:', error);
        return undefined;
      });
      return undefined; // Return undefined while the connection is being established
    }
  }

  private subscribeToTopic(topic: string, callback: (message: IMessage) => void): StompSubscription {
    const subscription = this.stompClient.subscribe(topic, (message: IMessage) => {
      callback(message);
    });
    this.subscriptions[topic] = subscription; // Store the subscription
    return subscription;
  }

  unsubscribe(topic: string): void {
    const subscription = this.subscriptions[topic];
    if (subscription) {
      subscription.unsubscribe();
      delete this.subscriptions[topic]; // Remove the subscription reference
    }
  }
}
