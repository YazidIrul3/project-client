"use client";

import withAuthUser from "@/utils/withAuthUser";
import { ProfileSection } from "../_components/profile-section";

const ProfilePage = () => {
  return <ProfileSection />;
};

export default withAuthUser(ProfilePage);
