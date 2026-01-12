"use client";

import { Hash, Pin, UserRound, UsersRoundIcon } from "lucide-react";
import { ChatCard } from "./chat-card";

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

export const ChatChannelContent = () => {
  return (
    <div className=" flex flex-col-reverse lg:h-10/12 h-[80%] overflow-y-hidden hover:overflow-y-scroll">
      <div className=" flex flex-col-reverse">
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />

        <div className=" flex flex-row items-center justify-center">
          <div className=" h-[0.5px] bg-slate-500 opacity-30 w-full"></div>
          <h1 className=" font-semibold text-sm  flex flex-nowrap text-nowrap">
            22 Desember 2025
          </h1>
          <div className=" h-[0.5px] bg-slate-500 opacity-30 w-full"></div>
        </div>
      </div>

      <div className=" flex flex-col gap-2 p-7">
        <div className=" w-[60px] h-[60px] bg-slate-200 bg-opacity-40 flex justify-center items-center rounded-full">
          <h1 className=" font-bold text-4xl">#</h1>
        </div>

        <div>
          <h1 className=" text-2xl font-bold ">{`Welcome to # ${"Kumpulan Mod"}`}</h1>
          <p>This is the start of the #kumpulan-mod channel.</p>
        </div>
      </div>
    </div>
  );
};

export const ChatChannelFooter = () => {
  return (
    <div className="  bg-slate-50  min-w-full w-full h-fit p-2">
      <div className=" p-2">
        <input
          placeholder="Message here"
          className=" min-w-full focus:outline-none"
        />
      </div>
    </div>
  );
};

export const ChatChannelSection = ({ channelId }: { channelId: string }) => {
  return (
    <section className="  h-svh">
      <ChatChannelHeader />

      <ChatChannelContent />

      <ChatChannelFooter />
    </section>
  );
};
