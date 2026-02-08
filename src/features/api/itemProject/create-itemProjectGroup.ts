import { axiosInstance } from "@/libs/axios";
import { MutationConfig, queryClient } from "@/libs/react-query";
import { useMutation } from "@tanstack/react-query";
import z, { object } from "zod";

export const createItemProjectGroupSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  projectGroupId: z.uuid().min(1, "Project group is required"),
  startDate: z.date(),
  endDate: z.date(),
  startTime: z.string(),
  endTime: z.string(),
  priority: z.string().min(1, "Priority is required"),
  index: z.int(),
  assignedUsers: z.array(
    object({
      name: z.string().min(1, "Name is required"),
      id: z.string().min(1, "ID is required"),
      email: z.string().email("Email is invalid"),
    }),
  ),
});

export type CreateItemProjectGroupSchema = z.infer<
  typeof createItemProjectGroupSchema
>;

export const createItemProjectGroup = async (
  body: CreateItemProjectGroupSchema,
  token: string,
) => {
  const response = await axiosInstance.post("/itemProjectGroup/", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getItemProjectGroupQuery = () => ["ItemProjectGroup"];

type UseCreateItemProjectGroup = {
  token: string;
  mutationConfig?: MutationConfig<typeof createItemProjectGroup>;
};

export const useCreateItemProjectGroup = (
  params: UseCreateItemProjectGroup,
) => {
  return useMutation({
    ...params.mutationConfig,

    mutationFn: (body: CreateItemProjectGroupSchema) => {
      return createItemProjectGroup(body, params.token);
    },

    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: getItemProjectGroupQuery() });

      params.mutationConfig?.onSuccess?.(
        data,
        variables,
        onMutateResult,
        context,
      );
    },
  });
};
