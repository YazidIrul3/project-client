import { Entity } from "./api";

export type ProjectGroupEntity = Entity<{
  id: string;
  name: string;
  color: string;
  projectId: string;
}>;

export type ProjectGroupBodyRequest = {
  name?: string;
  color?: string;
  projectId?: string;
};
