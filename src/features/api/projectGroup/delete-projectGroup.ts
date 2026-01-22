import { axiosInstance } from "@/libs/axios";
import { MutationConfig, queryClient } from "@/libs/react-query";
import { useMutation } from "@tanstack/react-query";
import { getProjectGroupQuery } from "./create-projectGroup";

type DeleteProjectGroup = {
  token: string;
  id: string;
};

export const deleteProjectGroup = async (props: DeleteProjectGroup) => {
  const reponse = await axiosInstance.delete(`/projectGroup/${props.id}`, {
    headers: {
      Authorization: `Bearer ${props.token}`,
    },
  });

  return reponse.data;
};

type UseDeleteProjectGroupParams = {
  token: string;
  id: string;
  mutationConfig?: MutationConfig<typeof deleteProjectGroup>;
};

export const useDeleteProjectGroup = (params: UseDeleteProjectGroupParams) => {
  return useMutation({
    ...params.mutationConfig,

    mutationFn: () => {
      if (!params.token) return Promise.resolve(null);
      return deleteProjectGroup({
        id: params.id,
        token: params.token,
      });
    },

    onSuccess: (data, Variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: getProjectGroupQuery() });

      params.mutationConfig?.onSuccess?.(
        data,
        Variables,
        onMutateResult,
        context
      );
    },
  });
};
