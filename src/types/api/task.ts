import { Entity } from "./api";
import { ProjectEntity } from "./project";

export type TaskEntity = Entity<{
  name: string;
  id: string;
  description: string;
  projectId?: string;
  workspaceId: string;
  startDate: Date;
  endDate: Date;
  status: string;
  priority: string;
  project: ProjectEntity;
}>;
