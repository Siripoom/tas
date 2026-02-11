import { z } from "zod";

export const createRecordSchema = z.object({
  title: z.string().min(1),
  joinStart: z.string().datetime(),
  joinEnd: z.string().datetime(),
  location: z.string().min(1),
  hours: z.coerce.number().int().positive(),
  note: z.string().optional(),
});

export const updateRecordSchema = createRecordSchema.partial();
