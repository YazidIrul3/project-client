import { axiosInstance } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z, { string } from "zod";
import { User } from "better-auth";
import { getProjectGroupQuery } from "./create-projectGroup";

const updateProjectGroupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  color: z.string("Color must be string"),
});

export type UpdateProjectGroupSchema = z.infer<typeof updateProjectGroupSchema>;

export const updateProjectGroup = async (
  data: UpdateProjectGroupSchema,
  token: string,
  id: string
) => {
  const res = await axiosInstance.put(`/projectGroup/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

type UseUpdateProjectGroupOptions = {
  token: string;
  id: string;
  mutationConfig?: MutationConfig<typeof updateProjectGroup>;
};

export const useUpdateProjectGroup = (params: UseUpdateProjectGroupOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = params.mutationConfig || {};

  return useMutation({
    ...params.mutationConfig,

    mutationFn: (body: UpdateProjectGroupSchema) => {
      return updateProjectGroup(body, params.token, params.id);
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
