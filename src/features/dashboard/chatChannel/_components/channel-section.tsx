"use client";

import { Hash, Pin, UsersRoundIcon } from "lucide-react";
import { ChatCard } from "./chat-card";
import { useGetChatChannelById } from "@/features/api/chatChannel/get-chatChannel";
import { useAuthenticated } from "@/hooks/use-authenticated";
import {
  createChatSchema,
  CreateChatSchema,
  useCreateChat,
} from "@/features/api/chat/create-chat";
import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { toast } from "sonner";
import { useLoading } from "@/hooks/use-loading";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChatEntity } from "@/types/api/chat";
import { useGetChatByChatChannelId } from "@/features/api/chat/get-chat";

export const ChatChannelHeader = () => {
  return (
    <header className="  bg-slate-50 w-full flex flex-row items-center justify-between px-5 py-2 shadow-sm">
      <div className=" flex flex-row items-center gap-2">
        <div className=" text-gray-500">
          <Hash size={20} strokeWidth={"3px"} />
        </div>
        <h3 className=" font-semibold">Umum</h3>
      </div>

      <div className=" text-slate-900 flex flex-row items-center gap-4">
        <UsersRoundIcon size={20} strokeWidth={"3px"} />
        <Pin size={20} strokeWidth={"3px"} />
      </div>
    </header>
  );
};

export const ChatChannelContent = ({
  chatsData,
  channelName,
}: {
  chatsData: ChatEntity[];
  channelName: string;
}) => {
  const chatsDataGroupBy = Object.entries(
    (Array.isArray(chatsData) ? chatsData : []).reduce<
      Record<string, ChatEntity[]>
    >((acc, item) => {
      const date = item.createdAt.toString().split("T")[0];

      acc[date] = acc[date] || [];
      acc[date].push(item);
      return acc;
    }, {}),
  ).map(([date, chats]) => ({
    createdAt: date,
    chat: chats,
  }));

  return (
    <div className=" flex flex-col-reverse lg:h-10/12 h-[80%] overflow-y-hidden hover:overflow-y-scroll">
      {chatsDataGroupBy?.map((item, i: number) => {
        return (
          <div key={i} className=" flex flex-col-reverse">
            {item?.chat?.map((item: ChatEntity, i: number) => (
              <ChatCard key={i} data={item} />
            ))}

            <div className=" flex flex-row items-center justify-center">
              <div className=" h-[0.5px] bg-slate-500 opacity-30 w-full"></div>
              <h1 className=" font-semibold text-sm  flex flex-nowrap text-nowrap">
                {item?.createdAt}
              </h1>
              <div className=" h-[0.5px] bg-slate-500 opacity-30 w-full"></div>
            </div>
          </div>
        );
      })}

      <div className=" flex flex-col gap-2 p-7">
        <div className=" w-[60px] h-[60px] bg-slate-200 bg-opacity-40 flex justify-center items-center rounded-full">
          <h1 className=" font-bold text-4xl">#</h1>
        </div>

        <div>
          <h1 className=" text-2xl font-bold ">{`Welcome to # ${channelName}`}</h1>
          <p>This is the start of the #{channelName}.</p>
        </div>
      </div>
    </div>
  );
};

export const ChatChannelFooter = ({
  chatChannelId,
}: {
  chatChannelId: string;
}) => {
  const { token, user } = useAuthenticated();
  const { setIsLoading } = useLoading();
  const form = useForm<CreateChatSchema>({
    resolver: zodResolver(createChatSchema),
    defaultValues: {
      content: "",
    },
  });
  const { mutate: createChatMutation, isPending: isCreateChatLoading } =
    useCreateChat({
      token,
      mutationConfig: {
        onSuccess: () => toast.success("Created chat successfully"),
        // onError: (err) => [toast.error("Created chat Failed")],
      },
    });
  const { getValues, control } = form;

  const handleOnCreateChat = async () => {
    if (user.id) {
      createChatMutation({
        content: getValues("content"),
        chatChannelId: chatChannelId,
        type: "msg",
        senderId: user.id,
      });

      form.reset();
    }
  };

  useEffect(() => {
    if (isCreateChatLoading) setIsLoading(true);

    setIsLoading(false);
  }, [isCreateChatLoading]);

  return (
    <div className="  bg-slate-50  min-w-full w-full h-fit p-2">
      <div className=" p-2">
        <Form {...form}>
          <FormField
            control={control}
            name="content"
            render={({ field }) => (
              <FormControl>
                <FormItem>
                  <Input
                    {...field}
                    name="ocntent"
                    placeholder="Message here"
                    className=" min-w-full focus:outline-none"
                    onKeyDown={(e) => {
                      if (e.key == "Enter") {
                        e.preventDefault();

                        handleOnCreateChat();

                        // console.log("On enter chat");
                      }
                    }}
                  />
                </FormItem>
              </FormControl>
            )}
          />
        </Form>
      </div>
    </div>
  );
};

export const ChatChannelSection = ({ channelId }: { channelId: string }) => {
  const { setIsLoading } = useLoading();
  const { token } = useAuthenticated();
  const { data: chatChannelByIdData, isLoading: chatChannelByIdIsLoading } =
    useGetChatChannelById({
      chatChannelId: channelId,
      token,
    });

  useEffect(() => {
    if (chatChannelByIdIsLoading) setIsLoading(true);

    setIsLoading(false);
  }, [chatChannelByIdIsLoading]);

  return (
    <section className="  h-svh">
      <ChatChannelHeader />

      <ChatChannelContent
        channelName={chatChannelByIdData?.data?.name}
        chatsData={chatChannelByIdData?.data?.chat}
      />

      <ChatChannelFooter chatChannelId={channelId} />
    </section>
  );
};
