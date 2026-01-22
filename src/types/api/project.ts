import { Entity } from "./api";
import { ProjectGroupEntity } from "./project-group";

export type ProjectEntity = Entity<{
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  startTime: Date;
  endTime: Date;
  priority: string;
  projectGroups: ProjectGroupEntity[];
}>;

export type ProjectBodyRequest = {
  name: string;
  template: string;
};
