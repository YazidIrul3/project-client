import { useAuthenticated } from "@/hooks/use-authenticated";
import { axiosInstance } from "@/libs/axios";
import { QueryConfig } from "@/libs/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getWorkspacesByUserId = async (userId: string, token: string) => {
  const response = await axiosInstance.get(`/workspace/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getWorkpacesQuery = (userId: string) => ["workspaces", userId];

export const getWorkspacesByUserIdQueryOptions = (
  userId: string,
  token: string,
) => {
  return queryOptions({
    queryKey: getWorkpacesQuery(userId),
    queryFn: () => getWorkspacesByUserId(userId, token),
  });
};

type useGetWorkspacesByUserId = {
  token: string;
  queryConfig?: QueryConfig<typeof getWorkspacesByUserIdQueryOptions>;
  userId: string;
};

export const useGetWorkspacesByUserId = (params: useGetWorkspacesByUserId) => {
  const { isAuthenticated } = useAuthenticated();

  return useQuery({
    enabled: isAuthenticated,
    ...getWorkspacesByUserIdQueryOptions(params.userId, params.token),
    ...params.queryConfig,
  });
};
