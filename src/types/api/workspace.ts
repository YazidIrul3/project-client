import { Entity } from "./api";
import { ChatChannelEntity } from "./chat-channel";
import { ProjectEntity } from "./project";
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
  status: string;
  role: string;
  workspaceId: string;
}>;

export type WorkspaceTypeEntity = Entity<{
  name: string;
  description: string;
}>;

export type WorkspaceSidebarEntity = {
  id: string;
  member: UserEntity;
  workspace: {
    id: string;
    timezone: string;
    name: string;
    workspaceType: WorkspaceTypeEntity;
    chatChannel: ChatChannelEntity[];
    projects: ProjectEntity[];
  };
};

// export type WorkspaceSidebarEntity = {
//   name: string;
//   avatar: string;
//   id: string;
//   timezone: string;
//   workspaceMember: [];
//   user: UserEntity;
//   chatChannel: ChatChannelEntity[];
//   workspaceType: WorkspaceTypeEntity;
//   workspaceMembers: WorkspaceMemberEntity[];
// };
