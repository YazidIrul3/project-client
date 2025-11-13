"use client";

import { useGetProfile } from "../../../api/user/getProfile";
import DashbaordLayout from "../../_components/layout";

const ProfilePage = () => {
  const { data: profie, isLoading: fetchProfileLoading } = useGetProfile();

  console.log(profie);
  return (
    <DashbaordLayout>
      <div>tes</div>
    </DashbaordLayout>
  );
};

export default ProfilePage;
