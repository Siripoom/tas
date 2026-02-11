import { StaffType, UserRole } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { env } from "../../config/env";
import { hashPassword } from "../../utils/password";
import { ApiError } from "../../utils/api-error";

export async function importStudents(items: Array<{
  studentCode: string;
  firstName: string;
  lastName: string;
  email?: string;
  facultyCode: string;
  facultyName: string;
  departmentCode: string;
  departmentName: string;
  majorCode: string;
  majorName: string;
  classYear: number;
  academicYear: number;
}>) {
  await prisma.$transaction(
    items.map((item) =>
      prisma.registrarStudent.upsert({
        where: { studentCode: item.studentCode },
        update: {
          ...item,
          isActive: true,
        },
        create: {
          ...item,
          isActive: true,
        },
      }),
    ),
  );

  return { success: true, imported: items.length };
}

export async function importTeachers(items: Array<{
  employeeCode?: string;
  username: string;
  email?: string;
  firstName: string;
  lastName: string;
  facultyId: string;
  departmentId: string;
}>) {
  const passwordHash = await hashPassword(env.DEFAULT_PASSWORD);

  await prisma.$transaction(
    items.map((item) =>
      prisma.user.upsert({
        where: { username: item.username },
        update: {
          firstName: item.firstName,
          lastName: item.lastName,
          email: item.email,
          role: UserRole.TEACHER,
          status: "ACTIVE",
          teacherProfile: {
            upsert: {
              update: {
                employeeCode: item.employeeCode,
                facultyId: item.facultyId,
                departmentId: item.departmentId,
              },
              create: {
                employeeCode: item.employeeCode,
                facultyId: item.facultyId,
                departmentId: item.departmentId,
              },
            },
          },
        },
        create: {
          username: item.username,
          email: item.email,
          firstName: item.firstName,
          lastName: item.lastName,
          role: UserRole.TEACHER,
          status: "ACTIVE",
          passwordHash,
          teacherProfile: {
            create: {
              employeeCode: item.employeeCode,
              facultyId: item.facultyId,
              departmentId: item.departmentId,
            },
          },
        },
      }),
    ),
  );

  return { success: true, imported: items.length, defaultPassword: env.DEFAULT_PASSWORD };
}

export async function importStaff(items: Array<{
  username: string;
  email?: string;
  firstName: string;
  lastName: string;
  staffType: "DEPT_STAFF" | "FACULTY_ADMIN";
  facultyId: string;
  departmentId?: string | null;
}>) {
  const passwordHash = await hashPassword(env.DEFAULT_PASSWORD);

  await prisma.$transaction(
    items.map((item) => {
      const role = item.staffType === "FACULTY_ADMIN" ? UserRole.FACULTY_ADMIN : UserRole.DEPT_STAFF;
      return prisma.user.upsert({
        where: { username: item.username },
        update: {
          firstName: item.firstName,
          lastName: item.lastName,
          email: item.email,
          role,
          status: "ACTIVE",
          staffProfile: {
            upsert: {
              update: {
                staffType: item.staffType as StaffType,
                facultyId: item.facultyId,
                departmentId: item.departmentId || null,
              },
              create: {
                staffType: item.staffType as StaffType,
                facultyId: item.facultyId,
                departmentId: item.departmentId || null,
              },
            },
          },
        },
        create: {
          username: item.username,
          email: item.email,
          firstName: item.firstName,
          lastName: item.lastName,
          role,
          status: "ACTIVE",
          passwordHash,
          staffProfile: {
            create: {
              staffType: item.staffType as StaffType,
              facultyId: item.facultyId,
              departmentId: item.departmentId || null,
            },
          },
        },
      });
    }),
  );

  return { success: true, imported: items.length, defaultPassword: env.DEFAULT_PASSWORD };
}

export async function resetUserPassword(userId: string, newPassword: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new ApiError(404, "404_NOT_FOUND", "User not found");
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      passwordHash: await hashPassword(newPassword),
    },
  });

  return { success: true };
}
