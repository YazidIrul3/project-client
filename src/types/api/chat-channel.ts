import { Entity } from "./api";

export type ChatChannelEntity = Entity<{
  id: string;
  name: string;
  description: string;
  type: string;
}>;
