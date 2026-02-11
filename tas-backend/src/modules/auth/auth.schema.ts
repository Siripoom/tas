import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});

export const refreshSchema = z.object({
  refreshToken: z.string().min(1),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8),
});

export const registerStudentSchema = z.object({
  studentCode: z.string().min(1),
  password: z.string().min(8),
  username: z.string().min(1).optional(),
  email: z.string().email().optional(),
});
