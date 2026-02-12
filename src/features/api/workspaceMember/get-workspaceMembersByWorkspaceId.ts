import { useAuthenticated } from "@/hooks/use-authenticated";
import { axiosInstance } from "@/libs/axios";
import { QueryConfig } from "@/libs/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getWorkspaceMembersByWorkspaceId = async (
  token: string,
  workspaceId: string,
) => {
  const response = await axiosInstance.get(
    `/workspaceMember/workspace/${workspaceId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const getWorkpacesQuery = (workspaceId: string) => [
  "workspaceMembers",
  workspaceId,
];

export const getWorkspaceMembersByWorkspaceIdQueryOptions = (
  token: string,
  workspaceId: string,
) => {
  return queryOptions({
    queryKey: getWorkpacesQuery(workspaceId),
    queryFn: () => getWorkspaceMembersByWorkspaceId(token, workspaceId),
  });
};

type useGetWorkspaceMembersByWorkspaceId = {
  token: string;
  workspaceId: string;
  queryConfig?: QueryConfig<
    typeof getWorkspaceMembersByWorkspaceIdQueryOptions
  >;
};

export const useGetWorkspaceMembersByWorkspaceId = (
  params: useGetWorkspaceMembersByWorkspaceId,
) => {
  const { isAuthenticated } = useAuthenticated();

  return useQuery({
    enabled: isAuthenticated,
    ...getWorkspaceMembersByWorkspaceIdQueryOptions(
      params.token,
      params.workspaceId,
    ),
    ...params.queryConfig,
  });
};
