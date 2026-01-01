import { axiosInstance } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getItemProjectGroupByProjectGroupId = async (
  projectGroupId: string,
  token: string
) => {
  const response = await axiosInstance.get(
    `/itemProjectGroup/${projectGroupId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getItemProjectGroupByProjectGroupIdQuery = (
  projectGroupId: string
) => ["itemProjectGroup", projectGroupId];

export const getItemProjectGroupByProjectGroupIdQueryOptions = (
  projectGroupId: string,
  token: string
) => {
  return queryOptions({
    queryKey: getItemProjectGroupByProjectGroupIdQuery(projectGroupId),
    queryFn: () => getItemProjectGroupByProjectGroupId(projectGroupId, token),
  });
};

type useGetItemProjectGroupByProjectGroupId = {
  token: string;
  projectGroupId: string;
  queryConfig?: QueryConfig<
    typeof getItemProjectGroupByProjectGroupIdQueryOptions
  >;
};

export const useGetItemProjectGroupByProjectGroupId = (
  params: useGetItemProjectGroupByProjectGroupId
) => {
  return useQuery({
    ...getItemProjectGroupByProjectGroupIdQueryOptions(
      params.projectGroupId,
      params.token
    ),
    ...params.queryConfig,
  });
};
