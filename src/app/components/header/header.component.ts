import { Component, OnInit, Renderer2 } from "@angular/core";
import { Subscription } from "rxjs";
import { Notification } from "src/app/models/notification/notification.model";
import { Project } from "src/app/models/project/project.model";
import { NotificationService } from "src/app/service/kanban-management/notification/notification.service";
import { ProjectService } from "src/app/service/kanban-management/project/project.service";
import { StompService } from "src/app/service/kanban-management/stomp/stomp.service";
import { CoreService } from "src/app/service/notificationDialog/core.service";
import { AuthenticService } from "src/app/service/usermanagement/guard/authentic.service";
import { TokenService } from "src/app/service/usermanagement/token-svc/token-service.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  username: string | null = null;
  email: string | null = null;
  userImage: string = "assets/images/avatar/avatar-1.jpg";
  notifications: Notification[] = [];
  private notificationSubscription: Subscription;
  projects: Project[];
  ownerId: number;
  notOpen: number = 0;

  constructor(
    private authenticService: AuthenticService,
    private stompService: StompService,
    private projectService: ProjectService,
    private _coreService: CoreService,
    private notificationService: NotificationService,
    private tokenService: TokenService
  ) {}
  ngOnInit(): void {
    this.username = this.tokenService.getName(); // Fetch the username on component initialization
    this.email = this.tokenService.getEmail();
    this.updateUserImage();
    this.authenticService.getId().subscribe((id) => {
      this.ownerId = id;
      this.loadProjects();
    });
  }
  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.notificationSubscription) {
      this.notificationSubscription.unsubscribe();
    }
  }
  loadProjects(): void {
    this.projectService.getProjectsByUserId(this.ownerId).subscribe(
      (projects: Project[]) => {
        this.projects = projects;
        this.applyFilters();
      },
      (error) => {
        this._coreService.openSnackBar("Error loading!", "error", 2000);
      }
    );
  }
  private subscribeToNotifications(): void {
    this.notificationSubscription = this.stompService
      .getNotifications()
      .subscribe((notification) => {
        if (notification && notification.notificationId) {
          // Check if the notification with the same ID already exists
          const existingNotificationIndex = this.notifications.findIndex(
            (n) => n.notificationId === notification.notificationId
          );
          // If the notification doesn't exist, add it to the beginning of the array
          if (existingNotificationIndex === -1) {
            this.notifications.unshift(notification);
            if (!notification.isOpened) this.notOpen += 1;
          } else {
            // If the notification already exists, update it in the array
            this.notifications[existingNotificationIndex] = notification;
          }
        }
      });
  }
  applyFilters() {
    this.notificationService
      .getRecentNotifications()
      .subscribe((notifications) => {
        if (notifications && this.projects) {
          notifications.forEach((notification) => {
            this.projects.forEach((project) => {
              if (notification.projectId === project.projectId) {
                this.notifications.push(notification);
                if (!notification.isOpened) this.notOpen += 1;
              }
            });
          });
          this.subscribeToNotifications();
        }
      });
  }
  applyRefresh() {
    this.notifications = [];
    this.notificationService
      .getRecentNotifications()
      .subscribe((notifications) => {
        if (notifications && this.projects) {
          notifications.forEach((notification) => {
            this.projects.forEach((project) => {
              if (notification.projectId === project.projectId) {
                this.notifications.push(notification);
                if (!notification.isOpened) this.notOpen += 1;
              }
            });
          });
        }
      });
  }
  updateNotifStatus(notification: Notification) {
    if (!notification.isOpened) {
      notification.isOpened = true;
      this.notificationService
        .updateNotification(notification)
        .subscribe((result) => {
          const existingNotificationIndex = this.notifications.findIndex(
            (n) => n.notificationId === notification.notificationId
          );
          this.notifications[existingNotificationIndex] = result;
          this.notOpen -= 1;
        });
    }
  }
  onDelete(notification: Notification) {
    this.notificationService
      .deleteNotification(notification.notificationId)
      .subscribe((result) => {
        if (!notification.isOpened) {
          this.notOpen -= 1;
        }
        this.applyRefresh();
      });
  }
  //----------------------------------------------------------
  logout() {
    this.authenticService.endSession();
  }

  updateUserImage() {
    if (this.username) {
      const firstLetter = this.username[0].toUpperCase(); // Get first letter and make it uppercase
      this.userImage = `assets/profl/${firstLetter}.png`; // Construct the image path
    }
  }
}
