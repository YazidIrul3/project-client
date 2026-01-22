import { axiosInstance } from "@/libs/axios";
import { MutationConfig } from "@/libs/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";
import { getChatChannelQuery } from "./create-chatChannel";

export const updatChatChannelSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  type: z.string(),
  chatChannelMembers: z.array(
    z.object({
      memberId: z.string(),
    })
  ),
});

export type UpdatChatChannelSchema = z.infer<typeof updatChatChannelSchema>;

export const updatChatChannel = async (
  data: UpdatChatChannelSchema,
  token: string,
  id: string
) => {
  const res = await axiosInstance.put(`/chat-channel/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

type UseUpdatChatChannelOptions = {
  token: string;
  id: string;
  mutationConfig?: MutationConfig<typeof updatChatChannel>;
};

export const useUpdatChatChannel = (params: UseUpdatChatChannelOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = params.mutationConfig || {};

  return useMutation({
    ...params.mutationConfig,

    mutationFn: (body: UpdatChatChannelSchema) => {
      return updatChatChannel(body, params.token, params.id);
    },

    onSuccess: (data, Variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: getChatChannelQuery() });

      params.mutationConfig?.onSuccess?.(
        data,
        Variables,
        onMutateResult,
        context
      );
    },
  });
};
