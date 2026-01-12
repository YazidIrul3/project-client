import z from "zod";

export const workspaceSchema = z.object({
  name: z.string().min(1),
  userId: z.string(),
  workspaceTypeId: z.uuid(),
  avatar: z.string(),
  timezone: z.string(),
});

export const createWorkspaceSchema = z.object({
  name: z.string("Name must be string").min(1, "Name is required"),
  userId: z.uuid("User Id must be uuid"),
  avatar: z.string("Avatar must be string"),
  timezone: z.string("Timezone must be string"),
  workspaceTypeName: z.string("Workspace type must be string"),
});

export type WorkspaceSchema = z.infer<typeof workspaceSchema>;
export type CreateWorkspaceSchema = z.infer<typeof createWorkspaceSchema>;
 