import { useAuthenticated } from "@/hooks/use-authenticated";
import { axiosInstance } from "@/libs/axios";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getProfile = async (token: string) => {
  const response = await axiosInstance.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response?.data;
};

export const getProfileQueryKey = () => ["profile"];

export const getProfileQueryOptions = (token: string) => {
  return queryOptions({
    queryKey: getProfileQueryKey(),
    enabled: token ? true : false,
    queryFn: () => {
      if (token) {
        return getProfile(token);
      }
    },
  });
};

export const useGetProfile = (token: string = "") => {
  const { isAuthenticated, token: userToken } = useAuthenticated();

  return useQuery({
    enabled: isAuthenticated && userToken == token ? true : false,
    ...getProfileQueryOptions(token),
  });
};
