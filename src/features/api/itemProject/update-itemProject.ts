import { axiosInstance } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z, { object, string } from "zod";
import { User } from "better-auth";
import { getItemProjectGroupQuery } from "./create-itemProjectGroup";

const updateItemProjectGroupSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  projectGroupId: z.uuid().min(1, "Project group is required"),
  startDate: z.date(),
  endDate: z.date(),
  startTime: z.string(),
  endTime: z.string(),
  priority: z.string().min(1, "Priority is required"),
  assignedUsers: z.array(object()),
});

export type UpdateItemProjectGroupSchema = z.infer<
  typeof updateItemProjectGroupSchema
>;

export const updateItemProjectGroup = async (
  data: UpdateItemProjectGroupSchema,
  token: string,
  id: string
) => {
  const res = await axiosInstance.put(`/ItemprojectGroup/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

type UseUpdateItemProjectGroupOptions = {
  token: string;
  id: string;
  mutationConfig?: MutationConfig<typeof updateItemProjectGroup>;
};

export const useUpdateItemProjectGroup = (
  params: UseUpdateItemProjectGroupOptions
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = params.mutationConfig || {};

  return useMutation({
    ...params.mutationConfig,

    mutationFn: (body: UpdateItemProjectGroupSchema) => {
      return updateItemProjectGroup(body, params.token, params.id);
    },

    onSuccess: (data, Variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: getItemProjectGroupQuery() });

      params.mutationConfig?.onSuccess?.(
        data,
        Variables,
        onMutateResult,
        context
      );
    },
    
  });
};
