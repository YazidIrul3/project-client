import { axiosInstance } from "@/libs/axios";
import { MutationConfig } from "@/libs/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z, { string } from "zod";
import { User } from "better-auth";
import { getProjectQuery } from "./create-project";

export const updateProjectSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export type UpdateProjectSchema = z.infer<typeof updateProjectSchema>;

export const updateProject = async (
  data: UpdateProjectSchema,
  token: string,
  id: string
) => {
  const res = await axiosInstance.put(`/project/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

type UseUpdateProjectOptions = {
  token: string;
  id: string;
  mutationConfig?: MutationConfig<typeof updateProject>;
};

export const useUpdateProject = (params: UseUpdateProjectOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = params.mutationConfig || {};

  return useMutation({
    ...params.mutationConfig,

    mutationFn: (body: UpdateProjectSchema) => {
      return updateProject(body, params.token, params.id);
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
