import { axiosInstance } from "@/libs/axios";
import { MutationConfig, queryClient } from "@/libs/react-query";
import { useMutation } from "@tanstack/react-query";
import { getWorkspaceMemberQuery } from "./create-workspace-member";

type DeleteWorkspaceMember = {
  token: string;
  id: string;
};

export const deleteWorkspaceMember = async (props: DeleteWorkspaceMember) => {
  const reponse = await axiosInstance.delete(`/workspaceMember/${props.id}`, {
    headers: {
      Authorization: `Bearer ${props.token}`,
    },
  });

  return reponse.data;
};

type UseDeleteWorkspaceMemberParams = {
  token: string;
  id: string;
  mutationConfig?: MutationConfig<typeof deleteWorkspaceMember>;
};

export const useDeleteWorkspaceMember = (
  params: UseDeleteWorkspaceMemberParams,
) => {
  return useMutation({
    ...params.mutationConfig,

    mutationFn: () => {
      if (!params.token) return Promise.resolve(null);
      return deleteWorkspaceMember({
        id: params.id,
        token: params.token,
      });
    },

    onSuccess: (data, Variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: getWorkspaceMemberQuery() });

      params.mutationConfig?.onSuccess?.(
        data,
        Variables,
        onMutateResult,
        context,
      );
    },
  });
};
