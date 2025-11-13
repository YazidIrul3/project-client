"use client";

import { Button } from "@/components/ui/button";
import Images from "@/utils/images";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import { GoogleLogoIcon } from "@phosphor-icons/react";
import React from "react";
import { useGetSession } from "../../api/user/get-session";
import { useLoginForm } from "../_hooks/useLoginForm";

export const LoginForm = () => {
  const { onSubmit } = useLoginForm();

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

      <Button onClick={onSubmit} variant={"outline"} className=" ">
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
