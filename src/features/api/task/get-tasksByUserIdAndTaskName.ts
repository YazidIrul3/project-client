import { useAuthenticated } from "@/hooks/use-authenticated";
import { axiosInstance } from "@/libs/axios";
import { QueryConfig } from "@/libs/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getTasksByUserIdAndTaskName = async (
  token: string,
  userId: string,
  taskName: string,
) => {
  const response = await axiosInstance.get(
    `/task/${userId}/status/${taskName}`,
    {
      headers: {
        //   "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const getTasksByUserIdAndTaskNameQuery = (
  userId: string,
  taskName: string,
) => ["tasks", userId, taskName];

export const getTasksByUserIdAndTaskNameQueryOptions = (
  token: string,
  userId: string,
  taskName: string,
) => {
  return queryOptions({
    queryKey: getTasksByUserIdAndTaskNameQuery(userId, taskName),
    queryFn: () => getTasksByUserIdAndTaskName(token, userId, taskName),
  });
};

type GetTasksByUserIdAndTaskNameParams = {
  token: string;
  userId: string;
  taskName: string;
  queryConfig?: QueryConfig<typeof getTasksByUserIdAndTaskNameQueryOptions>;
};

export const useGetTasksByUserIdAndTaskName = (
  params: GetTasksByUserIdAndTaskNameParams,
) => {
  const { isAuthenticated } = useAuthenticated();

  return useQuery({
    enabled: isAuthenticated,
    ...getTasksByUserIdAndTaskNameQueryOptions(
      params.token,
      params.userId,
      params.taskName,
    ),

    ...params.queryConfig,
  });
};
