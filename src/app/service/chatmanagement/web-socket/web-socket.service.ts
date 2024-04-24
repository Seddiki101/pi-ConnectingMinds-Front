// web-socket.service.ts
import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';
import SockJS from 'sockjs-client';
import { HttpClient } from '@angular/common/http'; // I // Import IMessageCreate interface
import { IMessageCreate } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private client: Client;
  private messageSubject: Subject<Message> = new Subject<Message>();

  constructor(private http: HttpClient) { // Inject HttpClient
    const socket = new SockJS('/ws-chat');
    this.client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(str)
    });

    this.client.activate();

    this.client.onConnect = () => {
      this.client.subscribe('/topic/messages', (message) => {
        this.messageSubject.next(message);
      });
    };
  }

  sendMessage(message: IMessageCreate): void { // Update to accept IMessageCreate interface
    // Send the message object to the backend API endpoint
    this.http.post('/api/messages', message).subscribe(
      (response) => {
        console.log('Message sent successfully:', response);
      },
      (error) => {
        console.error('Error sending message:', error);
      }
    );
  }

  getMessage(): Observable<Message> {
    return this.messageSubject.asObservable();
  }
}
