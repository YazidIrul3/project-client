import z from "zod";

export const workspaceSchema = z.object({
  name: z.string().min(1),
  userId: z.string(),
  workspaceTypeId: z.uuid(),
  avatar: z.string(),
  timezone: z.string(),
});

export const createWorkspaceSchema = z.object({
  name: z.string().min(1),
  userId: z.string(),
  avatar: z.string(),
  timezone: z.string(),
  workspaceTypeName: z.string(),
});

export type WorkspaceSchema = z.infer<typeof workspaceSchema>;
export type CreateWorkspaceSchema = z.infer<typeof createWorkspaceSchema>;
