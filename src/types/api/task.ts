import { Entity } from "./api";
import { ProjectEntity } from "./project";

export type TaskCCEntity = {
  cc: {
    id: string;
    name: string;
    email: string;
  };
};

export type TaskPICEntity = {
  pic: {
    id: string;
    name: string;
    email: string;
  };
};

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
  taskCCs: TaskCCEntity[];
  taskPIC: TaskPICEntity[];
}>;
