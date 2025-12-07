import { Spinner } from "@/components/ui/spinner";
import { useCreateWorkspace } from "@/features/api/workspace/create-workspace";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { ComponentType, useEffect } from "react";

type WithAuthOptions = {
  redirectUrl?: string;
};

const withAuthUser = (OriginalComponent: ComponentType) => {
  return (props: WithAuthOptions = {}) => {
    const { redirectUrl, ...restProps } = props;
    const { data, isRefetching, isPending } = authClient.useSession();
    const router = useRouter();
    const {
      mutate: createWorkspaceMutation,
      isPending: createWorkspaceLoading,
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

        router.push(redirectUrl || "");
      } else {
        router.push("/login");
      }
    }, [isPending && isRefetching && data?.session.token]);

    if (isPending || createWorkspaceLoading || isRefetching) {
      return <Spinner />;
    }

    return <OriginalComponent {...restProps} />;
  };
};

export default withAuthUser;
