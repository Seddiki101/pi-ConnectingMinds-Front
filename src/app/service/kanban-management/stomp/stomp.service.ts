import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import * as SockJS from "sockjs-client";
import { Notification } from "src/app/models/notification/notification.model";
import { environment } from "src/environments/environment";
import { Stomp } from "@stomp/stompjs";
import { TokenService } from "../../usermanagement/token-svc/token-service.service";

@Injectable({
  providedIn: "root",
})
export class StompService {
  private stompClient: any;
  private notificationsSubject: BehaviorSubject<Notification | undefined>;

  constructor(private tokenService: TokenService) {
    this.notificationsSubject = new BehaviorSubject<Notification | undefined>(
      undefined
    );
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    const socket = new SockJS(environment.forum + "/user-websocket");
    this.stompClient = Stomp.over(socket);
    const that = this;
    this.stompClient.connect(
      {},
      function (frame: any) {
        that.stompClient.subscribe(
          "/topic/notifications",
          (notification: any) => {
            if (notification.body) {
              const parsedNotification: Notification = JSON.parse(
                notification.body
              );
              that.notificationsSubject.next(parsedNotification);
            }
          }
        );
      },
      function (error: any) {
        console.error("WebSocket error: " + error);
      }
    );
  }

  getNotifications() {
    return this.notificationsSubject.asObservable();
  }
}
