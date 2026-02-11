import { z } from "zod";

const studentProfileSchema = z.object({
  studentCode: z.string().min(1),
  facultyId: z.string().min(1),
  departmentId: z.string().min(1),
  majorId: z.string().min(1),
  classYear: z.coerce.number().int().positive(),
  academicYear: z.coerce.number().int().positive(),
  registrarVerified: z.boolean().optional(),
});

const teacherProfileSchema = z.object({
  employeeCode: z.string().optional(),
  facultyId: z.string().min(1),
  departmentId: z.string().min(1),
});

const staffProfileSchema = z.object({
  staffType: z.enum(["DEPT_STAFF", "FACULTY_ADMIN"]),
  facultyId: z.string().min(1),
  departmentId: z.string().nullable().optional(),
});

export const createUserSchema = z.object({
  username: z.string().min(1).optional(),
  email: z.string().email().optional(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().optional(),
  role: z.enum(["STUDENT", "TEACHER", "DEPT_STAFF", "FACULTY_ADMIN", "SUPER_ADMIN"]),
  status: z.enum(["ACTIVE", "INACTIVE", "LOCKED"]).optional(),
  studentProfile: studentProfileSchema.optional(),
  teacherProfile: teacherProfileSchema.optional(),
  staffProfile: staffProfileSchema.optional(),
});

export const updateUserSchema = z
  .object({
    username: z.string().min(1).optional(),
    email: z.string().email().optional(),
    password: z.string().min(8).optional(),
    firstName: z.string().min(1).optional(),
    lastName: z.string().min(1).optional(),
    phone: z.string().optional(),
    role: z.enum(["STUDENT", "TEACHER", "DEPT_STAFF", "FACULTY_ADMIN", "SUPER_ADMIN"]).optional(),
    status: z.enum(["ACTIVE", "INACTIVE", "LOCKED"]).optional(),
    studentProfile: studentProfileSchema.partial().optional(),
    teacherProfile: teacherProfileSchema.partial().optional(),
    staffProfile: staffProfileSchema.partial().optional(),
  })
  .refine((value) => Object.values(value).some((item) => item !== undefined), {
    message: "At least one field is required",
  });
