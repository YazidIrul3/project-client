"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { authClient } from "@/libs/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyhole, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useSheet } from "@/hooks/use-sheet";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  createChatChannelSchema,
  CreateChatChannelSchema,
  useCreateChatChannel,
} from "@/features/api/chatChannel/create-chatChannel";
import { useCurrentWorkspace } from "@/features/dashboard/_hooks/use-current-workspace";
import { useGetWorkspaceSidebar } from "@/features/api/workspace/get-workspace-sidebar";

const CreateChatChanneleSheet = () => {
  const { data } = authClient.useSession();
  const { workspace: currentWorkspace } = useCurrentWorkspace();
  const [checked, setChecked] = useState<boolean>(false);
  const token = data?.session.token;

  const {
    data: workspaceByNameAndUserId,
    isLoading: workspaceSidebarDataLoading,
  } = useGetWorkspaceSidebar({
    token: token as string,
    userId: currentWorkspace.userId,
    workspaceName: currentWorkspace.name,
    queryConfig: {
      enabled: !!token && !!currentWorkspace.userId && !!currentWorkspace.name,
    },
  });
  const { mutate: createChatChannelMutation } = useCreateChatChannel({
    token: token as string,
    mutationConfig: {
      onSuccess: () => {
        toast.success("Chat Channel created successfully");

        window.location.reload();
      },
    },
  });

  const form = useForm<CreateChatChannelSchema>({
    resolver: zodResolver(createChatChannelSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      type: checked ? "private" : "general",
      workspaceId: workspaceByNameAndUserId?.id,
      chatChannelMembers: [
        {
          memberId: currentWorkspace?.userId,
        },
      ],
    },
  });
  const { control, getValues } = form;
  const { open, setOpen } = useSheet();

  const handleOnSubmit = () => {
    createChatChannelMutation({
      name: getValues("name"),
      description: getValues("description"),
      type: checked ? "private" : "general",
      workspaceId: workspaceByNameAndUserId?.workspace?.id,
      chatChannelMembers: getValues("chatChannelMembers"),
    });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className=" w-fit font-normal text-sm px-2 py-2">
        <div className=" w-fit">
          <Plus size={16} className=" w-fit h-fit" />
        </div>
      </SheetTrigger>
      <div className="min-w-full mx-auto h-full p-2">
        <SheetContent className=" flex flex-row justify-between h-fit   rounded-xl translate-x-[-50%] translate-y-[-50%] left-1/2 top-1/2">
          <Form {...form}>
            <div className=" flex flex-col w-full ">
              <SheetHeader className=" mb-3">
                <SheetTitle className=" text-xl font-bold">
                  Create New Chat Channel
                </SheetTitle>
              </SheetHeader>

              <div className=" px-3 flex flex-col gap-8">
                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" mb-2">Channel Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="new-channel"
                          name="name"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" mb-2">Description</FormLabel>
                      <FormControl className=" w-full">
                        <Textarea
                          {...field}
                          placeholder="Description"
                          name="description"
                          className=" w-full"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className=" flex flex-row items-center gap-2">
                  <div className=" flex flex-col gap-1">
                    <div className=" flex flex-row items-center gap-2">
                      <LockKeyhole size={18} strokeWidth={"3px"} />
                      <h1 className=" font-bold">Private Channel</h1>
                    </div>

                    <p className=" text-sm text-slate-700">
                      Only selected members and roles will be able to view this
                      channel
                    </p>
                  </div>

                  <div>
                    <Switch
                      checked={checked}
                      onClick={() => setChecked(!checked)}
                    />
                  </div>
                </div>
              </div>

              <SheetFooter className="flex justify-end flex-row">
                {/* <Button
              variant={"ghost"}
              className=" justify-start flex font-normal text-sm px-4 w-fit"
              >
              Cancel
              </Button> */}
                <Button
                  onClick={handleOnSubmit}
                  className=" justify-start flex font-normal text-sm px-4 w-fit"
                >
                  Create
                </Button>
              </SheetFooter>
            </div>
          </Form>
        </SheetContent>
      </div>
    </Sheet>
  );
};

export default CreateChatChanneleSheet;
