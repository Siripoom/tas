import { z } from "zod";

export const listActivityTypesQuerySchema = z.object({
  search: z.string().trim().optional(),
});

export const createActivityTypeSchema = z.object({
  code: z.string().trim().min(1),
  name: z.string().trim().min(1),
});

export const updateActivityTypeSchema = z
  .object({
    code: z.string().trim().min(1).optional(),
    name: z.string().trim().min(1).optional(),
  })
  .refine((value) => Object.values(value).some((item) => item !== undefined), {
    message: "At least one field is required",
  });
