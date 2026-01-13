import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { authClient } from "@/libs/auth-client";
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
import { useEffect, useState } from "react";
import { useCurrentWorkspace } from "@/features/dashboard/_hooks/use-current-workspace";
import { Trash } from "lucide-react";
import { ChatChannelEntity } from "@/types/api/chat-channel";
import { useAuthenticated } from "@/hooks/use-authenticated";
import { useDeleteChatChannel } from "@/features/api/chatChannel/delete-chatChannel";
import { useLoading } from "@/hooks/use-loading";

const DeleteChatChannelSheet = ({
  chatChannelData,
}: {
  chatChannelData: ChatChannelEntity;
}) => {
  const { workspace: currentWorkspace, setCurrentWorkspace } =
    useCurrentWorkspace();
  const { setIsLoading } = useLoading();
  // const { data: session } = authClient.useSession();
  const { token, user } = useAuthenticated();
  const router = useRouter();
  const { mutate: deleteChatChannelMutation } = useDeleteChatChannel({
    token: token,
    id: chatChannelData?.id,
    mutationConfig: {
      onSuccess: () => {
        toast.success("Delete chat channel success");

        window.location.reload();
      },
    },
  });
  const form = useForm();
  const { control } = useForm();
  const [inputValue, setInputValue] = useState<string>("");

  const handleOnDelete = () => {
    if (token) {
      deleteChatChannelMutation({
        token: token,
        id: chatChannelData?.id,
      });
    }
  };

  return (
    <Sheet>
      <SheetTrigger
        asChild
        className=" min-w-fit justify-start flex font-normal text-sm  py-2"
      >
        <div className="  w-fit font-semibold rounded-full ">
          <Trash size={17} />
        </div>
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
                      <span className=" font-bold ">{`"${chatChannelData?.name}"`}</span>
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
              {chatChannelData?.name != inputValue ? (
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

export default DeleteChatChannelSheet;
