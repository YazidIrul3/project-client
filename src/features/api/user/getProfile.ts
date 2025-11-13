

import { axiosInstance } from "@/lib/axios";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getProfile = async () => {
  const response = await axiosInstance.get("/auth/me");

  console.log(response?.data);
  return response?.data;
};

export const getProfileQueryKey = () => ["profile"];

export const getProfileQueryOptions = () => {
  return queryOptions({
    queryKey: getProfileQueryKey(),
    queryFn: getProfile,
  });
};

export const useGetProfile = () => {
  return useQuery({
    ...getProfileQueryOptions(),
  });
};
