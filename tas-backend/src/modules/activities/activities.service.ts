import {
  ActivityStatus,
  ApplicationStatus,
  OwnerScope,
  RequiredEvidenceType,
  UserRole,
} from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { ApiError } from "../../utils/api-error";
import { getUserScope } from "../../utils/scope";

type Actor = { id: string; role: UserRole };

type ActivityMutationInput = {
  title: string;
  startAt: string;
  endAt: string;
  location: string;
  hours: number;
  requiredEvidenceType: RequiredEvidenceType;
  activityTypeId: string;
  capacity: number;
  applyOpenAt: string;
  applyCloseAt: string;
  note?: string;
  ownerScope?: OwnerScope;
  ownerFacultyId?: string;
  ownerDepartmentId?: string;
  departmentIds?: string[];
  majorIds?: string[];
  status?: ActivityStatus;
};

function uniqueIds(ids: string[] | undefined) {
  if (!Array.isArray(ids)) return [];
  return Array.from(new Set(ids.filter(Boolean)));
}

function ensureDateOrder(startAt: Date, endAt: Date, applyOpenAt: Date, applyCloseAt: Date) {
  if (startAt >= endAt) {
    throw new ApiError(400, "400_VALIDATION_ERROR", "startAt must be before endAt");
  }

  if (applyOpenAt >= applyCloseAt) {
    throw new ApiError(400, "400_VALIDATION_ERROR", "applyOpenAt must be before applyCloseAt");
  }

  if (applyCloseAt > startAt) {
    throw new ApiError(
      400,
      "400_VALIDATION_ERROR",
      "applyCloseAt must be earlier than or equal to startAt",
    );
  }
}

async function ensureActivityTypeExists(activityTypeId: string) {
  const data = await prisma.activityType.findUnique({ where: { id: activityTypeId } });
  if (!data) {
    throw new ApiError(400, "400_VALIDATION_ERROR", "activityTypeId is invalid");
  }
}

async function validateDepartmentsByFaculty(departmentIds: string[], facultyId: string | null) {
  if (!departmentIds.length) {
    throw new ApiError(400, "400_VALIDATION_ERROR", "departmentIds is required");
  }

  const departments = await prisma.department.findMany({
    where: {
      id: {
        in: departmentIds,
      },
    },
    select: {
      id: true,
      facultyId: true,
    },
  });

  if (departments.length !== departmentIds.length) {
    throw new ApiError(400, "400_VALIDATION_ERROR", "Some departmentIds are invalid");
  }

  if (facultyId) {
    const invalid = departments.some((item) => item.facultyId !== facultyId);
    if (invalid) {
      throw new ApiError(400, "400_VALIDATION_ERROR", "departmentIds must be in your faculty scope");
    }
  }

  return departments;
}

async function validateMajorIdsByDepartments(majorIds: string[], departmentIds: string[]) {
  if (!majorIds.length) {
    return;
  }

  const majors = await prisma.major.findMany({
    where: {
      id: { in: majorIds },
    },
    select: {
      id: true,
      departmentId: true,
    },
  });

  if (majors.length !== majorIds.length) {
    throw new ApiError(400, "400_VALIDATION_ERROR", "Some majorIds are invalid");
  }

  const departmentSet = new Set(departmentIds);
  const invalid = majors.some((item) => !departmentSet.has(item.departmentId));

  if (invalid) {
    throw new ApiError(400, "400_VALIDATION_ERROR", "majorIds must belong to selected departments");
  }
}

function resolveLegacyDepartmentId(departmentIds: string[], fallback: string | null = null) {
  if (departmentIds.length > 0) {
    return departmentIds[0];
  }
  return fallback;
}

function canManageActivity(actor: Actor, createdById: string) {
  if (actor.role === "SUPER_ADMIN" || actor.role === "FACULTY_ADMIN") {
    return true;
  }
  return createdById === actor.id;
}

