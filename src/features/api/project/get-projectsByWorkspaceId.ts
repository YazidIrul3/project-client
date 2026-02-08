import { useAuthenticated } from "@/hooks/use-authenticated";
import { axiosInstance } from "@/libs/axios";
import { QueryConfig } from "@/libs/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getProjectsByWorkspaceId = async (
  workspaceId: string,
  token: string,
) => {
  const response = await axiosInstance.get(
    `/project/workspace/${workspaceId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const getProjectsByWorkspaceIdQuery = (workspaceId: string) => [
  "projectsByWorkspace",
  workspaceId,
];

export const getProjectsByWorkspaceIdQueryOptions = (
  workspaceId: string,
  token: string,
) => {
  return queryOptions({
    queryKey: getProjectsByWorkspaceIdQuery(workspaceId),
    queryFn: () => getProjectsByWorkspaceId(workspaceId, token),
  });
};

type useGetProjectsByWorkspaceId = {
  token: string;
  workspaceId: string;
  queryConfig?: QueryConfig<typeof getProjectsByWorkspaceIdQueryOptions>;
};

export const useGetProjectsByWorkspaceId = (
  params: useGetProjectsByWorkspaceId,
) => {
  const { isAuthenticated } = useAuthenticated();

  return useQuery({
    enabled: isAuthenticated,
    ...getProjectsByWorkspaceIdQueryOptions(params.workspaceId, params.token),
    ...params.queryConfig,
  });
};
