"use client";

import DashbaordLayout from "../../_components/layout";
import { ChatChannelSection } from "../_components/channel-section";
import { useParams } from "next/navigation";

const ChatChannelPage = () => {
  const p = useParams();

  return (
    <DashbaordLayout>
      <ChatChannelSection channelId={p?.id as string} />
    </DashbaordLayout>
  );
};

export default ChatChannelPage;
