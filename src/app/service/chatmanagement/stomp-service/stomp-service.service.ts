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
    this.stompClient.reconnect_delay = 5000;
  }

  private manageConnection(topic: string, callback: (message: IMessage) => void): StompSubscription | undefined {
    let subscription: StompSubscription | undefined = undefined;
  
    if (this.stompClient.connected) {
      subscription = this.subscribeToTopic(topic, callback);
    } else {
      this.stompClient.connect({}, () => {
        // Ensure subscription is only made if not already subscribed during connection process
        if (!this.subscriptions[topic]) {
          this.subscriptions[topic] = this.subscribeToTopic(topic, callback);
        }
        subscription = this.subscriptions[topic];
      }, (error: any) => {
        console.error('Connection error:', error);
        subscription = undefined;
      });
    }
  
    return subscription;
  }

  subscribe(topic: string, callback: (message: IMessage) => void): StompSubscription | undefined {
    if (this.subscriptions[topic]) {
      // Return existing subscription if it already exists
      return this.subscriptions[topic];
    }
    
    return this.manageConnection(topic, callback);
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
