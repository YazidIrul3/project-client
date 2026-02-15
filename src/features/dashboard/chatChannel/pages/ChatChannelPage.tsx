"use client";

import DashboardLayout from "../../_components/layout";
import { ChatChannelSection } from "../_components/channel-section";
import { useParams } from "next/navigation";

const ChatChannelPage = () => {
  const p = useParams();
  return (
    <DashboardLayout>
      <ChatChannelSection channelId={p?.id as string} />
    </DashboardLayout>
  );
};

export default ChatChannelPage;
