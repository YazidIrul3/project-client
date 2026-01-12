import { axiosInstance } from "@/libs/axios";
import { MutationConfig, queryClient } from "@/libs/react-query";
import { useMutation } from "@tanstack/react-query";
import z from "zod";

export const createChatChannelSchema = z.object({
  name: z.string("Name must be string").min(1, "Name is required"),
  description: z.string("Must be string").optional(),
  type: z.string(),
  workspaceId: z.uuid("Workspace must be UUID"),
  chatChannelMembers: z.array(
    z.object({
      memberId: z.uuid(),
    })
  ),
});

export type CreateChatChannelSchema = z.infer<typeof createChatChannelSchema>;

export const createChatChannel = async (
  body: CreateChatChannelSchema,
  token: string
) => {
  const res = await axiosInstance.post("/chat-channel/", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getChatChannelQuery = () => ["chatChannel"];

type UseCreateChatChannel = {
  token: string;
  mutationConfig?: MutationConfig<typeof createChatChannel>;
};

export const useCreateChatChannel = (props: UseCreateChatChannel) => {
  return useMutation({
    ...props.mutationConfig,

    mutationFn: (body: CreateChatChannelSchema) => {
      return createChatChannel(body, props.token);
    },

    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: getChatChannelQuery() });

      props.mutationConfig?.onSuccess?.(
        data,
        variables,
        onMutateResult,
        context
      );
    },
  });
};
