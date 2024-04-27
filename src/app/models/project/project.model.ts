import { ProjectStatus } from "../enums/projectStatus";
import { Team } from "../team/team.model";

export class Project {
  projectId?: number;
  ownerId?: number;
  owner?: string;
  name?: string;
  scope?: string;
  projectStatus?: ProjectStatus;
  startDate?: Date;
  endDate?: Date;
  resources?: string;
  teams?: Team[];
  imageUrl?: string;
  imageName?: string;
}
