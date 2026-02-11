import { UserRole } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { comparePassword, hashPassword } from "../../utils/password";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../../utils/jwt";
import { sha256 } from "../../utils/hash";
import { ApiError } from "../../utils/api-error";

function roleScope(user: {
  role: UserRole;
  studentProfile: {
    studentCode: string;
    facultyId: string;
    departmentId: string;
    majorId: string;
    classYear: number;
    academicYear: number;
    faculty: { id: string; name: string } | null;
    department: { id: string; name: string } | null;
    major: { id: string; name: string } | null;
  } | null;
  teacherProfile:
    | {
        facultyId: string;
        departmentId: string;
        faculty: { id: string; name: string } | null;
        department: { id: string; name: string } | null;
      }
    | null;
  staffProfile:
    | {
        facultyId: string;
        departmentId: string | null;
        faculty: { id: string; name: string } | null;
        department: { id: string; name: string } | null;
      }
    | null;
}) {
  const faculty =
    user.studentProfile?.faculty || user.teacherProfile?.faculty || user.staffProfile?.faculty || null;
  const department =
    user.studentProfile?.department ||
    user.teacherProfile?.department ||
    user.staffProfile?.department ||
    null;
  const major = user.studentProfile?.major || null;

  return {
    studentCode: user.studentProfile?.studentCode || null,
    facultyId:
      user.studentProfile?.facultyId ||
      user.teacherProfile?.facultyId ||
      user.staffProfile?.facultyId ||
      null,
    departmentId:
      user.studentProfile?.departmentId ||
      user.teacherProfile?.departmentId ||
      user.staffProfile?.departmentId ||
      null,
    majorId: user.studentProfile?.majorId || null,
    classYear: user.studentProfile?.classYear || null,
    academicYear: user.studentProfile?.academicYear || null,
    faculty,
    department,
    major,
  };
}

async function getUserById(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    include: {
      studentProfile: {
        include: {
          faculty: true,
          department: true,
          major: true,
        },
      },
      teacherProfile: {
        include: {
          faculty: true,
          department: true,
        },
      },
      staffProfile: {
        include: {
          faculty: true,
          department: true,
        },
      },
    },
  });
}

export async function login(input: { email: string; password: string }) {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: input.email }, { username: input.email }],
    },
    include: {
      studentProfile: {
        include: {
          faculty: true,
          department: true,
          major: true,
        },
      },
      teacherProfile: {
        include: {
          faculty: true,
          department: true,
        },
      },
      staffProfile: {
        include: {
          faculty: true,
          department: true,
        },
      },
    },
  });

  if (!user) {
    throw new ApiError(401, "401_UNAUTHORIZED", "Invalid credentials");
  }

  if (user.status !== "ACTIVE") {
    throw new ApiError(403, "403_FORBIDDEN", "User is not active");
  }

  const valid = await comparePassword(input.password, user.passwordHash);

  if (!valid) {
    throw new ApiError(401, "401_UNAUTHORIZED", "Invalid credentials");
  }

  const accessToken = signAccessToken({ sub: user.id, role: user.role });
  const refreshToken = signRefreshToken({ sub: user.id, type: "refresh" });

  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      tokenHash: sha256(refreshToken),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      status: user.status,
      ...roleScope(user),
    },
  };
}

export async function refreshAccessToken(refreshToken: string) {
  let payload;
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch (_error) {
    throw new ApiError(401, "401_UNAUTHORIZED", "Invalid refresh token");
  }

  const tokenHash = sha256(refreshToken);
  const tokenRecord = await prisma.refreshToken.findUnique({
    where: { tokenHash },
  });

  if (!tokenRecord || tokenRecord.revokedAt || tokenRecord.expiresAt < new Date()) {
    throw new ApiError(401, "401_UNAUTHORIZED", "Refresh token expired");
  }

  const user = await getUserById(payload.sub);
  if (!user) {
    throw new ApiError(404, "404_NOT_FOUND", "User not found");
  }

  const newAccessToken = signAccessToken({ sub: user.id, role: user.role });
  const newRefreshToken = signRefreshToken({ sub: user.id, type: "refresh" });

  await prisma.$transaction([
    prisma.refreshToken.update({
      where: { id: tokenRecord.id },
      data: { revokedAt: new Date() },
    }),
    prisma.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash: sha256(newRefreshToken),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    }),
  ]);

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
}

export async function changePassword(userId: string, input: { currentPassword: string; newPassword: string }) {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new ApiError(404, "404_NOT_FOUND", "User not found");
  }

  const valid = await comparePassword(input.currentPassword, user.passwordHash);

  if (!valid) {
    throw new ApiError(401, "401_UNAUTHORIZED", "Current password is incorrect");
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      passwordHash: await hashPassword(input.newPassword),
    },
  });

  return { success: true };
}

export async function registerStudent(input: {
  studentCode: string;
  password: string;
  username?: string;
  email?: string;
}) {
  const registrar = await prisma.registrarStudent.findUnique({
    where: { studentCode: input.studentCode },
  });

  if (!registrar || !registrar.isActive) {
    throw new ApiError(400, "400_VALIDATION_ERROR", "Student code is not found in registrar data");
  }

  const existed = await prisma.studentProfile.findUnique({
    where: { studentCode: input.studentCode },
  });

  if (existed) {
    throw new ApiError(409, "409_CONFLICT", "Student is already registered");
  }

  const faculty = await prisma.faculty.upsert({
    where: { code: registrar.facultyCode },
    update: { name: registrar.facultyName },
    create: { code: registrar.facultyCode, name: registrar.facultyName },
  });

  const department = await prisma.department.upsert({
    where: {
      facultyId_code: {
        facultyId: faculty.id,
        code: registrar.departmentCode,
      },
    },
    update: { name: registrar.departmentName },
    create: {
      facultyId: faculty.id,
      code: registrar.departmentCode,
      name: registrar.departmentName,
    },
  });

  const major = await prisma.major.upsert({
    where: {
      departmentId_code: {
        departmentId: department.id,
        code: registrar.majorCode,
      },
    },
    update: { name: registrar.majorName },
    create: {
      departmentId: department.id,
      code: registrar.majorCode,
      name: registrar.majorName,
    },
  });

  const user = await prisma.user.create({
    data: {
      username: input.username || input.studentCode,
      email: input.email || registrar.email || `${input.studentCode}@student.local`,
      passwordHash: await hashPassword(input.password),
      role: UserRole.STUDENT,
      status: "ACTIVE",
      firstName: registrar.firstName,
      lastName: registrar.lastName,
      studentProfile: {
        create: {
          studentCode: registrar.studentCode,
          facultyId: faculty.id,
          departmentId: department.id,
          majorId: major.id,
          classYear: registrar.classYear,
          academicYear: registrar.academicYear,
          registrarVerified: true,
        },
      },
    },
    include: {
      studentProfile: {
        include: {
          faculty: true,
          department: true,
          major: true,
        },
      },
      teacherProfile: {
        include: {
          faculty: true,
          department: true,
        },
      },
      staffProfile: {
        include: {
          faculty: true,
          department: true,
        },
      },
    },
  });

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    ...roleScope(user),
  };
}