function ensureMajorIdsForDepartmentActor(actor: Actor, majorIds: string[]) {
  if ((actor.role === "TEACHER" || actor.role === "DEPT_STAFF") && majorIds.length === 0) {
    throw new ApiError(
      400,
      "400_VALIDATION_ERROR",
      "majorIds is required for teacher and department staff",
    );
  }
}

async function assertCanAccessDepartmentMajors(
  actor: Actor,
  scope: { facultyId: string | null; departmentId: string | null },
  departmentId: string,
) {
  const department = await prisma.department.findUnique({
    where: { id: departmentId },
    select: {
      id: true,
      facultyId: true,
    },
  });

  if (!department) {
    throw new ApiError(404, "404_NOT_FOUND", "Department not found");
  }

  if (actor.role === "TEACHER" || actor.role === "DEPT_STAFF") {
    if (!scope.departmentId) {
      throw new ApiError(400, "400_VALIDATION_ERROR", "User department scope not found");
    }

    if (scope.departmentId !== departmentId) {
      throw new ApiError(403, "403_FORBIDDEN", "No permission to access this department");
    }
  }

  if (actor.role === "FACULTY_ADMIN") {
    if (!scope.facultyId || scope.facultyId !== department.facultyId) {
      throw new ApiError(403, "403_FORBIDDEN", "No permission to access this department");
    }
  }
}

async function resolveDepartmentIdsForCreate(actor: Actor, scope: { facultyId: string | null; departmentId: string | null }, input: ActivityMutationInput) {
  const inputDepartmentIds = uniqueIds(input.departmentIds || (input.ownerDepartmentId ? [input.ownerDepartmentId] : []));

  if (actor.role === "TEACHER" || actor.role === "DEPT_STAFF") {
    if (!scope.departmentId) {
      throw new ApiError(400, "400_VALIDATION_ERROR", "User department scope not found");
    }

    if (inputDepartmentIds.length > 0 && (inputDepartmentIds.length !== 1 || inputDepartmentIds[0] !== scope.departmentId)) {
      throw new ApiError(403, "403_FORBIDDEN", "You can only create activity in your own department");
    }

    return [scope.departmentId];
  }

  if (actor.role === "FACULTY_ADMIN") {
    const departments = await validateDepartmentsByFaculty(inputDepartmentIds, scope.facultyId);
    return departments.map((item) => item.id);
  }

  await validateDepartmentsByFaculty(inputDepartmentIds, null);
  return inputDepartmentIds;
}

async function resolveDepartmentIdsForUpdate(
  actor: Actor,
  scope: { facultyId: string | null; departmentId: string | null },
  input: Partial<ActivityMutationInput>,
  fallbackDepartmentIds: string[],
  fallbackOwnerDepartmentId: string | null,
) {
  const hasInput = input.departmentIds !== undefined || input.ownerDepartmentId !== undefined;
  const rawInput = uniqueIds(input.departmentIds || (input.ownerDepartmentId ? [input.ownerDepartmentId] : []));

  if (actor.role === "TEACHER" || actor.role === "DEPT_STAFF") {
    if (!scope.departmentId) {
      throw new ApiError(400, "400_VALIDATION_ERROR", "User department scope not found");
    }

    if (hasInput && (rawInput.length !== 1 || rawInput[0] !== scope.departmentId)) {
      throw new ApiError(403, "403_FORBIDDEN", "You can only set your own department");
    }

    return [scope.departmentId];
  }

  if (!hasInput) {
    if (fallbackDepartmentIds.length > 0) {
      return fallbackDepartmentIds;
    }
    if (fallbackOwnerDepartmentId) {
      return [fallbackOwnerDepartmentId];
    }
    throw new ApiError(400, "400_VALIDATION_ERROR", "departmentIds is required");
  }

  const facultyScope = actor.role === "FACULTY_ADMIN" ? scope.facultyId : null;
  const departments = await validateDepartmentsByFaculty(rawInput, facultyScope);
  return departments.map((item) => item.id);
}

