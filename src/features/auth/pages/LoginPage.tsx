"use client";
import withAuthUser from "@/utils/withAuthUser";
import { LoginForm } from "../_components/LoginForm";
import { useCurrentWorkspace } from "@/features/dashboard/_hooks/use-current-workspace";

const LoginPage = () => {
  const { workspace } = useCurrentWorkspace();

  return (
    <div className=" min-h-screen min-w-full flex justify-center items-center">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
