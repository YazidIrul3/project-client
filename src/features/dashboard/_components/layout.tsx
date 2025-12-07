import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";

const DashbaordLayout = ({ children }: { children: React.ReactNode }) => {
  return (
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
  );
};

export default DashbaordLayout;
