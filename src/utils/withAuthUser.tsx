"use client";

import { useCreateWorkspace } from "@/features/api/workspace/create-workspace";
import { useCurrentWorkspace } from "@/features/dashboard/_hooks/use-current-workspace";
import { useAuthenticated } from "@/hooks/use-authenticated";
import { useLoading } from "@/hooks/use-loading";
import { authClient } from "@/libs/auth-client";
import { useRouter } from "next/navigation";
import { ComponentType, useEffect, useRef } from "react";

const withAuthUser = (OriginalComponent: ComponentType) => {
  return function WithAuth(props: { redirectUrl?: string }) {
    const { redirectUrl = "/login", ...rest } = props;

    const { data, isPending, isRefetching } = authClient.useSession();
    const isSessionLoading = isPending || isRefetching;
    const { onLogin, token, setToken } = useAuthenticated();
    const { workspace: currentWorkspace, setCurrentWorkspace } =
      useCurrentWorkspace();
    const router = useRouter();
    const { setIsLoading } = useLoading();
    const { isAuthenticated, user: userData } = useAuthenticated();
    const { mutate: createWorkspace, isPending: isCreatingWorkspace } =
      useCreateWorkspace({
        token: data?.session?.token,
        mutationConfig: {
          onMutate() {
            // console.log("🔥 CREATE WORKSPACE MUTATE");
          },
        },
      });

    // 🔒 KUNCI: pastikan effect hanya jalan sekali
    const hasInitialized = useRef(false);

    const getAccessToken = async () => {
      try {
        setIsLoading(true);
        const { data: accessTokenData } = await authClient.getAccessToken({
          providerId: "google",
        });

        if (
          accessTokenData?.accessToken !== token ||
          token == "" ||
          token == undefined
        )
          setToken(accessTokenData?.accessToken as string);

        if (!accessTokenData?.accessToken) {
          router.replace("/login");
        }

        if (data?.session.token) {
          if (
            currentWorkspace.name == "" ||
            !currentWorkspace.name ||
            currentWorkspace.name == undefined ||
            currentWorkspace.userId != data?.session.userId
          )
            setCurrentWorkspace({
              name: `${data.user.name}'s Space`,
              userId: data.user.id,
            });
        }

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      if ((isCreatingWorkspace && isAuthenticated == undefined) || !userData)
        return setIsLoading(true);

      getAccessToken();

      if (hasInitialized.current) return;

      // ⛔ tunggu session selesai
      if (isSessionLoading) return;

      // ❌ tidak login
      if (!data?.session?.token) {
        hasInitialized.current = true;

        return;
      }

      const workspaceName = `${data.user.name}'s Space`;

      // ✅ workspace sudah ada
      if (
        currentWorkspace?.name == undefined ||
        currentWorkspace?.name == "" ||
        currentWorkspace?.name == null
      ) {
        setCurrentWorkspace({
          name: workspaceName,
          userId: data.user.id,
        });

        hasInitialized.current = true;

        return;
      }

      onLogin(
        {
          id: data?.user.id as string,
          email: data?.user.email as string,
          name: data?.user.name as string,
        },
        data?.session.expiresAt as Date,
      );

      if (token && data) {
        createWorkspace({
          avatar: "tes",
          name: workspaceName,
          timezone: "tes",
          userId: data.user.id,
          workspaceTypeName: "personal",
        });

        setIsLoading(false);

        hasInitialized.current = true;
      }

      setIsLoading(false);
    }, [isSessionLoading, currentWorkspace?.name, isAuthenticated, token]);

    return <OriginalComponent />;
  };
};

export default withAuthUser;
