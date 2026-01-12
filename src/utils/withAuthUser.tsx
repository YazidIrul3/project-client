"use client";

import { Spinner } from "@/components/ui/spinner";
import { useCreateWorkspace } from "@/features/api/workspace/create-workspace";
import { useCurrentWorkspace } from "@/features/dashboard/_hooks/use-current-workspace";
import { useAuthenticated } from "@/hooks/use-authenticated";
import { authClient } from "@/libs/auth-client";
import { useRouter } from "next/navigation";
import { ComponentType, useEffect, useRef } from "react";

const withAuthUser = (OriginalComponent: ComponentType) => {
  return function WithAuth(props: { redirectUrl?: string }) {
    const { redirectUrl = "/login", ...rest } = props;

    const { data, isPending, isRefetching } = authClient.useSession();
    const isSessionLoading = isPending || isRefetching;
    const { onLogin } = useAuthenticated();
    const { workspace, setCurrentWorkspace } = useCurrentWorkspace();
    const router = useRouter();

    const { mutate: createWorkspace, isPending: isCreatingWorkspace } =
      useCreateWorkspace({
        token: data?.session?.token,
      });

    // 🔒 KUNCI: pastikan effect hanya jalan sekali
    const hasInitialized = useRef(false);

    useEffect(() => {
      if (hasInitialized.current) return;

      // ⛔ tunggu session selesai
      if (isSessionLoading) return;

      // ❌ tidak login
      if (!data?.session?.token) {
        hasInitialized.current = true;
        router.replace(redirectUrl);
        return;
      }

      // ✅ workspace sudah ada
      if (
        workspace?.name == undefined ||
        workspace?.name === "" ||
        workspace?.name === null
      ) {
        hasInitialized.current = true;
        return;
      }

      const workspaceName = `${data.user.name}'s Space`;

      onLogin(
        data?.session.token as string,
        {
          id: data?.user.id as string,
          email: data?.user.email as string,
          name: data?.user.name as string,
        },
        data?.session.expiresAt as Date
      );

      createWorkspace({
        avatar: "tes",
        name: workspaceName,
        timezone: "tes",
        userId: data.user.id,
        workspaceTypeName: "personal",
      });

      setCurrentWorkspace({
        name: workspaceName,
        userId: data.user.id,
      });

      hasInitialized.current = true;
    }, [isSessionLoading, data?.session?.token, workspace?.name, redirectUrl]);

    // if (isSessionLoading || isCreatingWorkspace) {
    //   return <Spinner />;
    // }

    return <OriginalComponent {...rest} />;
  };
};

export default withAuthUser;
