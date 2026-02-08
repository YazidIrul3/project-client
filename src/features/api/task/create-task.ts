import { axiosInstance } from "@/libs/axios";
import { MutationConfig, queryClient } from "@/libs/react-query";
import { useMutation } from "@tanstack/react-query";
import z, { object } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  projectId: z.uuid().optional(),
  workspaceId: z.uuid(),
  startDate: z.date(),
  endDate: z.date(),
  startTime: z.string(),
  endTime: z.string(),
  status: z.string(),
  priority: z.string(),
  taskOwners: z.array(
    object({
      name: z.string().min(1, "Name is required"),
      id: z.string().min(1, "ID is required"),
      email: z.string().email("Email is invalid"),
    }),
  ),
});

export type CreateTaskSchema = z.infer<typeof createTaskSchema>;

export const createTask = async (body: CreateTaskSchema, token: string) => {
  const response = await axiosInstance.post("/task/", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getTaskQuery = () => ["task"];

type UseCreateTask = {
  token: string;
  mutationConfig?: MutationConfig<typeof createTask>;
};

export const useCreateTask = (params: UseCreateTask) => {
  return useMutation({
    ...params.mutationConfig,

    mutationFn: (body: CreateTaskSchema) => {
      return createTask(body, params.token);
    },

    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: getTaskQuery() });

      params.mutationConfig?.onSuccess?.(
        data,
        variables,
        onMutateResult,
        context,
      );
    },
  });
};
