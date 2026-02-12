import { axiosInstance } from "@/libs/axios";
import { MutationConfig, queryClient } from "@/libs/react-query";
import { useMutation } from "@tanstack/react-query";

type DeleteTask = {
  token: string;
  id: string;
};

export const deleteTask = async (props: DeleteTask) => {
  const reponse = await axiosInstance.delete(`/task/${props.id}`, {
    headers: {
      Authorization: `Bearer ${props.token}`,
    },
  });

  return reponse.data;
};

export const getTaskQuery = (id: string) => ["taks", id];

type UseDeleteTaskParams = {
  token: string;
  id: string;
  mutationConfig?: MutationConfig<typeof deleteTask>;
};

export const useDeleteTask = (params: UseDeleteTaskParams) => {
  return useMutation({
    ...params.mutationConfig,

    mutationFn: () => {
      if (!params.token) return Promise.resolve(null);
      return deleteTask({
        id: params.id,
        token: params.token,
      });
    },

    onSuccess: (data, Variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: getTaskQuery(params.id) });

      params.mutationConfig?.onSuccess?.(
        data,
        Variables,
        onMutateResult,
        context,
      );
    },
  });
};
