import { axiosInstance } from "@/libs/axios";
import { MutationConfig, queryClient } from "@/libs/react-query";
import { useMutation } from "@tanstack/react-query";
import z from "zod";

export const createProjectGroupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  color: z.string().min(1, "Color is required"),
  projectId: z.uuid(),
  index: z.int(),
});

export type CreateProjectGroupSchema = z.infer<typeof createProjectGroupSchema>;

export const createProjectGroup = async (
  body: CreateProjectGroupSchema,
  token: string
) => {
  const response = await axiosInstance.post("/projectGroup/", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getProjectGroupQuery = () => ["projectGroup"];

type UseCreateProjectGroup = {
  token: string;
  mutationConfig?: MutationConfig<typeof createProjectGroup>;
};

export const useCreateProjectGroup = (params: UseCreateProjectGroup) => {
  return useMutation({
    ...params.mutationConfig,

    mutationFn: (body: CreateProjectGroupSchema) => {
      return createProjectGroup(body, params.token);
    },

    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: getProjectGroupQuery() });

      params.mutationConfig?.onSuccess?.(
        data,
        variables,
        onMutateResult,
        context
      );
    },
  });
};
