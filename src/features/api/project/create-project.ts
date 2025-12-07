import { axiosInstance } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import z from "zod";

const createProjectSchema = z.object({
  name: z.string(),
  workspaceId: z.string(),
  template: z.string(),
});

type CreateProjectSchema = z.infer<typeof createProjectSchema>;

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
