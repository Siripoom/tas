import { z } from "zod";

const importedStudentSchema = z.object({
  studentCode: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email().optional(),
  facultyCode: z.string().min(1),
  facultyName: z.string().min(1),
  departmentCode: z.string().min(1),
  departmentName: z.string().min(1),
  majorCode: z.string().min(1),
  majorName: z.string().min(1),
  classYear: z.coerce.number().int().positive(),
  academicYear: z.coerce.number().int().positive(),
});

export const importStudentsSchema = z.object({
  items: z.array(importedStudentSchema).min(1),
});

export const importTeachersSchema = z.object({
  items: z
    .array(
      z.object({
        employeeCode: z.string().optional(),
        username: z.string().min(1),
        email: z.string().email().optional(),
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        facultyId: z.string().min(1),
        departmentId: z.string().min(1),
      }),
    )
    .min(1),
});

export const importStaffSchema = z.object({
  items: z
    .array(
      z.object({
        username: z.string().min(1),
        email: z.string().email().optional(),
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        staffType: z.enum(["DEPT_STAFF", "FACULTY_ADMIN"]),
        facultyId: z.string().min(1),
        departmentId: z.string().nullable().optional(),
      }),
    )
    .min(1),
});

export const resetPasswordSchema = z.object({
  newPassword: z.string().min(8),
});
