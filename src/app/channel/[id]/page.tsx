import ChatChannelPage from "@/features/dashboard/chatChannel/pages/ChatChannelPage";

interface PageProps {
  params: {
    id: string;
  };
}

const Page = (params: PageProps) => {
  return <ChatChannelPage />;
};

export default Page;
