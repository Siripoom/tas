import { UserRole } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { ApiError } from "./api-error";

export async function getUserScope(userId: string, role: UserRole) {
  if (role === "SUPER_ADMIN") {
    return {
      facultyId: null as string | null,
      departmentId: null as string | null,
    };
  }

  if (role === "STUDENT") {
    const profile = await prisma.studentProfile.findUnique({ where: { userId } });
    if (!profile) {
      throw new ApiError(400, "400_VALIDATION_ERROR", "Student profile not found");
    }
    return {
      facultyId: profile.facultyId,
      departmentId: profile.departmentId,
    };
  }

  if (role === "TEACHER") {
    const profile = await prisma.teacherProfile.findUnique({ where: { userId } });
    if (!profile) {
      throw new ApiError(400, "400_VALIDATION_ERROR", "Teacher profile not found");
    }
    return {
      facultyId: profile.facultyId,
      departmentId: profile.departmentId,
    };
  }

  const profile = await prisma.staffProfile.findUnique({ where: { userId } });
  if (!profile) {
    throw new ApiError(400, "400_VALIDATION_ERROR", "Staff profile not found");
  }

  return {
    facultyId: profile.facultyId,
    departmentId: profile.departmentId,
  };
}
