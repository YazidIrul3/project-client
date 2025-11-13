import * as React from "react";
import {
  Calendar,
  CheckCircle,
  ChevronRight,
  ChevronUp,
  Plus,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { VersionSwitcher } from "./version-switcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ItemSidebar from "./item-sidebar";
import { Button } from "@/components/ui/button";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="py-3 flex flex-col gap-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <div className=" flex flex-row items-center gap-3 justify-center py-2">
                    <div className=" bg-red-600 text-slate-50 font-bold text-lg rounded-full p-3">
                      Y
                    </div>
                    <div className=" flex flex-col ">
                      <div className=" flex flex-row items-center gap-2">
                        <h1 className=" text-slate-900 text-sm truncate">
                          Yazid Khaiurl's Space
                        </h1>

                        <h1 className=" bg-slate-800 text-slate-50 text-xs font-semibold rounded-full px-2 py-0.5">
                          Free
                        </h1>
                      </div>
                      <p className=" text-xs">Personal</p>
                    </div>
                  </div>
                  <ChevronUp className="ml-auto" />
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

        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className=" min-h-full bg-slate-900 text-slate-50 hover:bg-slate-800 hover:text-slate-50 ">
                  <div className=" flex flex-row items-center gap-3">
                    <Plus />
                    <h1>Create New</h1>
                  </div>
                  <ChevronRight className="ml-auto text-xl" />
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
      <SidebarContent className="gap-0">
        <SidebarGroup>
          <div className="flex flex-col gap-4">
            <ItemSidebar icon={<CheckCircle size={"1.2em"} />} name="todo" />
            <ItemSidebar icon={<Calendar size={"1.2em"} />} name="calender" />
            <ItemSidebar icon={<Calendar size={"1.2em"} />} name="diagram" />
          </div>
        </SidebarGroup>

        <SidebarGroup className=" flex flex-col gap-4">
          <Button className=" justify-start mt-4 " variant={"secondary"}>
            <Plus />
            Add Project
          </Button>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className=" min-h-full ">
                  <div className=" flex flex-row items-center gap-4 py-2">
                    <div className=" bg-red-600 text-slate-50 font-bold text-lg rounded-full p-3">
                      Y
                    </div>
                    <div className=" flex flex-col ">
                      <h1 className=" text-slate-900 text-sm font-bold">
                        Yazid Khairul
                      </h1>
                      <p className=" text-xs">yazidkhoirul@gmail.com</p>
                    </div>
                  </div>
                  <ChevronUp className="ml-auto" />
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
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
