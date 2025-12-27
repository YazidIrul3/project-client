import { Entity } from "./api";

export type ItemProjectGroupModelEntity = Entity<{
  id: string;
  title: string;
  description: string;
  projectGroupId: string;
  startDate: Date;
  endDate: Date;
  startTime: Date;
  endTime: Date;
  priority: string;
  assignedUsers: [];
}>;

export type ItemProjectGroupBodyRequest = {
  title: string;
  description: string;
  projectGroupId: string;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  priority: string;
  assignedUsers: [
    {
      id: string;
      email: string;
      name: string;
    }
  ];
};
