import { axiosInstance } from "@/lib/axios";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getLogin = async () => {
  const response = await axiosInstance.get("/auth/get-session");

  return response;
};

export const getLoginQueryKey = () => ["login"];

const getLoginQueryOptions = () => {
  return queryOptions({
    queryKey: getLoginQueryKey(),
    queryFn: getLogin,
  });
};

export const useGetSession = () => {
  return useQuery({
    ...getLoginQueryOptions(),
  });
};
