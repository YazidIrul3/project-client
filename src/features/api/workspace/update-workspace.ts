import { axiosInstance } from "@/libs/axios";
import { MutationConfig } from "@/libs/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getWorkpacesQuery } from "./get-workspaces";
import z from "zod";

export const updatWorkspaceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  timezone: z.string("Timezone must be string"),
});

export type UpdatWorkspaceSchema = z.infer<typeof updatWorkspaceSchema>;

export const updatWorkspace = async (
  data: UpdatWorkspaceSchema,
  token: string,
  id: string
) => {
  const res = await axiosInstance.put(`/workspace/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

type UseUpdatWorkspaceOptions = {
  token: string;
  id: string;
  mutationConfig?: MutationConfig<typeof updatWorkspace>;
};

export const useUpdatWorkspace = (params: UseUpdatWorkspaceOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = params.mutationConfig || {};

  return useMutation({
    ...params.mutationConfig,
  

    mutationFn: (body: UpdatWorkspaceSchema) => {
      return updatWorkspace(body, params.token, params.id);
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
