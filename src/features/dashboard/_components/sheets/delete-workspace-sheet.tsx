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

const DeleteWorkspaceSheet = () => {
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

        router.replace("/account/profile");
      },
    },
  });
  const form = useForm();
  const { control } = useForm();
  const [inputValue, setInputValue] = useState<string>("");

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
        {workspace?.workspaceType?.name == "personal" ? (
          <Button className=" bg-red-600 w-fit font-semibold" disabled>
            Delete
          </Button>
        ) : (
          <Button className=" bg-red-600 w-fit font-semibold">Delete</Button>
        )}
      </SheetTrigger>
      <SheetContent className=" flex flex-row justify-center items-center max-w-[550px]  h-fit translate-x-[-50%] translate-y-[-50%] left-1/2 top-1/2 rounded-xl ">
        <Form {...form}>
          <div className="flex flex-col w-full">
            <SheetHeader>
              <SheetTitle className="text-red-600 font-bold">
                Delete Workspace
              </SheetTitle>
              <SheetDescription>
                Aksi ini tidak bisa dibatalkan. Ini akan menghapus space Tes dan
                semua data.
              </SheetDescription>
            </SheetHeader>

            <div className=" px-3 flex flex-col gap-8">
              <FormField
                control={control}
                name="workspaceTypeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" mb-2 text-wrap flex flex-wrap">
                      Type
                      <span className=" font-bold ">"{workspace.name}"</span>
                      to confirm
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Type your workspace name"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <SheetFooter className=" flex flex-row justify-end">
              {workspace?.name != inputValue ? (
                <Button className=" bg-red-600 w-fit font-semibold" disabled>
                  Delete
                </Button>
              ) : (
                <Button
                  className=" bg-red-600 w-fit font-semibold"
                  onClick={handleOnDelete}
                >
                  Delete
                </Button>
              )}{" "}
            </SheetFooter>
          </div>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default DeleteWorkspaceSheet;
