import { axiosInstance } from "@/libs/axios";
import { MutationConfig } from "@/libs/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";

export const updateItemProjectGroupPositionSchema = z.object({
  activeId: z.uuid("Active Id must be UUID").min(1, "Active Id is required"),
  overId: z.uuid("Over Id must be UUID"),
  activeIndex: z.int("Active index must be int"),
  overIndex: z.int("Over index must be int"),
});

export type UpdateItemProjectGroupPositionSchema = z.infer<
  typeof updateItemProjectGroupPositionSchema
>;

export const updateItemProjectGroupPosition = async (
  data: UpdateItemProjectGroupPositionSchema,
  token: string,
) => {
  const res = await axiosInstance.patch(`/itemProjectGroup/position`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export type UpdateItemProjectGroupPositionVariables = {
  body: UpdateItemProjectGroupPositionSchema;
};

type UpdateItemProjectGroupPositionMutationFn = (
  variables: UpdateItemProjectGroupPositionVariables,
) => Promise<UpdateItemProjectGroupPositionSchema>;

type UseUpdateItemProjectGroupPositionOptions = {
  token: string;
  projectGroupId: string;
  mutationConfig?: MutationConfig<UpdateItemProjectGroupPositionMutationFn>;
};

export const useUpdateItemProjectGroupPosition = (
  params: UseUpdateItemProjectGroupPositionOptions,
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = params.mutationConfig || {};

  return useMutation({
    ...params.mutationConfig,

    mutationFn: ({ body }: { body: UpdateItemProjectGroupPositionSchema }) => {
      return updateItemProjectGroupPosition(body, params.token);
    },
    onSuccess: (data, Variables, onMutateResult, context) => {
      queryClient.invalidateQueries({
        // queryKey: getItemProjectGroupByProjectGroupIdQuery(
        //   params.projectGroupId,
        // ),
      });

      params.mutationConfig?.onSuccess?.(
        data,
        Variables,
        onMutateResult,
        context,
      );
    },
  });
};
