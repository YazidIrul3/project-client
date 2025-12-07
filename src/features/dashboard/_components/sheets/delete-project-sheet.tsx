import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCurrentWorkspace } from "../../_hooks/use-current-workspace";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useGetWorkspaceSidebar } from "@/features/api/workspace/get-workspace-sidebar";
import { useDeleteWorkspace } from "@/features/api/workspace/delete-workspace";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const DeleteProjectSheet = () => {
  const { workspace: currentWorkspace } = useCurrentWorkspace();
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const { data: workspace, isLoading: workspaceSidebarDataLoading } =
    useGetWorkspaceSidebar({
      token: session?.session.token as string,
      userId: currentWorkspace.userId,
      workspaceName: currentWorkspace.name,
    });
  const { setCurrentWorkspace } = useCurrentWorkspace();
  const { mutate: deleteWorkspaceMutation } = useDeleteWorkspace({
    token: session?.session.token!,
    id: workspace?.id,
    mutationConfig: {
      onSuccess: () => {
        toast.success("Delete workspace success");

        window.location.reload();
      },
    },
  });
  const form = useForm();

  const handleOnDelete = () => {
    if (session) {
      deleteWorkspaceMutation({
        token: session?.session.token as string,
        id: workspace?.id,
      });

      setCurrentWorkspace({
        userId: session?.user.id,
        name: `${session?.user.name}'s Space`,
      });

      //   router.refresh();
    }
  };

  return (
    <Sheet>
      <SheetTrigger
        asChild
        className=" min-w-fit justify-start flex font-normal text-sm px-2 py-2"
      >
        <Button className=" bg-red-600 w-fit font-semibold">Delete</Button>
      </SheetTrigger>
      <SheetContent className=" flex flex-row justify-center items-center max-w-[550px]  h-fit translate-x-[-50%] translate-y-[-50%] left-1/2 top-1/2 rounded-xl ">
        <Form {...form}>
          <div className="flex flex-col w-full">
            <SheetHeader>
              <SheetTitle className="text-red-600 font-bold">
                Delete Project
              </SheetTitle>
              <SheetDescription>
                Warning! If you delete project, all items in project will
                disapear
              </SheetDescription>
            </SheetHeader>

            <SheetFooter className=" flex flex-row justify-end">
              <Button
                className=" bg-red-600 w-fit font-semibold"
                onClick={handleOnDelete}
              >
                Delete
              </Button>
            </SheetFooter>
          </div>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default DeleteProjectSheet;
