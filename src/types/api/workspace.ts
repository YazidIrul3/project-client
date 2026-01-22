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

export type WorkspaceMemberEntity = Entity<{
  id: string;
  member: UserEntity;
  memberId: string;
  role: string;
}>;

export type WorkspaceTypeEntity = Entity<{
  name: string;
  description: string;
}>;

export type WorkspaceSidebarEntity = {
  name: string;
  avatar: string;
  id: string;
  timezone: string;
  workspaceMember: [];
  user: UserEntity;
  workspaceType: WorkspaceTypeEntity;
  workspaceMembers: WorkspaceMemberEntity[];
};
