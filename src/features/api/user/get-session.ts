import { useAuthenticated } from "@/hooks/use-authenticated";
import { axiosInstance } from "@/libs/axios";
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
  const { isAuthenticated } = useAuthenticated();

  return useQuery({
    enabled: isAuthenticated,
    ...getLoginQueryOptions(),
  });
};
