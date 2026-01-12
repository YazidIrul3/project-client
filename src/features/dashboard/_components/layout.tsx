import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { useLoading } from "@/hooks/use-loading";
import { Spinner } from "@/components/ui/spinner";
import { useCurrentWorkspace } from "../_hooks/use-current-workspace";
import { useEffect } from "react";
import {
  createWorkspace,
  useCreateWorkspace,
} from "@/features/api/workspace/create-workspace";
import { authClient } from "@/libs/auth-client";
import { useRouter } from "next/navigation";
import { useAuthenticated } from "@/hooks/use-authenticated";

const DashbaordLayout = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, setIsLoading } = useLoading();
  const { isAuthenticated } = useAuthenticated();
  // const { data, isPending } = authClient.useSession();
  // const router = useRouter();
  // const { workspace: currentWorkspace, setCurrentWorkspace } =
  //   useCurrentWorkspace();

  // const { mutate: createWorkspaceMutation, isPending: createWorkspaceLoading } =
  //   useCreateWorkspace({
  //     token: data?.session.token,
  //   });
  // useEffect(() => {
  //   if (isPending) {
  //     setIsLoading(true);
  //   }

  //   if (!data?.session?.token) {
  //     router.push("/login");
  //     setIsLoading(false);
  //     return;
  //   }

  //   if (currentWorkspace?.name) return;

  //   setIsLoading(true);

  //   createWorkspaceMutation(
  //     {
  //       avatar: "",
  //       name: `${data.user.name}`,
  //       timezone: "Asia/Jakarta",
  //       userId: data.user.id,
  //       workspaceTypeName: "personal",
  //     },
  //     {
  //       onSettled: () => {
  //         setIsLoading(false);

  //         setCurrentWorkspace({
  //           name: `${data.user.name}`,
  //           userId: data.user.id,
  //         });
  //       },
  //     }
  //   );
  // }, [data?.session?.token]);

  return (
    <>
      {isLoading || !isAuthenticated ? (
        <Spinner />
      ) : (
        <SidebarProvider
          defaultOpen={true}
          style={
            {
              "--sidebar-width": "18rem",
              "--sidebar-width-icon": "4.5rem",
            } as React.CSSProperties
          }
          className=" flex flex-row items-center"
        >
          <AppSidebar />

          <main className=" w-full min-h-screen overflow-x-hidden ">
            <div className=" md:hidden flex flex-col gap-4 px-2">
              <SidebarTrigger />
            </div>

            {children}
          </main>
        </SidebarProvider>
      )}
    </>
  );
};

export default DashbaordLayout;
