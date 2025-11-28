import { axiosInstance } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z, { string } from "zod";

const updateUserInputSchema = z.object({
  name: z.string().min(1, "Name is required"),
  number_phone: z.string().min(9, "Number phone need to have 9 digits or more"),
  timezone: z.string("Timezone must be string"),
});

export type UpdateUserInput = z.infer<typeof updateUserInputSchema>;

export const updateUser = async (
  data: UpdateUserInput,
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
    mutationFn: (body: UpdateUserInput) => {
      if (!params.token) return Promise.resolve(null);
      return updateUser(body, params.id, params.token);
    },
  });
};
