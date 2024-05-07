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
      this.reconnectAllSubscriptions();
    }, this.onError);
  }

  private onError = (error: string | Event) => {
    console.error('STOMP error:', error);
    this.connected = false;
    setTimeout(() => {
      this.initializeWebSocketConnection();
    }, 5000);
  };

  private reconnectAllSubscriptions(): void {
    Object.keys(this.subscriptions).forEach(topic => {
      const { callback } = this.subscriptions[topic];
      this.subscribe(topic, callback);
    });
  }

  public subscribe(topic: string, callback: (message: IMessage) => void): StompSubscription | undefined {
    if (this.subscriptions[topic]) {
      this.unsubscribe(topic);
    }

    if (!this.connected) {
      setTimeout(() => this.subscribe(topic, callback), 1000);
      return;
    }

    const subscription = this.stompClient.subscribe(topic, (message: IMessage) => {
      callback(message);
    });
    this.subscriptions[topic] = { subscription, callback };
    return subscription;
  }


  public unsubscribe(topic: string): void {
    if (this.subscriptions[topic]) {
      this.subscriptions[topic].subscription.unsubscribe();
      delete this.subscriptions[topic];
    }
  }
}