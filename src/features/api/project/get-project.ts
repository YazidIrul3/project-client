import { axiosInstance } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getProject = async (id: string, token: string) => {
  const response = await axiosInstance.get(`/project/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getProjectQuery = (id: string) => ["project", id];

export const getProjectQueryOptions = (id: string, token: string) => {
  return queryOptions({
    queryKey: getProjectQuery(id),
    queryFn: () => getProject(id, token),
  });
};

type useGetProject = {
  token: string;
  queryConfig?: QueryConfig<typeof getProjectQueryOptions>;
  id: string;
};

export const useGetProject = (params: useGetProject) => {
  return useQuery({
    ...getProjectQueryOptions(params.id, params.token),
    ...params.queryConfig,
  });
};
