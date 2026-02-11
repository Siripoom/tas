import { z } from "zod";

export const activitiesQuerySchema = z.object({
  scope: z.enum(["FACULTY", "DEPARTMENT"]).optional(),
  department: z.string().optional(),
  status: z
    .enum(["OPEN_REGISTRATION", "IN_PROGRESS", "CLOSED", "CANCELLED"])
    .optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
});

export const createActivitySchema = z.object({
  title: z.string().min(1),
  startAt: z.string().datetime(),
  endAt: z.string().datetime(),
  location: z.string().min(1),
  hours: z.coerce.number().int().positive(),
  requiredEvidenceType: z.enum(["PHOTO", "PDF", "BOTH"]),
  activityTypeId: z.string().min(1),
  capacity: z.coerce.number().int().positive(),
  applyOpenAt: z.string().datetime(),
  applyCloseAt: z.string().datetime(),
  note: z.string().optional(),
  ownerScope: z.enum(["FACULTY", "DEPARTMENT"]).optional(),
  ownerFacultyId: z.string().optional(),
  ownerDepartmentId: z.string().optional(),
  departmentIds: z.array(z.string().min(1)).optional(),
  majorIds: z.array(z.string().min(1)).optional(),
  status: z
    .enum(["OPEN_REGISTRATION", "IN_PROGRESS", "CLOSED", "CANCELLED"])
    .optional(),
});

export const updateActivitySchema = createActivitySchema.partial().refine(
  (value) => Object.values(value).some((item) => item !== undefined),
  {
    message: "At least one field is required",
  },
);
