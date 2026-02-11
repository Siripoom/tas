import { Prisma, UserRole } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { ApiError } from "../../utils/api-error";
import { getUserScope } from "../../utils/scope";

type Actor = { id: string; role: UserRole };

async function getActorFacultyId(actor: Actor) {
  if (actor.role !== "FACULTY_ADMIN") {
    return null;
  }

  const scope = await getUserScope(actor.id, actor.role);
  return scope.facultyId;
}

async function assertDepartmentScope(actor: Actor, departmentId: string) {
  const department = await prisma.department.findUnique({
    where: { id: departmentId },
    include: { faculty: true },
  });

  if (!department) {
    throw new ApiError(404, "404_NOT_FOUND", "Department not found");
  }

  if (actor.role === "FACULTY_ADMIN") {
    const actorFacultyId = await getActorFacultyId(actor);
    if (!actorFacultyId || actorFacultyId !== department.facultyId) {
      throw new ApiError(403, "403_FORBIDDEN", "No permission to access this department");
    }
  }

  return department;
}

async function ensureFacultyExists(facultyId: string) {
  const faculty = await prisma.faculty.findUnique({ where: { id: facultyId } });
  if (!faculty) {
    throw new ApiError(400, "400_VALIDATION_ERROR", "Faculty not found");
  }
}

function handlePrismaError(error: unknown) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      throw new ApiError(409, "409_CONFLICT", "Duplicated code in the same parent scope");
    }
  }

  throw error;
}

export async function listDepartments(
  actor: Actor,
  query: {
    facultyId?: string;
    search?: string;
  },
) {
  const actorFacultyId = await getActorFacultyId(actor);
  const facultyId = actor.role === "FACULTY_ADMIN" ? actorFacultyId || undefined : query.facultyId;

  return prisma.department.findMany({
    where: {
      facultyId,
      ...(query.search
        ? {
            OR: [
              {
                code: {
                  contains: query.search,
                  mode: "insensitive",
                },
              },
              {
                name: {
                  contains: query.search,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {}),
    },
    include: {
      faculty: true,
    },
    orderBy: [{ facultyId: "asc" }, { code: "asc" }],
  });
}

export async function getDepartmentById(actor: Actor, departmentId: string) {
  return assertDepartmentScope(actor, departmentId);
}

export async function createDepartment(
  actor: Actor,
  input: {
    code: string;
    name: string;
    facultyId: string;
  },
) {
  const actorFacultyId = await getActorFacultyId(actor);
  const facultyId = actor.role === "FACULTY_ADMIN" ? actorFacultyId || input.facultyId : input.facultyId;

  if (!facultyId) {
    throw new ApiError(400, "400_VALIDATION_ERROR", "facultyId is required");
  }

  await ensureFacultyExists(facultyId);

  try {
    return await prisma.department.create({
      data: {
        code: input.code,
        name: input.name,
        facultyId,
      },
      include: {
        faculty: true,
      },
    });
  } catch (error) {
    handlePrismaError(error);
  }
}

export async function updateDepartment(
  actor: Actor,
  departmentId: string,
  input: {
    code?: string;
    name?: string;
    facultyId?: string;
  },
) {
  const current = await assertDepartmentScope(actor, departmentId);

  if (actor.role === "FACULTY_ADMIN" && input.facultyId && input.facultyId !== current.facultyId) {
    throw new ApiError(403, "403_FORBIDDEN", "FACULTY_ADMIN cannot move department to another faculty");
  }

  const targetFacultyId = input.facultyId || current.facultyId;
  if (input.facultyId) {
    await ensureFacultyExists(targetFacultyId);
  }

  try {
    return await prisma.department.update({
      where: { id: departmentId },
      data: {
        code: input.code,
        name: input.name,
        facultyId: targetFacultyId,
      },
      include: {
        faculty: true,
      },
    });
  } catch (error) {
    handlePrismaError(error);
  }
}

export async function deleteDepartment(actor: Actor, departmentId: string) {
  const current = await assertDepartmentScope(actor, departmentId);

  const [majorCount, studentCount, teacherCount, staffCount, activityCount, activityTargetCount] = await prisma.$transaction([
    prisma.major.count({ where: { departmentId: current.id } }),
    prisma.studentProfile.count({ where: { departmentId: current.id } }),
    prisma.teacherProfile.count({ where: { departmentId: current.id } }),
    prisma.staffProfile.count({ where: { departmentId: current.id } }),
    prisma.activity.count({ where: { ownerDepartmentId: current.id } }),
    prisma.activityTargetDepartment.count({ where: { departmentId: current.id } }),
  ]);

  const totalReferences =
    majorCount + studentCount + teacherCount + staffCount + activityCount + activityTargetCount;

  if (totalReferences > 0) {
    throw new ApiError(
      409,
      "409_CONFLICT",
      "Cannot delete department because it is referenced by majors, users, or activities",
    );
  }

  await prisma.department.delete({ where: { id: current.id } });
  return { success: true };
}

export async function listFaculties(actor: Actor) {
  if (actor.role === "FACULTY_ADMIN") {
    const actorFacultyId = await getActorFacultyId(actor);
    if (!actorFacultyId) {
      return [];
    }

    return prisma.faculty.findMany({
      where: { id: actorFacultyId },
      orderBy: { code: "asc" },
    });
  }

  return prisma.faculty.findMany({ orderBy: { code: "asc" } });
}

export async function listMajorsByDepartment(actor: Actor, departmentId: string) {
  await assertDepartmentScope(actor, departmentId);

  return prisma.major.findMany({
    where: { departmentId },
    orderBy: { code: "asc" },
  });
}

export async function createMajor(
  actor: Actor,
  departmentId: string,
  input: {
    code: string;
    name: string;
  },
) {
  await assertDepartmentScope(actor, departmentId);

  try {
    return await prisma.major.create({
      data: {
        code: input.code,
        name: input.name,
        departmentId,
      },
    });
  } catch (error) {
    handlePrismaError(error);
  }
}

export async function updateMajor(
  actor: Actor,
  departmentId: string,
  majorId: string,
  input: {
    code?: string;
    name?: string;
  },
) {
  await assertDepartmentScope(actor, departmentId);

  const major = await prisma.major.findUnique({
    where: { id: majorId },
  });

  if (!major || major.departmentId !== departmentId) {
    throw new ApiError(404, "404_NOT_FOUND", "Major not found");
  }

  try {
    return await prisma.major.update({
      where: { id: major.id },
      data: {
        code: input.code,
        name: input.name,
      },
    });
  } catch (error) {
    handlePrismaError(error);
  }
}

export async function deleteMajor(actor: Actor, departmentId: string, majorId: string) {
  await assertDepartmentScope(actor, departmentId);

  const major = await prisma.major.findUnique({
    where: { id: majorId },
  });

  if (!major || major.departmentId !== departmentId) {
    throw new ApiError(404, "404_NOT_FOUND", "Major not found");
  }

  const [usedByStudents, usedByActivities] = await prisma.$transaction([
    prisma.studentProfile.count({
      where: { majorId: major.id },
    }),
    prisma.activityTargetMajor.count({
      where: { majorId: major.id },
    }),
  ]);

  if (usedByStudents > 0 || usedByActivities > 0) {
    throw new ApiError(
      409,
      "409_CONFLICT",
      "Cannot delete major because it is referenced by students or activities",
    );
  }

  await prisma.major.delete({ where: { id: major.id } });
  return { success: true };
}
