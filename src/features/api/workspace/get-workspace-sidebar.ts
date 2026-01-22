import { useAuthenticated } from "@/hooks/use-authenticated";
import { axiosInstance } from "@/libs/axios";
import { QueryConfig } from "@/libs/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

type GetWorkspaceSidebarProps = {
  userId: string;
  workspaceName: string;
  token: string;
};

export const getWorkspaceSidebar = async (props: GetWorkspaceSidebarProps) => {
  const response = await axiosInstance.get(
    `/workspace?user=${props.userId}&name=${props.workspaceName}`,
    {
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    }
  );

  return response.data.data;
};

export const getWorkspaceSidebarQuery = (userId: string) => [
  "workspace",
  userId,
];

export const getWorkspaceSidebarQueryOptions = (
  props: GetWorkspaceSidebarProps
) => {
  return queryOptions({
    queryKey: getWorkspaceSidebarQuery(props.userId),
    queryFn: () =>
      getWorkspaceSidebar({
        token: props.token,
        userId: props.userId,
        workspaceName: props.workspaceName,
      }),
  });
};

type useGetWorkspace = {
  token: string;
  userId: string;
  workspaceName: string;
  queryConfig?: QueryConfig<typeof getWorkspaceSidebarQueryOptions>;
};

export const useGetWorkspaceSidebar = (params: useGetWorkspace) => {
  const { isAuthenticated } = useAuthenticated();

  return useQuery({
    enabled: isAuthenticated,
    ...getWorkspaceSidebarQueryOptions({
      token: params.token,
      userId: params.userId,
      workspaceName: params.workspaceName,
    }),
    ...params.queryConfig,
  });
};
