import { Spinner } from "@/components/ui/spinner";
import { useCreateWorkspace } from "@/features/api/workspace/create-workspace";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { ComponentType, useEffect } from "react";

const withAuthUser = (OriginalComponent: ComponentType) => {
  return () => {
    const { data, isRefetching, isPending } = authClient.useSession();
    const router = useRouter();
    const {
      mutate: createWorkspaceMutation,
      isPending: createWorkspaceLoading,
      isSuccess: createWorkspaceIsSuccess,
    } = useCreateWorkspace({
      token: data?.session.token,
    });

    useEffect(() => {
      if (data?.session.token) {
        createWorkspaceMutation({
          avatar: "tes",
          name: `${data?.user.name}'s Space`,
          timezone: "tes",
          userId: `${data?.user.id}`,
          workspaceTypeName: "personal",
        });

        router.push("/profile");
      } else {
        router.push("/login");
      }
    }, [data]);

    if (isPending || isPending == null || isRefetching) {
      return <Spinner />;
    }

    return <OriginalComponent />;
  };
};

export default withAuthUser;
