import { Prisma, StaffType, UserRole, UserStatus } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { ApiError } from "../../utils/api-error";
import { hashPassword } from "../../utils/password";
import { getUserScope } from "../../utils/scope";

type Actor = { id: string; role: UserRole };

const userInclude = {
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
} as const;

type UserWithProfile = Prisma.UserGetPayload<{ include: typeof userInclude }>;

async function getActorFacultyId(actor: Actor) {
  if (actor.role !== "FACULTY_ADMIN") {
    return null;
  }

  const scope = await getUserScope(actor.id, actor.role);
  return scope.facultyId;
}

function getUserFacultyId(user: UserWithProfile) {
  return (
    user.studentProfile?.facultyId ||
    user.teacherProfile?.facultyId ||
    user.staffProfile?.facultyId ||
    null
  );
}

async function ensureActorCanAccessFaculty(actor: Actor, facultyId: string | null) {
  if (actor.role !== "FACULTY_ADMIN") {
    return;
  }

  const actorFacultyId = await getActorFacultyId(actor);

  if (!facultyId || !actorFacultyId || facultyId !== actorFacultyId) {
    throw new ApiError(403, "403_FORBIDDEN", "No permission to access this resource");
  }
}

async function ensureActorCanAccessUser(actor: Actor, user: UserWithProfile) {
  if (actor.role === "SUPER_ADMIN") {
    return;
  }

  if (user.role === "SUPER_ADMIN") {
    throw new ApiError(403, "403_FORBIDDEN", "No permission to access SUPER_ADMIN user");
  }

  const userFacultyId = getUserFacultyId(user);
  await ensureActorCanAccessFaculty(actor, userFacultyId);
}

async function ensureFacultyExists(facultyId: string) {
  const faculty = await prisma.faculty.findUnique({ where: { id: facultyId } });
  if (!faculty) {
    throw new ApiError(400, "400_VALIDATION_ERROR", "Faculty not found");
  }
}

async function ensureDepartmentBelongsFaculty(departmentId: string, facultyId: string) {
  const department = await prisma.department.findUnique({ where: { id: departmentId } });

  if (!department) {
    throw new ApiError(400, "400_VALIDATION_ERROR", "Department not found");
  }

  if (department.facultyId !== facultyId) {
    throw new ApiError(
      400,
      "400_VALIDATION_ERROR",
      "Department does not belong to selected faculty",
    );
  }
}

async function ensureMajorBelongsDepartment(majorId: string, departmentId: string) {
  const major = await prisma.major.findUnique({ where: { id: majorId } });

  if (!major) {
    throw new ApiError(400, "400_VALIDATION_ERROR", "Major not found");
  }

  if (major.departmentId !== departmentId) {
    throw new ApiError(400, "400_VALIDATION_ERROR", "Major does not belong to selected department");
  }
}

function ensureRoleProfileMatch(input: {
  role: UserRole;
  studentProfile?: unknown;
  teacherProfile?: unknown;
  staffProfile?: unknown;
}) {
  if (input.role === "STUDENT") {
    if (!input.studentProfile) {
      throw new ApiError(400, "400_VALIDATION_ERROR", "studentProfile is required for STUDENT role");
    }
    if (input.teacherProfile || input.staffProfile) {
      throw new ApiError(400, "400_VALIDATION_ERROR", "Only studentProfile is allowed for STUDENT role");
    }
  }

  if (input.role === "TEACHER") {
    if (!input.teacherProfile) {
      throw new ApiError(400, "400_VALIDATION_ERROR", "teacherProfile is required for TEACHER role");
    }
    if (input.studentProfile || input.staffProfile) {
      throw new ApiError(400, "400_VALIDATION_ERROR", "Only teacherProfile is allowed for TEACHER role");
    }
  }

  if (input.role === "DEPT_STAFF" || input.role === "FACULTY_ADMIN") {
    if (!input.staffProfile) {
      throw new ApiError(400, "400_VALIDATION_ERROR", "staffProfile is required for staff roles");
    }
    if (input.studentProfile || input.teacherProfile) {
      throw new ApiError(400, "400_VALIDATION_ERROR", "Only staffProfile is allowed for staff roles");
    }
  }

  if (input.role === "SUPER_ADMIN" && (input.studentProfile || input.teacherProfile || input.staffProfile)) {
    throw new ApiError(400, "400_VALIDATION_ERROR", "SUPER_ADMIN role cannot have profile payload");
  }
}

