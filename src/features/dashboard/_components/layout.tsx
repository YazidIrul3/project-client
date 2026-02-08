import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { useLoading } from "@/hooks/use-loading";
import { Spinner } from "@/components/ui/spinner";
import { useCurrentWorkspace } from "../_hooks/use-current-workspace";
import { useAuthenticated } from "@/hooks/use-authenticated";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useLoading();
  const { isAuthenticated } = useAuthenticated();
  const { workspace: currentWorkspace } = useCurrentWorkspace();

  return (
    <>
      {isLoading || !isAuthenticated || currentWorkspace == undefined ? (
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

export default DashboardLayout;
