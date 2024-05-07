import { Event } from "../event/event.model";
import { Task } from "../task/task.model";

export class Team {
  teamId?: number;
  name?: string;
  description?: string;
  scrumMaster?: number;
  members?: number[];
  projectId?: number;
  events?: Event[];
  tasks?: Task[];
  imageUrl?: string;
  imageName?: string;
}
