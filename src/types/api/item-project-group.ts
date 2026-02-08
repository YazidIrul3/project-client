import { Entity } from "./api";

type AssignedUser = {
  assigned: {
    id: string;
    name: string;
    email: string;
  };
};

export type ItemProjectGroupEntity = Entity<{
  id: string;
  title: string;
  description: string;
  projectGroupId: string;
  startDate: Date;
  endDate: Date;
  startTime: Date;
  endTime: Date;
  priority: string;
  assignedUsers: AssignedUser[];
}>;

export type UpdateItemProjectGroupResponse = {
  id: string;
  title: string;
  description: string;
  projectGroupId: string;
  startDate: Date;
  endDate: Date;
  startTime: Date;
  endTime: Date;
  priority: string;
  assignedUsers: [
    assigned: {
      id: string;
      email: string;
      name: string;
    },
  ];
};

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
    },
  ];
};
