import { axiosInstance } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { getItemProjectGroupQuery } from "./create-itemProjectGroup";

type DeleteItemProjectGroup = {
  token: string;
  id: string;
};

export const deleteItemProjectGroup = async (props: DeleteItemProjectGroup) => {
  const reponse = await axiosInstance.delete(`/itemProjectGroup/${props.id}`, {
    headers: {
      Authorization: `Bearer ${props.token}`,
    },
  });

  return reponse.data;
};

type UseDeleteItemProjectGroupParams = {
  token: string;
  id: string;
  mutationConfig?: MutationConfig<typeof deleteItemProjectGroup>;
};

export const useDeleteItemProjectGroup = (
  params: UseDeleteItemProjectGroupParams
) => {
  return useMutation({
    ...params.mutationConfig,

    mutationFn: () => {
      if (!params.token) return Promise.resolve(null);
      return deleteItemProjectGroup({
        id: params.id,
        token: params.token,
      });
    },

    onSuccess: (data, Variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: getItemProjectGroupQuery() });

      params.mutationConfig?.onSuccess?.(
        data,
        Variables,
        onMutateResult,
        context
      );
    },
  });
};