function ensureStaffRoleConsistency(role: UserRole, staffType: StaffType) {
  if (role === "FACULTY_ADMIN" && staffType !== "FACULTY_ADMIN") {
    throw new ApiError(400, "400_VALIDATION_ERROR", "staffType must be FACULTY_ADMIN for FACULTY_ADMIN role");
  }

  if (role === "DEPT_STAFF" && staffType !== "DEPT_STAFF") {
    throw new ApiError(400, "400_VALIDATION_ERROR", "staffType must be DEPT_STAFF for DEPT_STAFF role");
  }
}

function handleUniqueError(error: unknown) {
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
    throw new ApiError(409, "409_CONFLICT", "Duplicated unique field value");
  }

  throw error;
}

export async function listUsers(
  actor: Actor,
  query: {
    role?: UserRole;
    status?: UserStatus;
    departmentId?: string;
    facultyId?: string;
  },
) {
  const actorFacultyId = await getActorFacultyId(actor);
  const effectiveFacultyId = actor.role === "FACULTY_ADMIN" ? actorFacultyId || undefined : query.facultyId;

  const profileFilters =
    effectiveFacultyId || query.departmentId
      ? [
          {
            studentProfile: {
              ...(effectiveFacultyId ? { facultyId: effectiveFacultyId } : {}),
              ...(query.departmentId ? { departmentId: query.departmentId } : {}),
            },
          },
          {
            teacherProfile: {
              ...(effectiveFacultyId ? { facultyId: effectiveFacultyId } : {}),
              ...(query.departmentId ? { departmentId: query.departmentId } : {}),
            },
          },
          {
            staffProfile: {
              ...(effectiveFacultyId ? { facultyId: effectiveFacultyId } : {}),
              ...(query.departmentId ? { departmentId: query.departmentId } : {}),
            },
          },
        ]
      : undefined;

  return prisma.user.findMany({
    where: {
      role: query.role,
      status: query.status,
      ...(profileFilters ? { OR: profileFilters } : {}),
    },
    include: userInclude,
    orderBy: { createdAt: "desc" },
  });
}

export async function getUserById(actor: Actor, id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    include: userInclude,
  });

  if (!user) {
    throw new ApiError(404, "404_NOT_FOUND", "User not found");
  }

  await ensureActorCanAccessUser(actor, user);
  return user;
}

