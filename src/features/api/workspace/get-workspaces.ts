import { axiosInstance } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";

export const getWorkspaces = async (token: string) => {
  const response = await axiosInstance.get("/workspace/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getWorkpacesQuery = () => ["workspace"];

export const getWorkspacesQueryOptions = (token: string) => {
  return queryOptions({
    queryKey: getWorkpacesQuery(),
    queryFn: () => getWorkspaces(token),
  });
};

type useGetWorkspaces = {
  token: string;
  queryConfig?: QueryConfig<typeof getWorkspacesQueryOptions>;
};

export const useGetWorkspaces = (params: useGetWorkspaces) => {
  return useQuery({
    ...getWorkspacesQueryOptions(params.token),
    ...params.queryConfig,
  });
};
