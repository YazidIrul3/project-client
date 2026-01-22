import { useAuthenticated } from "@/hooks/use-authenticated";
import { axiosInstance } from "@/libs/axios";
import { QueryConfig } from "@/libs/react-query";
import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";

type GetWorkspacesByUser = {
  token: string;
  userId: string;
};

export const getWorkspacesByUser = async (props: GetWorkspacesByUser) => {
  const response = await axiosInstance.get(`/workspace/?user=${props.userId}`, {
    headers: {
      Authorization: `Bearer ${props.token}`,
    },
  });

  return response.data.data;
};

export const getWorkpacesQuery = () => ["workspace"];

export const getWorkspacesByUserQueryOptions = (props: GetWorkspacesByUser) => {
  return queryOptions({
    queryKey: getWorkpacesQuery(),
    queryFn: () =>
      getWorkspacesByUser({ token: props.token, userId: props.userId }),
  });
};

type useGetWorkspacesByUser = {
  token: string;
  userId: string;
  queryConfig?: QueryConfig<typeof getWorkspacesByUserQueryOptions>;
};

export const useGetWorkspacesByUser = (params: useGetWorkspacesByUser) => {
  const { isAuthenticated } = useAuthenticated();

  return useQuery({
    enabled: isAuthenticated,
    ...getWorkspacesByUserQueryOptions({
      token: params.token,
      userId: params.userId,
    }),
    ...params.queryConfig,
  });
};
