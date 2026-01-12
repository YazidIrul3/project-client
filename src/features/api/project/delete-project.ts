import { axiosInstance } from "@/libs/axios";
import { MutationConfig, queryClient } from "@/libs/react-query";
import { useMutation } from "@tanstack/react-query";
import { getProjectQuery } from "./create-project";

type DeleteProject = {
  token: string;
  id: string;
};

export const deleteProject = async (props: DeleteProject) => {
  const reponse = await axiosInstance.delete(`/project/${props.id}`, {
    headers: {
      Authorization: `Bearer ${props.token}`,
    },
  });

  return reponse.data;
};

type UseDeleteProjectParams = {
  token: string;
  id: string;
  mutationConfig?: MutationConfig<typeof deleteProject>;
};

export const useDeleteProject = (params: UseDeleteProjectParams) => {
  return useMutation({
    ...params.mutationConfig,

    mutationFn: () => {
      if (!params.token) return Promise.resolve(null);
      return deleteProject({
        id: params.id,
        token: params.token,
      });
    },

    onSuccess: (data, Variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: getProjectQuery() });

      params.mutationConfig?.onSuccess?.(
        data,
        Variables,
        onMutateResult,
        context
      );
    },
  });
};
