import { axiosInstance } from "@/libs/axios";
import { MutationConfig, queryClient } from "@/libs/react-query";
import { useMutation } from "@tanstack/react-query";
import z from "zod";

export const createProjectSchema = z.object({
  name: z.string().min(1, "Name is required"),
  workspaceId: z.string(),
  template: z.string().min(1, "Template is required"),
});

export type CreateProjectSchema = z.infer<typeof createProjectSchema>;

export const createProject = async (
  body: CreateProjectSchema,
  token: string
) => {
  const response = await axiosInstance.post("/project/", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getProjectQuery = () => ["project"];

type UseCreateProject = {
  token: string;
  mutationConfig?: MutationConfig<typeof createProject>;
};

export const useCreateProject = (params: UseCreateProject) => {
  return useMutation({
    ...params.mutationConfig,

    mutationFn: (body: CreateProjectSchema) => {
      return createProject(body, params.token);
    },

    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: getProjectQuery() });

      params.mutationConfig?.onSuccess?.(
        data,
        variables,
        onMutateResult,
        context
      );
    },
  });
};
