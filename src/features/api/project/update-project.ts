import { axiosInstance } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z, { string } from "zod";
import { User } from "better-auth";
import { getProjectQuery } from "./create-project";

const updatProjectSchema = z.object({
  name: z.string().min(1, "Name is required"),
  // timezone: z.string("Timezone must be string"),
});

export type UpdatProjectSchema = z.infer<typeof updatProjectSchema>;

export const updatProject = async (
  data: UpdatProjectSchema,
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
  mutationConfig?: MutationConfig<typeof updatProject>;
};

export const useUpdatProject = (params: UseUpdateProjectOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = params.mutationConfig || {};

  return useMutation({
    ...params.mutationConfig,

    mutationFn: (body: UpdatProjectSchema) => {
      return updatProject(body, params.token, params.id);
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
