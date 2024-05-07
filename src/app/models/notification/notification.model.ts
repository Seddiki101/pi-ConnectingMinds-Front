export class Notification {
  notificationId: number;
  content: string;
  createdAt: Date;
  isOpened: boolean;
  memberId: number;
  projectId: number;
  teamId?: number;
}
