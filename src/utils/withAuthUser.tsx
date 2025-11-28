import { Spinner } from "@/components/ui/spinner";
import { useCreateWorkspace } from "@/features/api/workspace/create-workspace";
import { authClient } from "@/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";
import { ComponentType, useEffect } from "react";

type WithAuthOptions = {
  redirectUrl?: string;
};

const withAuthUser = (OriginalComponent: ComponentType) => {
  return (props: WithAuthOptions = {}) => {
    const { redirectUrl, ...restProps } = props;
    const { data, isRefetching, isPending } = authClient.useSession();
    const router = useRouter();
    const path = usePathname();
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

        router.push(redirectUrl || "/account/profile");
      } else {
        if (path != "/login") router.push("/login");
      }
    }, [data?.session.token]);

    if (isPending || createWorkspaceLoading || isRefetching) {
      return <Spinner />;
    }

    return <OriginalComponent {...restProps} />;
  };
};

export default withAuthUser;
