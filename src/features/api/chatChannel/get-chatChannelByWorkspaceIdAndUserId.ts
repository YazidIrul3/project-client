import { useAuthenticated } from "@/hooks/use-authenticated";
import { axiosInstance } from "@/libs/axios";
import { QueryConfig } from "@/libs/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getChatChannelByWorkspaceIdAndUserId = async (
  workspaceId: string,
  userId: string,
  token: string,
) => {
  const response = await axiosInstance.get(
    `/chat-channel/workspace/${workspaceId}/user/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const getChatChannelByWorkspaceIdAndUserIdQuery = (
  workspaceId: string,
) => ["chatChannel", workspaceId];

export const getChatChannelByWorkspaceIdAndUserIdQueryOptions = (
  workspaceId: string,
  userId: string,
  token: string,
) => {
  return queryOptions({
    queryKey: getChatChannelByWorkspaceIdAndUserIdQuery(workspaceId),
    queryFn: () =>
      getChatChannelByWorkspaceIdAndUserId(workspaceId, userId, token),
  });
};

type useGetChatChannelByWorkspaceIdAndUserId = {
  token: string;
  workspaceId: string;
  userId: string;
  queryConfig?: QueryConfig<
    typeof getChatChannelByWorkspaceIdAndUserIdQueryOptions
  >;
};

export const useGetChatChannelByWorkspaceIdAndUserId = (
  params: useGetChatChannelByWorkspaceIdAndUserId,
) => {
  const { isAuthenticated } = useAuthenticated();

  return useQuery({
    enabled: isAuthenticated,
    ...getChatChannelByWorkspaceIdAndUserIdQueryOptions(
      params.workspaceId,
      params.userId,
      params.token,
    ),
    ...params.queryConfig,
  });
};
