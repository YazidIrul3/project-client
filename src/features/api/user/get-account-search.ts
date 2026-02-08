import { useAuthenticated } from "@/hooks/use-authenticated";
import { axiosInstance } from "@/libs/axios";
import { QueryConfig } from "@/libs/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getAccountSearch = async (token: string, email: string) => {
  const response = await axiosInstance.get(`/auth/account/search/${email}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getAccountSearchQuery = (email: string) => ["accounts", email];

export const getAccountSearchQueryOptions = (email: string, token: string) => {
  return queryOptions({
    queryKey: getAccountSearchQuery(email),
    queryFn: () => getAccountSearch(token, email),
  });
};

type useGetAccountSearch = {
  token: string;
  email: string;
  queryConfig?: QueryConfig<typeof getAccountSearchQueryOptions>;
};

export const useGetAccountSearch = (params: useGetAccountSearch) => {
  const { isAuthenticated } = useAuthenticated();

  return useQuery({
    enabled: isAuthenticated,
    ...getAccountSearchQueryOptions(params.email, params.token),
    ...params.queryConfig,
  });
};
