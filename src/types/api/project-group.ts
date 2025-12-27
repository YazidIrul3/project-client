import { Entity } from "./api";

export type ItemProjectGroupEntity = Entity<{
  id: string;
  title: string;
  color: string;
  projectId: string;
}>;

export type ProjectGroupBodyRequest = {
  name?: string;
  color?: string;
  projectId?: string;
};
