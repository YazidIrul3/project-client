import { axiosInstance } from "@/libs/axios";
import { MutationConfig } from "@/libs/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";
import { getProjectGroupQuery } from "./create-projectGroup";
import { getProjectQuery } from "../project/create-project";

export const updateProjectGroupPositionSchema = z.object({
  activeId: z.uuid("Active Id must be UUID").min(1, "Active Id is required"),
  overId: z.uuid("Over Id must be UUID"),
  activeIndex: z.int("Active index must be int"),
  overIndex: z.int("Over index must be int"),
});

export type UpdateProjectGroupPositionSchema = z.infer<
  typeof updateProjectGroupPositionSchema
>;

export const updateProjectGroupPosition = async (
  data: UpdateProjectGroupPositionSchema,
  token: string,
  id: string,
) => {
  const res = await axiosInstance.patch(`/projectGroup/position`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export type UpdateProjectGroupPositionVariables = {
  id: string;
  body: UpdateProjectGroupPositionSchema;
};

type UpdateProjectGroupPositionMutationFn = (
  variables: UpdateProjectGroupPositionVariables,
) => Promise<UpdateProjectGroupPositionSchema>;

type UseUpdateProjectGroupPositionOptions = {
  token: string;
  // Change: Use the new Function Type instead of the original API function
  mutationConfig?: MutationConfig<UpdateProjectGroupPositionMutationFn>;
};

export const useUpdateProjectGroupPosition = (
  params: UseUpdateProjectGroupPositionOptions,
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = params.mutationConfig || {};

  return useMutation({
    ...params.mutationConfig,

    mutationFn: ({
      body,
      id,
    }: {
      body: UpdateProjectGroupPositionSchema;
      id: string;
    }) => {
      return updateProjectGroupPosition(body, params.token, id);
    },
    onSuccess: (data, Variables, onMutateResult, context) => {
      queryClient.invalidateQueries({
        queryKey: getProjectQuery(),
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
