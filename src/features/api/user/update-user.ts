import { axiosInstance } from "@/libs/axios";
import { MutationConfig } from "@/libs/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z, { string } from "zod";

export const updateUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  number_phone: z.string().min(9, "Number phone need to have 9 digits or more"),
  timezone: z.string("Timezone must be string"),
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;

export const updateUser = async (
  data: UpdateUserSchema,
  id: string,
  token: string
) => {
  const res = await axiosInstance.put(`/auth/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

type UseUpdateUserOptions = {
  token: string;
  id: string;
  mutationConfig?: MutationConfig<typeof updateUser>;
};

export const useUpdateUser = (params: UseUpdateUserOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = params.mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: ["profile", { id: string }],
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: (body: UpdateUserSchema) => {
      if (!params.token) return Promise.resolve(null);
      return updateUser(body, params.id, params.token);
    },
  });
};
