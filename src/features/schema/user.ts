import z from "zod";

export const updateUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  number_phone: z.string().min(9, "Number phone need to have 9 digits or more"),
  timezone: z.string("Timezone must be string"),
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
