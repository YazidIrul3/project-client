"use client";

import * as React from "react";
import {
  Calendar,
  CheckCircle,
  ChevronRight,
  ChevronUp,
  Plus,
  Settings2Icon,
  SettingsIcon,
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
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { useGetWorkspacesByUser } from "@/features/api/workspace/get-user-workspaces";
import CreateWorkspaceSheet from "./sheets/create-workspace-sheet";
import { WorkspaceEntity } from "@/types/api/workspace";
import CreateProjectSheet from "./sheets/create-project-sheet";
import { useRouter } from "next/navigation";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { onClick } = useLogout();
  const { workspace, setCurrentWorkspace } = useCurrentWorkspace();
  const { data: session } = authClient.useSession();
  const { open } = useSidebar();
  const router = useRouter();
  const { data: workspaceSidebarData, isLoading: workspaceSidebarDataLoading } =
    useGetWorkspaceSidebar({
      token: session?.session.token as string,
      userId: workspace.userId,
      workspaceName: workspace.name,
      queryConfig: {
        enabled:
          !!session?.session.token && !!workspace.userId && !!workspace.name,
      },
    });
  const { data: workspaceByUser, isLoading: workspaceByUserLoading } =
    useGetWorkspacesByUser({
      token: session?.session.token!,
      userId: workspace.userId,
    });

  return (
    <div>
      {workspaceSidebarDataLoading || workspaceByUserLoading ? null : ( // <Spinner />
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
                        <div className=" bg-red-600 text-slate-50 font-bold text-lg p-3 uppercase flex justify-center items-center rounded-full">
                          {workspaceSidebarData?.user?.name[0]}
                        </div>

                        <div className=" flex flex-col">
                          <div className=" flex flex-row items-center gap-2 min-w-0">
                            <h1 className=" text-slate-900 text-sm truncate w-[140px] max-w-[140px]">
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
                  <div className=" px-3 py-3">
                    <DropdownMenuLabel className="text-xs mb-3">
                      <span className=" font-semibold">Workspaces</span>
                    </DropdownMenuLabel>

                    <div className=" flex flex-col ">
                      {workspaceByUser?.map(
                        (item: WorkspaceEntity, i: number) => {
                          return (
                            <Button
                              onClick={() => {
                                setCurrentWorkspace({
                                  name: item?.name,
                                  userId: item?.user?.id as string,
                                });

                                // router.refresh();
                                window.location.reload();
                              }}
                              variant={"ghost"}
                              key={i}
                              className={`${
                                item.name == workspace.name
                                  ? "bg-slate-100"
                                  : "hover:bg-slate-100"
                              } flex flex-row gap-2  py-2 `}
                            >
                              <div className="flex flex-row gap-2 items-center">
                                <div className=" uppercase  bg-red-600 text-slate-50 text-xs font-bold  px-2 py-1  flex justify-center items-center rounded-md">
                                  {item?.name[0]}
                                </div>

                                <h1 className=" font-semibold text-start text-sm w-[200px] truncate">
                                  {item?.name}
                                </h1>
                              </div>

                              <SettingsIcon size={18} color="#C4C4C4" />
                            </Button>
                          );
                        }
                      )}
                    </div>
                  </div>

                  <div className=" h-1 bg-slate-100 mb-1.5"></div>

                  <Link
                    href={"/account/workspace"}
                    className=" min-w-full justify-start flex font-normal text-sm px-2 items-center gap-3"
                  >
                    <SettingsIcon size={20} />
                    Workspace Setting
                  </Link>

                  <div className=" h-1 bg-slate-100 my-1.5"></div>

                  <CreateWorkspaceSheet />
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
              <div className={`${open ? "flex" : "hidden"} `}>
                <h3 className={` text-sm font-semibold`}>Project</h3>
              </div>

              {workspaceSidebarData?.projects?.length > 0
                ? workspaceSidebarData?.projects?.map(
                    (item: WorkspaceEntity) => {
                      return (
                        <Link
                          href={item?.id}
                          className=" bg-slate-100 p-2 text-sm font-semibold rounded-xl truncate whitespace-nowrap line-clamp-1"
                        >
                          {item?.name}
                        </Link>
                      );
                    }
                  )
                : null}

              <CreateProjectSheet />
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
                      <Link href={"/account/profile"}>Account</Link>
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
      )}
    </div>
  );
}
