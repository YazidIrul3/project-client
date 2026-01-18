import { Entity } from "./api";
import { ChatEntity } from "./chat";
import { UserEntity } from "./user";

export type ChatChannelMemberEntity = Entity<{
  id: string;
  member: UserEntity;
}>;

export type ChatChannelEntity = Entity<{
  id: string;
  name: string;
  description: string;
  type: string;
  workspaceId: string;
  chatChannelMember: ChatChannelMemberEntity[];
  chat: ChatEntity[];
}>;
