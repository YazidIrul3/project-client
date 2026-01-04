import { Entity } from "./api";
import { ChatChannelEntity } from "./chat-channel";
import { UserEntity } from "./user";

export type ChatEntity = Entity<{
  id: string;
  content: string;
  type: string;
  chatChannel: ChatChannelEntity;
  user: UserEntity;
}>;