function studentInLegacyScope(activity: {
  ownerScope: OwnerScope;
  ownerFacultyId: string | null;
  ownerDepartmentId: string | null;
}, student: { facultyId: string; departmentId: string }) {
  if (activity.ownerScope === "FACULTY") {
    return activity.ownerFacultyId === student.facultyId;
  }

  return activity.ownerDepartmentId === student.departmentId;
}

export async function listActivities(query: {
  scope?: OwnerScope;
  department?: string;
  status?: ActivityStatus;
  dateFrom?: string;
  dateTo?: string;
}) {
  return prisma.activity.findMany({
    where: {
      ownerScope: query.scope,
      ...(query.department
        ? {
            OR: [
              { ownerDepartmentId: query.department },
              {
                targetDepartments: {
                  some: {
                    departmentId: query.department,
                  },
                },
              },
            ],
          }
        : {}),
      status: query.status,
      ...(query.dateFrom || query.dateTo
        ? {
            startAt: {
              gte: query.dateFrom ? new Date(query.dateFrom) : undefined,
              lte: query.dateTo ? new Date(query.dateTo) : undefined,
            },
          }
        : {}),
    },
    include: {
      ownerFaculty: true,
      ownerDepartment: true,
      activityType: true,
      targetDepartments: {
        include: {
          department: true,
        },
      },
      targetMajors: {
        include: {
          major: true,
        },
      },
      createdBy: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          role: true,
        },
      },
    },
    orderBy: { startAt: "desc" },
  });
}

export async function getActivityById(activityId: string) {
  const activity = await prisma.activity.findUnique({
    where: { id: activityId },
    include: {
      ownerFaculty: true,
      ownerDepartment: true,
      activityType: true,
      targetDepartments: {
        include: {
          department: true,
        },
      },
      targetMajors: {
        include: {
          major: true,
        },
      },
      applications: {
        include: {
          student: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              studentProfile: true,
            },
          },
        },
      },
    },
  });

  if (!activity) {
    throw new ApiError(404, "404_NOT_FOUND", "Activity not found");
  }

  return activity;
}

export async function listMajorsForDepartment(actor: Actor, departmentId: string) {
  const scope = await getUserScope(actor.id, actor.role);
  await assertCanAccessDepartmentMajors(actor, scope, departmentId);

  return prisma.major.findMany({
    where: { departmentId },
    orderBy: { code: "asc" },
  });
}

export async function createActivity(actor: Actor, input: ActivityMutationInput) {
  const startAt = new Date(input.startAt);
  const endAt = new Date(input.endAt);
  const applyOpenAt = new Date(input.applyOpenAt);
  const applyCloseAt = new Date(input.applyCloseAt);

  ensureDateOrder(startAt, endAt, applyOpenAt, applyCloseAt);
  await ensureActivityTypeExists(input.activityTypeId);

  const scope = await getUserScope(actor.id, actor.role);
  const departmentIds = await resolveDepartmentIdsForCreate(actor, scope, input);
  const majorIds = uniqueIds(input.majorIds);

  await validateMajorIdsByDepartments(majorIds, departmentIds);
  ensureMajorIdsForDepartmentActor(actor, majorIds);

  const ownerFacultyId =
    actor.role === "SUPER_ADMIN"
      ? input.ownerFacultyId || scope.facultyId
      : scope.facultyId;

  const ownerDepartmentId = resolveLegacyDepartmentId(departmentIds, input.ownerDepartmentId || null);

  return prisma.activity.create({
    data: {
      title: input.title,
      startAt,
      endAt,
      location: input.location,
      hours: input.hours,
      requiredEvidenceType: input.requiredEvidenceType,
      activityTypeId: input.activityTypeId,
      capacity: input.capacity,
      applyOpenAt,
      applyCloseAt,
      note: input.note,
      ownerScope: departmentIds.length ? "DEPARTMENT" : input.ownerScope || "FACULTY",
      ownerFacultyId,
      ownerDepartmentId,
      status: input.status || "OPEN_REGISTRATION",
      createdById: actor.id,
      targetDepartments: {
        createMany: {
          data: departmentIds.map((departmentId) => ({ departmentId })),
          skipDuplicates: true,
        },
      },
      ...(majorIds.length
        ? {
            targetMajors: {
              createMany: {
                data: majorIds.map((majorId) => ({ majorId })),
                skipDuplicates: true,
              },
            },
          }
        : {}),
    },
    include: {
      ownerFaculty: true,
      ownerDepartment: true,
      activityType: true,
      targetDepartments: {
        include: { department: true },
      },
      targetMajors: {
        include: { major: true },
      },
    },
  });
}

