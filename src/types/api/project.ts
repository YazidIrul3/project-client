import { Entity } from "./api";

export type ItemProjectEntity = Entity<{
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  startTime: Date;
  endTime: Date;
  priority: string;
}>;

export type ProjectBodyRequest = {
  name: string;
  template: string;
};
