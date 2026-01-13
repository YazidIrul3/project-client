"use client";

import { Button } from "@/components/ui/button";
import Images from "@/helpers/images";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import { GoogleLogoIcon } from "@phosphor-icons/react";
import { useLoginForm } from "../_hooks/useLoginForm";
import { authClient } from "@/libs/auth-client";
import { useCurrentWorkspace } from "@/features/dashboard/_hooks/use-current-workspace";
import { useLoading } from "@/hooks/use-loading";
import { useCreateWorkspace } from "@/features/api/workspace/create-workspace";
import { useAuthenticated } from "@/hooks/use-authenticated";

export const LoginForm = () => {
  const { onSubmit } = useLoginForm();
  const { data: data } = authClient.useSession();
  const { setCurrentWorkspace } = useCurrentWorkspace();
  const { setIsLoading } = useLoading();
  const { mutate: createWorkspaceMutation, isPending: createWorkspaceLoading } =
    useCreateWorkspace({
      token: data?.session.token,
    });
  const { onLogin, isAuthenticated } = useAuthenticated();

  const handleOnSubmit = () => {
    setIsLoading(true);

    onSubmit();
  };

  console.log(isAuthenticated);

  return (
    <div className=" flex flex-col gap-7 justify-center items-center w-full max-w-sm">
      <div className=" flex flex-col gap-7 justify-center items-center">
        <div className=" w-fit">
          <Image
            src={Images.login.logo}
            width={100}
            height={59}
            alt="startup-logo"
          />
        </div>

        <div className=" flex flex-col justify-center items-center">
          <h3 className=" font-bold text-slate-900 text-lg">
            Welcome to our web
          </h3>
          <p>Sign in or create an account to continue</p>
        </div>
      </div>

      <Button onClick={handleOnSubmit} variant={"outline"} className=" ">
        <div className=" text-2xl">
          <GoogleLogoIcon weight="bold" />
        </div>
        <Label>Continue with Google</Label>
      </Button>

      <p className=" text-sm font-l text-center">
        By clicking continue, you agree to our Terms of Service and Privacy
        Policy.
      </p>
    </div>
  );
};
