import { axiosInstance } from "@/libs/axios";
import { MutationConfig, queryClient } from "@/libs/react-query";
import { useMutation } from "@tanstack/react-query";
import { getChatChannelQuery } from "./create-chatChannel";

type DeleteChatChannel = {
  token: string;
  id: string;
};

export const deleteChatChannel = async (props: DeleteChatChannel) => {
  const reponse = await axiosInstance.delete(`/chat-channel/${props.id}`, {
    headers: {
      Authorization: `Bearer ${props.token}`,
    },
  });

  return reponse.data;
};

type UseDeleteChatChannelParams = {
  token: string;
  id: string;
  mutationConfig?: MutationConfig<typeof deleteChatChannel>;
};

export const useDeleteChatChannel = (params: UseDeleteChatChannelParams) => {
  return useMutation({
    ...params.mutationConfig,

    mutationFn: () => {
      if (!params.token) return Promise.resolve(null);
      return deleteChatChannel({
        id: params.id,
        token: params.token,
      });
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
