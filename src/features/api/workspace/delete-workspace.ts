import { axiosInstance } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { getWorkpacesQuery } from "./get-workspaces";
import { useMutation } from "@tanstack/react-query";
import { useCurrentWorkspace } from "@/features/dashboard/_hooks/use-current-workspace";

type DeleteWorkspace = {
  token: string;
  id: string;
};

export const deleteWorkspace = async (props: DeleteWorkspace) => {
  const reponse = await axiosInstance.delete(`/workspace/${props.id}`, {
    headers: {
      Authorization: `Bearer ${props.token}`,
    },
  });

  return reponse.data;
};

type UseDeleteWorkspaceParams = {
  token: string;
  id: string;
  mutationConfig?: MutationConfig<typeof deleteWorkspace>;
};

export const useDeleteWorkspace = (params: UseDeleteWorkspaceParams) => {
  return useMutation({
    ...params.mutationConfig,

    mutationFn: () => {
      if (!params.token) return Promise.resolve(null);
      return deleteWorkspace({
        id: params.id,
        token: params.token,
      });
    },

    onSuccess: (data, Variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: getWorkpacesQuery() });

      params.mutationConfig?.onSuccess?.(
        data,
        Variables,
        onMutateResult,
        context
      );
    },
  });
};
