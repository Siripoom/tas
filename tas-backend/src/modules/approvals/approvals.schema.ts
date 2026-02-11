import { z } from "zod";

export const approvalActionSchema = z.object({
  remark: z.string().min(1).max(1000).optional(),
});

export const revisionActionSchema = z.object({
  remark: z.string().min(1).max(1000),
});
