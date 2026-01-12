import { usePathname } from "next/navigation";
import UpdateChatChanneleSheet from "../chatChannel/_components/sheet/update-chat-chanel";
import { ChatChannelEntity } from "@/types/api/chat-channel";
import Link from "next/link";
import { Hash } from "lucide-react";

export const ChatChannelLink = ({
  data: item,
}: {
  data: ChatChannelEntity;
}) => {
  const pathname = usePathname();

  return (
    <Link
      key={item.id}
      href={`/channel/${item.id}`}
      className={`text-sm flex flex-row justify-between items-center gap-1 py-2 ${
        pathname == `/channel/${item.id}` ? " bg-slate-100" : ""
      }`}
    >
      <div className="flex flex-row items-center gap-1">
        <div className=" ">
          <Hash size={20} strokeWidth={"3px"} />
        </div>
        <h1 className=" text-sm font-semibold">{item.name}</h1>
      </div>

      <div className={`${pathname == `/channel/${item.id}` ? "" : "hidden"}`}>
        <div>
          <UpdateChatChanneleSheet data={item} />
        </div>
      </div>
    </Link>
  );
};
