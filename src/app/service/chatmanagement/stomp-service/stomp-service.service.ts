import { Injectable } from '@angular/core';
import { IMessage, Stomp, StompSubscription, StompHeaders } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class StompService {
  private socket: any;
  private stompClient: any;
  private subscriptions: { [key: string]: { subscription: StompSubscription, callback: (message: IMessage) => void } } = {};
  private connected: boolean = false;

  constructor() {
    this.initializeWebSocketConnection();
  }

  private initializeWebSocketConnection(): void {
    this.socket = new SockJS('http://localhost:8083/ws-chat');
    this.stompClient = Stomp.over(this.socket);
    this.stompClient.debug = (str: string) => console.log(str);
    this.stompClient.reconnect_delay = 5000;

    this.stompClient.connect({}, (frame: any) => {
      this.connected = true;
      console.log('Connected: ' + frame);
      this.reconnectAllSubscriptions();
    }, this.onError);
  }

  private onError = (error: string | Event) => {
    console.error('STOMP error:', error);
    this.connected = false;
    setTimeout(() => {
      this.initializeWebSocketConnection();
    }, 5000);  // Attempt to reconnect every 5 seconds
  };

  private reconnectAllSubscriptions(): void {
    Object.keys(this.subscriptions).forEach(topic => {
      const { callback } = this.subscriptions[topic];
      this.subscribe(topic, callback);
    });
  }

  public subscribe(topic: string, callback: (message: IMessage) => void): StompSubscription | undefined {
    // Explicit check to clean up any lingering subscriptions that might not have been cleaned up properly
    if (this.subscriptions[topic]) {
        console.warn(`Cleaning up existing subscription to ${topic}`);
        this.unsubscribe(topic);
    }

    if (!this.connected) {
        console.log('Attempted to subscribe without a connection; retrying...');
        setTimeout(() => this.subscribe(topic, callback), 1000);
        return;
    }

    const subscription = this.stompClient.subscribe(topic, (message: IMessage) => {
        callback(message);
    });
    this.subscriptions[topic] = { subscription, callback };
    console.log(`Subscribed to ${topic}`);
    return subscription;
}


  public unsubscribe(topic: string): void {
    if (this.subscriptions[topic]) {
      this.subscriptions[topic].subscription.unsubscribe();
      console.log(`Unsubscribed from ${topic}`);
      delete this.subscriptions[topic];
    }
  }
  public sendTypingStatus(topic: string, userId: number, isTyping: boolean): void {
    if (this.connected) {
        this.stompClient.send(`/app/${topic}`, {}, JSON.stringify({ userId, isTyping }));
        console.log("TypingSTatus===========================")
        console.log(JSON.stringify({ userId, isTyping }))
    } else {
        console.error("Cannot send typing status: WebSocket connection is not established.");
    }
}

}