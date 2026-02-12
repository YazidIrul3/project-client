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
import {
  createWorkspace,
  useCreateWorkspace,
} from "@/features/api/workspace/create-workspace";
import {
  CreateWorkspaceSchema,
  createWorkspaceSchema,
} from "@/features/schema/workspace";
import { authClient } from "@/libs/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, LockKeyhole, Plus, SettingsIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
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
import {
  updatChatChannelSchema,
  UpdatChatChannelSchema,
  useUpdatChatChannel,
} from "@/features/api/chatChannel/update-chatChannel";
import {
  ChatChannelEntity,
  ChatChannelMemberEntity,
} from "@/types/api/chat-channel";
import { useAuthenticated } from "@/hooks/use-authenticated";

const UpdateChatChanneleSheet = ({
  data: chatChannelData,
}: {
  data: ChatChannelEntity;
}) => {
  const { data } = authClient.useSession();
  const [checked, setChecked] = useState<boolean>(false);
  const { token, user } = useAuthenticated();

  const { mutate: updateChatChannelMutation } = useUpdatChatChannel({
    id: chatChannelData.id,
    token: token,
    mutationConfig: {
      onSuccess: () => {
        toast.success("Chat channel updated successfully");

        window.location.reload();
      },
    },
  });

  const form = useForm<UpdatChatChannelSchema>({
    resolver: zodResolver(updatChatChannelSchema),
    mode: "onChange",
    defaultValues: {
      name: chatChannelData.name,
      description: chatChannelData.description,
      type: checked ? "private" : "general",
      chatChannelMembers: chatChannelData.chatChannelMember?.map((item) => {
        return {
          memberId: item.member.id,
        };
      }),
    },
  });
  const { control, getValues } = form;
  const { open, openSheet, setOpen, closeSheet } = useSheet();

  const handleOnSubmit = () => {
    updateChatChannelMutation({
      name: getValues("name"),
      description: getValues("description"),
      type: checked ? "private" : "general",
      chatChannelMembers: getValues("chatChannelMembers"),
    });
  };

  if (chatChannelData.type == "private") {
    setChecked(true);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className=" w-fit font-normal text-sm px-2 py-2">
        <div className=" w-fit">
          <SettingsIcon size={18} className=" w-fit h-fit" />
        </div>
      </SheetTrigger>
      <div className="min-w-full mx-auto h-full p-2">
        <SheetContent className=" flex flex-row justify-between h-fit   rounded-xl translate-x-[-50%] translate-y-[-50%] left-1/2 top-1/2">
          <Form {...form}>
            <div className=" flex flex-col w-full ">
              <SheetHeader className=" mb-3">
                <SheetTitle className=" text-xl font-bold">
                  Update New Chat Channel
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
                          value={getValues("name")}
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
                      onClick={(prev) => setChecked(!checked)}
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
                  Save
                </Button>
              </SheetFooter>
            </div>
          </Form>
        </SheetContent>
      </div>
    </Sheet>
  );
};

export default UpdateChatChanneleSheet;
