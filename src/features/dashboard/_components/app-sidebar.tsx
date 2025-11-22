"use client";

import * as React from "react";
import {
  Calendar,
  CheckCircle,
  ChevronRight,
  ChevronUp,
  Plus,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ItemSidebar from "./item-sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLogout } from "@/hooks/useLogout";
import { useGetWorkspaceSidebar } from "@/features/api/workspace/get-workspace-sidebar";
import { authClient } from "@/lib/auth-client";
import { useCurrentWorkspace } from "../_hooks/use-current-workspace";
import { Spinner } from "@/components/ui/spinner";
import { Workspace } from "@/types/api";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { onClick } = useLogout();
  const { workspace } = useCurrentWorkspace();
  const { data: session } = authClient.useSession();
  const { open } = useSidebar();
  const { data: workspaceSidebarData, isLoading: workspaceSidebarDataLoading } =
    useGetWorkspaceSidebar({
      token: session?.session.token!,
      userId: workspace.userId,
      workspaceName: workspace.name,
    });

  return (
    <div>
      {workspaceSidebarDataLoading && <Spinner />}
      <Sidebar
        collapsible="icon"
        {...props}
        className=" flex flex-col justify-center items-center min-w-0 mx-auto"
      >
        <SidebarHeader className="py-3 flex flex-col gap-4  ">
          <SidebarMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full justify-center  mx-auto">
                  {open ? (
                    <div className=" flex flex-row items-center gap-3 justify-center py-2">
                      <div className=" bg-red-600 text-slate-50 font-bold text-lg p-3 flex justify-center items-center rounded-full">
                        {workspaceSidebarData?.user?.name[0]}
                      </div>

                      <div className=" flex flex-col">
                        <div className=" flex flex-row items-center gap-2 min-w-0">
                          <h1 className=" text-slate-900 text-sm truncate min-w-0 max-w-[140px]">
                            {workspaceSidebarData?.name}
                          </h1>

                          <h1 className=" bg-slate-800 text-slate-50 text-xs font-semibold rounded-full px-2 py-0.5 capitalize">
                            {workspaceSidebarData?.user?.subscription?.name}
                          </h1>
                        </div>
                        <p className=" text-xs">
                          {workspaceSidebarData?.workspaceType?.name}
                        </p>
                      </div>
                      <ChevronUp className="ml-auto" />
                    </div>
                  ) : (
                    // <div className=" bg-red-600  text-slate-50 font-bold text-lg w-[100px] h-[100px] flex justify-center items-center rounded-full">
                    // </div>
                    <div className="  bg-red-600 text-slate-50 font-bold text-lg p-3 flex justify-center items-center rounded-full">
                      {workspaceSidebarData?.user?.name[0]}
                    </div>
                  )}
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="right"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenu>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className=" flex flex-row justify-between items-center mx-auto min-h-full bg-slate-900 text-slate-50 hover:bg-slate-800 hover:text-slate-50 ">
                    <div className=" flex flex-row items-center gap-3">
                      <Plus />
                      <h1>Create New</h1>
                    </div>
                    {open && <ChevronRight className="ml-auto text-xl" />}
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="right"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        {/* sidebar content */}
        <SidebarContent className="gap-0 ">
          <SidebarGroup className="flex flex-col gap-3 mt-4 min-w-0">
            {" "}
            <div
              className={`flex flex-col gap-4 ${
                open ? "flex flex-col gap-4" : "items-center"
              }`}
            >
              <Link href={"/todo"}>
                <ItemSidebar
                  icon={<CheckCircle size={`${open ? "1.2em" : "1.6em"}`} />}
                  name="todo"
                />
              </Link>

              <Link href={"/calender"}>
                <ItemSidebar
                  icon={<Calendar size={`${open ? "1.2em" : "1.6em"}`} />}
                  name="calender"
                />
              </Link>

              <Link href={"/diagram"}>
                <ItemSidebar
                  icon={<Calendar size={`${open ? "1.2em" : "1.6em"}`} />}
                  name="diagram"
                />
              </Link>
            </div>
          </SidebarGroup>

          <SidebarGroup className=" flex flex-col gap-3 mt-4">
            <div>
              <h3 className=" text-sm font-semibold">Project</h3>
            </div>

            {workspaceSidebarData?.projects?.length > 0
              ? workspaceSidebarData?.projects?.map((item: Workspace) => {
                  return (
                    <Link
                      href={item?.id}
                      className=" bg-slate-100 p-2 text-sm font-semibold rounded-xl truncate whitespace-nowrap line-clamp-1"
                    >
                      {item?.name}
                    </Link>
                  );
                })
              : null}
            <Button
              className={`${
                !open ? "  mx-auto text-start" : "justify-start "
              } text-xs`}
              variant={"secondary"}
            >
              <Plus />
              {open && <h1> Add Project</h1>}
            </Button>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="w-full justify-center  mx-auto">
                    {open ? (
                      <div className=" flex flex-row items-center h-fit w-full gap-3 justify-between py-2">
                        <div className=" bg-red-600 text-slate-50 font-bold text-lg p-3 flex justify-center items-center rounded-full">
                          {workspaceSidebarData?.user?.name[0]}
                        </div>

                        <div className=" flex flex-col">
                          <div className=" flex flex-col justify-between w-full  ">
                            <h1 className=" text-slate-900 text-sm font-bold">
                              {workspaceSidebarData?.user?.name}
                            </h1>
                            <p className=" text-xs">
                              {workspaceSidebarData?.user?.email}
                            </p>
                          </div>
                        </div>
                        <ChevronUp className="ml-auto" />
                      </div>
                    ) : (
                      // <div className=" bg-red-600  text-slate-50 font-bold text-lg w-[100px] h-[100px] flex justify-center items-center rounded-full">
                      // </div>
                      <div className="  bg-red-600 text-slate-50 font-bold text-lg p-3 flex justify-center items-center rounded-full">
                        {workspaceSidebarData?.user?.name[0]}
                      </div>
                    )}
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="right"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onClick}>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>
    </div>
  );
}
