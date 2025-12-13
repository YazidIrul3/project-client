import { Entity } from "./api";

export type ItemProjectGroupEntity = Entity<{
  id: string;
  name: string;
  color: string;
}>;

export type ProjectGroupBodyRequest = {
  name?: string;
  color?: string;
  projectId?: string;
};
