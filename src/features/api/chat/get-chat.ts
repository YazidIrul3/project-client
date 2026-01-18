import { useAuthenticated } from "@/hooks/use-authenticated";
import { axiosInstance } from "@/libs/axios";
import { QueryConfig } from "@/libs/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getChatByChatChannelId = async (
  chatChannelId: string,
  token: string,
) => {
  const response = await axiosInstance.get(`/chat/${chatChannelId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getChatByChatChannelIdQuery = (chatChannelId: string) => [
  "chat",
  chatChannelId,
];

export const getChatByChatChannelIdQueryOptions = (
  chatChannelId: string,
  token: string,
) => {
  return queryOptions({
    queryKey: getChatByChatChannelIdQuery(chatChannelId),
    queryFn: () => getChatByChatChannelId(chatChannelId, token),
  });
};

type useGetChatByChatChannelId = {
  token: string;
  chatChannelId: string;
  queryConfig?: QueryConfig<typeof getChatByChatChannelIdQueryOptions>;
};

export const useGetChatByChatChannelId = (
  params: useGetChatByChatChannelId,
) => {
  const { isAuthenticated } = useAuthenticated();

  return useQuery({
    enabled: isAuthenticated,
    ...getChatByChatChannelIdQueryOptions(params.chatChannelId, params.token),
    ...params.queryConfig,
  });
};
