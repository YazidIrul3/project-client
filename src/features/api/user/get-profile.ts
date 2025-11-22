import { axiosInstance } from "@/lib/axios";
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
    queryFn: () => {
      if (token) {
        return getProfile(token);
      }
    },
  });
};

export const useGetProfile = (token: string = "") => {
  return useQuery({
    ...getProfileQueryOptions(token),
  });
};
