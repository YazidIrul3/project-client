import { axiosInstance } from "@/libs/axios";
import { MutationConfig, queryClient } from "@/libs/react-query";
import { useMutation } from "@tanstack/react-query";
import z from "zod";
import { getWorkpacesQuery } from "./get-workspaces";
import { useCurrentWorkspace } from "@/features/dashboard/_hooks/use-current-workspace";

export const createWorkspaceInputSchema = z.object({
  name: z.string().min(1, "Name is required"),
  userId: z.string().min(9, "Number phone need to have 9 digits or more"),
  timezone: z.string("Timezone must be string"),
  avatar: z.string("Timezone must be string"),
  workspaceTypeName: z.string("Timezone must be string"),
});

export type CreateWorkspaceInputSchema = z.infer<
  typeof createWorkspaceInputSchema
>;

export const createWorkspace = async (
  body: CreateWorkspaceInputSchema,
  token?: string
) => {
  try {
    const response = await axiosInstance.post("/workspace/", body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

type useCreateWorkspaceParams = {
  token?: string;
  mutationConfig?: MutationConfig<typeof createWorkspace>;
};

export const useCreateWorkspace = (params: useCreateWorkspaceParams) => {
  return useMutation({
    ...params.mutationConfig,

    mutationFn: (body: CreateWorkspaceInputSchema) => {
      return createWorkspace(body, params.token);
    },

    retry: false,

    onSuccess: (data, Variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: getWorkpacesQuery() });
      // setCurrentWorkspace({ userId: Variables.userId, name: Variables.name });

      params.mutationConfig?.onSuccess?.(
        data,
        Variables,
        onMutateResult,
        context
      );
    },
  });
};