export async function updateActivity(
  actor: Actor,
  activityId: string,
  input: Partial<ActivityMutationInput>,
) {
  const activity = await prisma.activity.findUnique({
    where: { id: activityId },
    include: {
      targetDepartments: true,
      targetMajors: true,
    },
  });

  if (!activity) {
    throw new ApiError(404, "404_NOT_FOUND", "Activity not found");
  }

  if (!canManageActivity(actor, activity.createdById)) {
    throw new ApiError(403, "403_FORBIDDEN", "No permission to update activity");
  }

  const scope = await getUserScope(actor.id, actor.role);

  if (actor.role === "FACULTY_ADMIN" && scope.facultyId && activity.ownerFacultyId !== scope.facultyId) {
    throw new ApiError(403, "403_FORBIDDEN", "No permission to update activity outside your faculty");
  }

  if (input.startAt || input.endAt || input.applyOpenAt || input.applyCloseAt) {
    ensureDateOrder(
      new Date(input.startAt || activity.startAt),
      new Date(input.endAt || activity.endAt),
      new Date(input.applyOpenAt || activity.applyOpenAt),
      new Date(input.applyCloseAt || activity.applyCloseAt),
    );
  }

  if (input.activityTypeId) {
    await ensureActivityTypeExists(input.activityTypeId);
  }

  const departmentIds = await resolveDepartmentIdsForUpdate(
    actor,
    scope,
    input,
    activity.targetDepartments.map((item) => item.departmentId),
    activity.ownerDepartmentId,
  );

  const majorIds =
    input.majorIds !== undefined
      ? uniqueIds(input.majorIds)
      : activity.targetMajors.map((item) => item.majorId);

  await validateMajorIdsByDepartments(majorIds, departmentIds);
  ensureMajorIdsForDepartmentActor(actor, majorIds);

  const ownerFacultyId =
    actor.role === "SUPER_ADMIN"
      ? input.ownerFacultyId || activity.ownerFacultyId
      : scope.facultyId || activity.ownerFacultyId;

  const ownerDepartmentId = resolveLegacyDepartmentId(departmentIds, activity.ownerDepartmentId);

  return prisma.$transaction(async (tx) => {
    await tx.activityTargetDepartment.deleteMany({ where: { activityId } });
    await tx.activityTargetMajor.deleteMany({ where: { activityId } });

    await tx.activityTargetDepartment.createMany({
      data: departmentIds.map((departmentId) => ({
        activityId,
        departmentId,
      })),
      skipDuplicates: true,
    });

    if (majorIds.length > 0) {
      await tx.activityTargetMajor.createMany({
        data: majorIds.map((majorId) => ({
          activityId,
          majorId,
        })),
        skipDuplicates: true,
      });
    }

    return tx.activity.update({
      where: { id: activityId },
      data: {
        title: input.title,
        startAt: input.startAt ? new Date(input.startAt) : undefined,
        endAt: input.endAt ? new Date(input.endAt) : undefined,
        location: input.location,
        hours: input.hours,
        requiredEvidenceType: input.requiredEvidenceType,
        activityTypeId: input.activityTypeId,
        capacity: input.capacity,
        applyOpenAt: input.applyOpenAt ? new Date(input.applyOpenAt) : undefined,
        applyCloseAt: input.applyCloseAt ? new Date(input.applyCloseAt) : undefined,
        note: input.note,
        ownerScope: departmentIds.length ? "DEPARTMENT" : input.ownerScope,
        ownerFacultyId,
        ownerDepartmentId,
        status: input.status,
      },
      include: {
        ownerFaculty: true,
        ownerDepartment: true,
        activityType: true,
        targetDepartments: {
          include: { department: true },
        },
        targetMajors: {
          include: { major: true },
        },
      },
    });
  });
}

