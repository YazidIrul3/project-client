import { DropdownMenuGroup } from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SidebarMenu, SidebarMenuButton } from "@/components/ui/sidebar";
import DashbaordLayout from "@/features/dashboard/_components/layout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { SelectContent } from "@radix-ui/react-select";
import { ChevronUp } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();

  return (
    <DashbaordLayout>
      <section className=" min-h-screen h-screen flex md:flex-row flex-col   w-full ">
        <aside className="md:min-w-[200px] lg:h-full flex flex-col gap-7 p-4  h-fit min-w-full border-r border-slate-200 ">
          <h1 className=" font-bold text-xl">Account</h1>

          <div className=" md:flex hidden w-full  flex-col gap-3 min-w-full">
            <Link
              className={`${
                path == "/profile" ? "bg-slate-200  rounded-full " : ""
              } font-semibold text-sm w-full min-w-full px-3 py-1.5`}
              href={"/account"}
            >
              Profile
            </Link>
            <Link
              className={`${
                path == "/billing" ? "bg-slate-200  rounded-full " : ""
              } font-semibold text-sm w-full min-w-full px-3 py-1.5`}
              href={"/billing"}
            >
              Billing
            </Link>
            <Link
              className={`${
                path == "/workspace" ? "bg-slate-200  rounded-full " : ""
              } font-semibold text-sm w-full min-w-full px-3 py-1.5`}
              href={"/workspace"}
            >
              Workspace
            </Link>
          </div>

          <SidebarMenu className=" md:hidden flex flex-col">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full mx-auto">
                  <div className=" flex flex-row items-center gap-3 justify-between w-full py-2">
                    <h1>Profile</h1>
                    <ChevronUp className="ml-auto" />
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="bottom"
                className=" w-full px-3 py-2 duration-200"
              >
                <DropdownMenuGroup className=" bg-slate-50 shadow p-1">
                  <DropdownMenuItem
                    className={`${
                      path == "/profile" ? "bg-slate-100" : "bg-slate-50"
                    } px-5 py-1.5  hover:bg-slate-100 outline-none rounded-lg text-sm`}
                  >
                    <Link href={"/profile"}>Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={`${
                      path == "/billing" ? "bg-slate-100" : "bg-slate-50"
                    } px-5 py-1.5  hover:bg-slate-100 outline-none rounded-lg text-sm`}
                  >
                    <Link href={"/billing"}>Billing</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={`${
                      path == "/workspace" ? "bg-slate-100" : "bg-slate-50"
                    } px-5 py-1.5  hover:bg-slate-100 outline-none rounded-lg text-sm`}
                  >
                    <Link href={"/workspace"}>Workspace</Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenu>
        </aside>

        <div className=" w-full md:w-10/12 p-6  mx-auto">{children}</div>
      </section>
    </DashbaordLayout>
  );
};

export default ProfileLayout;
