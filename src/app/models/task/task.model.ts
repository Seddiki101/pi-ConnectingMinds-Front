import { Priority } from "../enums/priority";
import { Status } from "../enums/status";

export class Task {
  taskId?: number;
  name?: string;
  description?: string;
  status?: Status;
  priority?: Priority;
  createdAt?: Date;
  deadLine?: Date;
  memberId?: number;
  teamId?: number;
}
