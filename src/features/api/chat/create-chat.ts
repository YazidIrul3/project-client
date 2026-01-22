import { axiosInstance } from "@/libs/axios";
import { MutationConfig, queryClient } from "@/libs/react-query";
import { useMutation } from "@tanstack/react-query";
import z from "zod";

export const createChatSchema = z.object({
  senderId: z.uuid("Sender Id must be UUID"),
  replyToId: z.uuid("Replay Id must be UUID").optional(),
  chatChannelId: z.uuid("Chat channel Id must be UUID"),
  content: z.string(),
  type: z.string(),
});

export type CreateChatSchema = z.infer<typeof createChatSchema>;

export const createChat = async (body: CreateChatSchema, token: string) => {
  const res = await axiosInstance.post("/chat/", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getChatChannelQuery = () => ["chat"];

type UseCreateChat = {
  token: string;
  mutationConfig?: MutationConfig<typeof createChat>;
};

export const useCreateChat = (props: UseCreateChat) => {
  return useMutation({
    ...props.mutationConfig,

    mutationFn: (body: CreateChatSchema) => {
      return createChat(body, props.token);
    },

    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: getChatChannelQuery() });

      props.mutationConfig?.onSuccess?.(
        data,
        variables,
        onMutateResult,
        context,
      );
    },
  });
};