export async function createUser(
  actor: Actor,
  input: {
    username?: string;
    email?: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
    role: UserRole;
    status?: UserStatus;
    studentProfile?: {
      studentCode: string;
      facultyId: string;
      departmentId: string;
      majorId: string;
      classYear: number;
      academicYear: number;
      registrarVerified?: boolean;
    };
    teacherProfile?: {
      employeeCode?: string;
      facultyId: string;
      departmentId: string;
    };
    staffProfile?: {
      staffType: StaffType;
      facultyId: string;
      departmentId?: string | null;
    };
  },
) {
  if (actor.role === "FACULTY_ADMIN" && input.role === "SUPER_ADMIN") {
    throw new ApiError(403, "403_FORBIDDEN", "FACULTY_ADMIN cannot create SUPER_ADMIN user");
  }

  ensureRoleProfileMatch(input);

  if (input.studentProfile) {
    await ensureFacultyExists(input.studentProfile.facultyId);
    await ensureActorCanAccessFaculty(actor, input.studentProfile.facultyId);
    await ensureDepartmentBelongsFaculty(input.studentProfile.departmentId, input.studentProfile.facultyId);
    await ensureMajorBelongsDepartment(input.studentProfile.majorId, input.studentProfile.departmentId);
  }

  if (input.teacherProfile) {
    await ensureFacultyExists(input.teacherProfile.facultyId);
    await ensureActorCanAccessFaculty(actor, input.teacherProfile.facultyId);
    await ensureDepartmentBelongsFaculty(input.teacherProfile.departmentId, input.teacherProfile.facultyId);
  }

  if (input.staffProfile) {
    ensureStaffRoleConsistency(input.role, input.staffProfile.staffType);
    await ensureFacultyExists(input.staffProfile.facultyId);
    await ensureActorCanAccessFaculty(actor, input.staffProfile.facultyId);

    if (input.staffProfile.staffType === "FACULTY_ADMIN") {
      input.staffProfile.departmentId = null;
    }

    if (input.staffProfile.departmentId) {
      await ensureDepartmentBelongsFaculty(input.staffProfile.departmentId, input.staffProfile.facultyId);
    }

    if (input.staffProfile.staffType === "DEPT_STAFF" && !input.staffProfile.departmentId) {
      throw new ApiError(400, "400_VALIDATION_ERROR", "departmentId is required for DEPT_STAFF");
    }
  }

  const data: Prisma.UserCreateInput = {
    username: input.username,
    email: input.email,
    passwordHash: await hashPassword(input.password),
    firstName: input.firstName,
    lastName: input.lastName,
    phone: input.phone,
    role: input.role,
    status: input.status || "ACTIVE",
    ...(input.studentProfile
      ? {
          studentProfile: {
            create: {
              ...input.studentProfile,
              registrarVerified: input.studentProfile.registrarVerified || false,
            },
          },
        }
      : {}),
    ...(input.teacherProfile
      ? {
          teacherProfile: {
            create: input.teacherProfile,
          },
        }
      : {}),
    ...(input.staffProfile
      ? {
          staffProfile: {
            create: {
              ...input.staffProfile,
              departmentId: input.staffProfile.departmentId || null,
            },
          },
        }
      : {}),
  };

  try {
    return await prisma.user.create({
      data,
      include: userInclude,
    });
  } catch (error) {
    handleUniqueError(error);
  }
}

