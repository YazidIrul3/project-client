import { Entity } from "./api";

export type UserEntity = Entity<{
  email: string;
  emailVerified: boolean;
  google_id: string | null;
  image: string;
  name: string;
  number_phone: string;
  subscriptionId: string;
  timezone: string;
}>;