export async function deleteActivity(actor: Actor, activityId: string) {
  const activity = await prisma.activity.findUnique({ where: { id: activityId } });

  if (!activity) {
    throw new ApiError(404, "404_NOT_FOUND", "Activity not found");
  }

  if (!canManageActivity(actor, activity.createdById)) {
    throw new ApiError(403, "403_FORBIDDEN", "No permission to delete activity");
  }

  if (actor.role === "FACULTY_ADMIN") {
    const scope = await getUserScope(actor.id, actor.role);
    if (scope.facultyId && activity.ownerFacultyId !== scope.facultyId) {
      throw new ApiError(403, "403_FORBIDDEN", "No permission to delete activity outside your faculty");
    }
  }

  await prisma.activity.delete({ where: { id: activityId } });

  return { success: true };
}

export async function applyActivity(studentUserId: string, activityId: string) {
  const student = await prisma.studentProfile.findUnique({ where: { userId: studentUserId } });

  if (!student) {
    throw new ApiError(403, "403_FORBIDDEN", "Only students can apply activities");
  }

  const activity = await prisma.activity.findUnique({
    where: { id: activityId },
    include: {
      targetDepartments: true,
      targetMajors: true,
    },
  });

  if (!activity) {
    throw new ApiError(404, "404_NOT_FOUND", "Activity not found");
  }

  const hasTargetDepartments = activity.targetDepartments.length > 0;
  const hasTargetMajors = activity.targetMajors.length > 0;

  if (hasTargetDepartments) {
    const departmentIds = new Set(activity.targetDepartments.map((item) => item.departmentId));
    if (!departmentIds.has(student.departmentId)) {
      throw new ApiError(403, "403_FORBIDDEN", "Activity is not available for your department");
    }
  } else if (!studentInLegacyScope(activity, student)) {
    throw new ApiError(403, "403_FORBIDDEN", "Activity is outside your scope");
  }

  if (hasTargetMajors) {
    const majorIds = new Set(activity.targetMajors.map((item) => item.majorId));
    if (!majorIds.has(student.majorId)) {
      throw new ApiError(403, "403_FORBIDDEN", "Activity is not available for your major");
    }
  }

  const now = new Date();

  if (activity.status !== "OPEN_REGISTRATION") {
    throw new ApiError(409, "409_CONFLICT", "Activity is not open for registration");
  }

  if (now < activity.applyOpenAt || now > activity.applyCloseAt) {
    throw new ApiError(409, "409_CONFLICT", "Activity registration is closed");
  }

  const existing = await prisma.activityApplication.findUnique({
    where: {
      activityId_studentUserId: {
        activityId,
        studentUserId,
      },
    },
  });

  if (existing) {
    if (existing.status !== ApplicationStatus.REVISION_REQUIRED && existing.status !== ApplicationStatus.REJECTED) {
      throw new ApiError(409, "409_CONFLICT", "Already applied for this activity");
    }
  }

  const joinedCount = await prisma.activityApplication.count({
    where: {
      activityId,
      status: {
        in: [ApplicationStatus.APPLIED, ApplicationStatus.APPROVED],
      },
    },
  });

  if (joinedCount >= activity.capacity) {
    throw new ApiError(409, "409_CONFLICT", "Activity is full");
  }

  if (existing) {
    return prisma.activityApplication.update({
      where: { id: existing.id },
      data: {
        status: ApplicationStatus.APPLIED,
        submittedAt: now,
        decidedById: null,
        decidedAt: null,
        remark: null,
      },
    });
  }

  return prisma.activityApplication.create({
    data: {
      activityId,
      studentUserId,
      status: "APPLIED",
    },
  });
}
