import { z } from "zod";

export const uploadFileBodySchema = z.object({
  ownerType: z.enum(["APPLICATION", "RECORD"]),
  ownerId: z.string().min(1),
});

export const listFilesQuerySchema = z.object({
  ownerType: z.enum(["APPLICATION", "RECORD"]).optional(),
  ownerId: z.string().optional(),
});