export async function updateUser(
  actor: Actor,
  id: string,
  input: Partial<{
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    role: UserRole;
    status: UserStatus;
    studentProfile: {
      studentCode?: string;
      facultyId?: string;
      departmentId?: string;
      majorId?: string;
      classYear?: number;
      academicYear?: number;
      registrarVerified?: boolean;
    };
    teacherProfile: {
      employeeCode?: string;
      facultyId?: string;
      departmentId?: string;
    };
    staffProfile: {
      staffType?: StaffType;
      facultyId?: string;
      departmentId?: string | null;
    };
  }>,
) {
  const existing = await prisma.user.findUnique({
    where: { id },
    include: userInclude,
  });

  if (!existing) {
    throw new ApiError(404, "404_NOT_FOUND", "User not found");
  }

  await ensureActorCanAccessUser(actor, existing);

  if (existing.role === "SUPER_ADMIN") {
    throw new ApiError(403, "403_FORBIDDEN", "SUPER_ADMIN user is read-only in this endpoint");
  }

  if (input.role && input.role !== existing.role) {
    throw new ApiError(
      400,
      "400_VALIDATION_ERROR",
      "Role migration is not supported in update endpoint",
    );
  }

  const data: Prisma.UserUpdateInput = {
    username: input.username,
    email: input.email,
    passwordHash: input.password ? await hashPassword(input.password) : undefined,
    firstName: input.firstName,
    lastName: input.lastName,
    phone: input.phone,
    status: input.status,
  };

  if (input.studentProfile) {
    if (existing.role !== "STUDENT" || !existing.studentProfile) {
      throw new ApiError(400, "400_VALIDATION_ERROR", "studentProfile update is not allowed for this user role");
    }

    const nextFacultyId = input.studentProfile.facultyId || existing.studentProfile.facultyId;
    const nextDepartmentId = input.studentProfile.departmentId || existing.studentProfile.departmentId;
    const nextMajorId = input.studentProfile.majorId || existing.studentProfile.majorId;

    await ensureFacultyExists(nextFacultyId);
    await ensureActorCanAccessFaculty(actor, nextFacultyId);
    await ensureDepartmentBelongsFaculty(nextDepartmentId, nextFacultyId);
    await ensureMajorBelongsDepartment(nextMajorId, nextDepartmentId);

    data.studentProfile = {
      update: {
        studentCode: input.studentProfile.studentCode,
        facultyId: input.studentProfile.facultyId,
        departmentId: input.studentProfile.departmentId,
        majorId: input.studentProfile.majorId,
        classYear: input.studentProfile.classYear,
        academicYear: input.studentProfile.academicYear,
        registrarVerified: input.studentProfile.registrarVerified,
      },
    };
  }

  if (input.teacherProfile) {
    if (existing.role !== "TEACHER" || !existing.teacherProfile) {
      throw new ApiError(400, "400_VALIDATION_ERROR", "teacherProfile update is not allowed for this user role");
    }

    const nextFacultyId = input.teacherProfile.facultyId || existing.teacherProfile.facultyId;
    const nextDepartmentId = input.teacherProfile.departmentId || existing.teacherProfile.departmentId;

    await ensureFacultyExists(nextFacultyId);
    await ensureActorCanAccessFaculty(actor, nextFacultyId);
    await ensureDepartmentBelongsFaculty(nextDepartmentId, nextFacultyId);

    data.teacherProfile = {
      update: {
        employeeCode: input.teacherProfile.employeeCode,
        facultyId: input.teacherProfile.facultyId,
        departmentId: input.teacherProfile.departmentId,
      },
    };
  }

  if (input.staffProfile) {
    if ((existing.role !== "DEPT_STAFF" && existing.role !== "FACULTY_ADMIN") || !existing.staffProfile) {
      throw new ApiError(400, "400_VALIDATION_ERROR", "staffProfile update is not allowed for this user role");
    }

    const nextStaffType = input.staffProfile.staffType || existing.staffProfile.staffType;
    const nextFacultyId = input.staffProfile.facultyId || existing.staffProfile.facultyId;
    const nextDepartmentId =
      input.staffProfile.departmentId !== undefined
        ? input.staffProfile.departmentId
        : existing.staffProfile.departmentId;

    ensureStaffRoleConsistency(existing.role, nextStaffType);
    await ensureFacultyExists(nextFacultyId);
    await ensureActorCanAccessFaculty(actor, nextFacultyId);

    if (nextStaffType === "FACULTY_ADMIN" && nextDepartmentId !== null) {
      throw new ApiError(400, "400_VALIDATION_ERROR", "FACULTY_ADMIN must have null departmentId");
    }

    if (nextStaffType === "DEPT_STAFF" && !nextDepartmentId) {
      throw new ApiError(400, "400_VALIDATION_ERROR", "departmentId is required for DEPT_STAFF");
    }

    if (nextDepartmentId) {
      await ensureDepartmentBelongsFaculty(nextDepartmentId, nextFacultyId);
    }

    data.staffProfile = {
      update: {
        staffType: input.staffProfile.staffType,
        facultyId: input.staffProfile.facultyId,
        departmentId:
          input.staffProfile.departmentId !== undefined ? input.staffProfile.departmentId : undefined,
      },
    };
  }

  try {
    return await prisma.user.update({
      where: { id },
      data,
      include: userInclude,
    });
  } catch (error) {
    handleUniqueError(error);
  }
}

export async function deleteUser(actor: Actor, id: string) {
  const existing = await prisma.user.findUnique({
    where: { id },
    include: userInclude,
  });

  if (!existing) {
    throw new ApiError(404, "404_NOT_FOUND", "User not found");
  }

  await ensureActorCanAccessUser(actor, existing);

  if (existing.role === "SUPER_ADMIN") {
    throw new ApiError(403, "403_FORBIDDEN", "SUPER_ADMIN user is read-only in this endpoint");
  }

  await prisma.user.delete({ where: { id } });
  return { success: true };
}
