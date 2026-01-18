import { useAuthenticated } from "@/hooks/use-authenticated";
import { axiosInstance } from "@/libs/axios";
import { QueryConfig } from "@/libs/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getChatChannelById = async (
  chatChannelId: string,
  token: string,
) => {
  const response = await axiosInstance.get(`/chat-channel/${chatChannelId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getChatChannelByIdQuery = (chatChannelId: string) => [
  "chatChannel",
  chatChannelId,
];

export const getChatChannelByIdQueryOptions = (
  chatChannelId: string,
  token: string,
) => {
  return queryOptions({
    queryKey: getChatChannelByIdQuery(chatChannelId),
    queryFn: () => getChatChannelById(chatChannelId, token),
  });
};

type useGetChatChannelById = {
  token: string;
  chatChannelId: string;
  queryConfig?: QueryConfig<typeof getChatChannelByIdQueryOptions>;
};

export const useGetChatChannelById = (params: useGetChatChannelById) => {
  const { isAuthenticated } = useAuthenticated();

  return useQuery({
    enabled: isAuthenticated,
    ...getChatChannelByIdQueryOptions(params.chatChannelId, params.token),
    ...params.queryConfig,
  });
};
