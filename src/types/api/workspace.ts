import { Entity } from "./api";
import { UserEntity } from "./user";

export type WorkspaceEntity = Entity<{
  name: string;
  workstypeId: string;
  avatar: string;
  timezone: string;
  user?: UserEntity;
}>;

export type WorkspaceupdateEntity = {
  name?: string;
  workstypeId?: string;
  avatar?: string;
  timezone?: string;
};
