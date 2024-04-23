import { Event } from "../event/event.model";
import { Notification } from "../notification/notification.model";
import { Task } from "../task/task.model";

export class Team {
  teamId?: number;
  name?: string;
  description?: string;
  scrumMaster?: number;
  members?: number[];
  projectId?: number;
  notifications?: Notification[];
  events?: Event[];
  tasks?: Task[];
}
