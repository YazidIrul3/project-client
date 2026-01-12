import { useAuthenticated } from "@/hooks/use-authenticated";
import { axiosInstance } from "@/libs/axios";
import { QueryConfig } from "@/libs/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getWorkspace = async (id: string, token: string) => {
  const response = await axiosInstance.get(`/workspace/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getWorkpacesQuery = (id: string) => ["workspace", id];

export const getWorkspaceQueryOptions = (id: string, token: string) => {
  return queryOptions({
    queryKey: getWorkpacesQuery(id),
    queryFn: () => getWorkspace(id, token),
  });
};

type useGetWorkspace = {
  token: string;
  queryConfig?: QueryConfig<typeof getWorkspaceQueryOptions>;
  id: string;
};

export const useGetWorkspace = (params: useGetWorkspace) => {
  const { isAuthenticated } = useAuthenticated();

  return useQuery({
    enabled: isAuthenticated,
    ...getWorkspaceQueryOptions(params.id, params.token),
    ...params.queryConfig,
  });
};
