import { z } from "zod";

export const listDepartmentsQuerySchema = z.object({
  facultyId: z.string().min(1).optional(),
  search: z.string().trim().optional(),
});

export const createDepartmentSchema = z.object({
  code: z.string().trim().min(1),
  name: z.string().trim().min(1),
  facultyId: z.string().min(1),
});

export const updateDepartmentSchema = z
  .object({
    code: z.string().trim().min(1).optional(),
    name: z.string().trim().min(1).optional(),
    facultyId: z.string().min(1).optional(),
  })
  .refine((value) => Object.values(value).some((item) => item !== undefined), {
    message: "At least one field is required",
  });

export const createMajorSchema = z.object({
  code: z.string().trim().min(1),
  name: z.string().trim().min(1),
});

export const updateMajorSchema = z
  .object({
    code: z.string().trim().min(1).optional(),
    name: z.string().trim().min(1).optional(),
  })
  .refine((value) => Object.values(value).some((item) => item !== undefined), {
    message: "At least one field is required",
  });
