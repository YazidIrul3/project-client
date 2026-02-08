import { axiosInstance } from "@/libs/axios";
import { MutationConfig, queryClient } from "@/libs/react-query";
import { useMutation } from "@tanstack/react-query";
import z from "zod";

export const createWorkspaceMemberInputSchema = z.object({
  memberId: z.string("Member Id must be String"),
  role: z.string("Role must be String"),
  workspaceId: z.uuid("Workspace Id must be UUID"),
  status: z.string().default("pending").optional(),
});

export type CreateWorkspaceMemberInputSchema = z.infer<
  typeof createWorkspaceMemberInputSchema
>;

export const createWorkspaceMember = async (
  body: CreateWorkspaceMemberInputSchema,
  token?: string,
) => {
  try {
    const response = await axiosInstance.post("/workspaceMember/", body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getWorkspaceMemberQuery = () => ["workspaceMember"];

type useCreateWorkspaceMemberParams = {
  token?: string;
  mutationConfig?: MutationConfig<typeof createWorkspaceMember>;
};

export const useCreateWorkspaceMember = (
  params: useCreateWorkspaceMemberParams,
) => {
  return useMutation({
    ...params.mutationConfig,

    mutationFn: (body: CreateWorkspaceMemberInputSchema) => {
      return createWorkspaceMember(body, params.token);
    },

    retry: false,

    onSuccess: (data, Variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: getWorkspaceMemberQuery() });
      // setCurrentWorkspaceMember({ userId: Variables.userId, name: Variables.name });

      params.mutationConfig?.onSuccess?.(
        data,
        Variables,
        onMutateResult,
        context,
      );
    },
  });
};
