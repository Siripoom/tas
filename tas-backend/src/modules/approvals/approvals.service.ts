import { ApplicationStatus, RecordStatus, UserRole } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { ApiError } from "../../utils/api-error";
import { getUserScope } from "../../utils/scope";

type Actor = { id: string; role: UserRole };

type ApplicationWithScope = {
  activity: {
    ownerScope: "FACULTY" | "DEPARTMENT";
    ownerFacultyId: string | null;
    ownerDepartmentId: string | null;
    targetDepartments: Array<{ departmentId: string }>;
    targetMajors: Array<{ majorId: string }>;
  };
  student: {
    studentProfile: {
      facultyId: string;
      departmentId: string;
      majorId: string;
    } | null;
  };
};

function activityAllowsStudentScope(application: ApplicationWithScope) {
  const studentProfile = application.student.studentProfile;
  if (!studentProfile) return false;

  const hasTargetDepartments = application.activity.targetDepartments.length > 0;
  const hasTargetMajors = application.activity.targetMajors.length > 0;

  if (hasTargetDepartments) {
    const departmentIds = new Set(application.activity.targetDepartments.map((item) => item.departmentId));
    if (!departmentIds.has(studentProfile.departmentId)) {
      return false;
    }
  } else if (application.activity.ownerScope === "FACULTY") {
    if (application.activity.ownerFacultyId !== studentProfile.facultyId) {
      return false;
    }
  } else if (application.activity.ownerDepartmentId !== studentProfile.departmentId) {
    return false;
  }

  if (hasTargetMajors) {
    const majorIds = new Set(application.activity.targetMajors.map((item) => item.majorId));
    if (!majorIds.has(studentProfile.majorId)) {
      return false;
    }
  }

  return true;
}

async function ensureCanReviewApplication(actor: Actor, application: ApplicationWithScope) {
  const studentProfile = application.student.studentProfile;
  if (!studentProfile) {
    throw new ApiError(404, "404_NOT_FOUND", "Student profile not found");
  }

  if (!activityAllowsStudentScope(application)) {
    throw new ApiError(403, "403_FORBIDDEN", "Activity is not scoped for this student");
  }

  if (actor.role === "SUPER_ADMIN") return;

  const scope = await getUserScope(actor.id, actor.role);

  if (actor.role === "FACULTY_ADMIN") {
    if (scope.facultyId !== studentProfile.facultyId) {
      throw new ApiError(403, "403_FORBIDDEN", "No permission to review this application");
    }
    return;
  }

  if (actor.role === "TEACHER" || actor.role === "DEPT_STAFF") {
    if (scope.departmentId !== studentProfile.departmentId) {
      throw new ApiError(403, "403_FORBIDDEN", "No permission to review this application");
    }
    return;
  }

  throw new ApiError(403, "403_FORBIDDEN", "No permission to review");
}

async function ensureCanReviewRecord(actor: Actor, targetFacultyId: string, targetDepartmentId: string) {
  if (actor.role === "SUPER_ADMIN") return;

  const scope = await getUserScope(actor.id, actor.role);

  if (actor.role === "FACULTY_ADMIN") {
    if (scope.facultyId !== targetFacultyId) {
      throw new ApiError(403, "403_FORBIDDEN", "No permission to review this record");
    }
    return;
  }

  if (actor.role === "TEACHER" || actor.role === "DEPT_STAFF") {
    if (scope.departmentId !== targetDepartmentId) {
      throw new ApiError(403, "403_FORBIDDEN", "No permission to review this record");
    }
    return;
  }

  throw new ApiError(403, "403_FORBIDDEN", "No permission to review");
}

export async function getPendingApprovals(actor: Actor) {
  const scope = await getUserScope(actor.id, actor.role);

  const applicationWhere =
    actor.role === "SUPER_ADMIN"
      ? {
          status: ApplicationStatus.APPLIED,
        }
      : actor.role === "FACULTY_ADMIN"
        ? {
            status: ApplicationStatus.APPLIED,
            student: {
              studentProfile: {
                facultyId: scope.facultyId!,
              },
            },
            activity: {
              OR: [
                { ownerFacultyId: scope.facultyId! },
                {
                  targetDepartments: {
                    some: {
                      department: {
                        facultyId: scope.facultyId!,
                      },
                    },
                  },
                },
              ],
            },
          }
        : {
            status: ApplicationStatus.APPLIED,
            student: {
              studentProfile: {
                departmentId: scope.departmentId!,
              },
            },
            activity: {
              OR: [
                { ownerDepartmentId: scope.departmentId! },
                {
                  targetDepartments: {
                    some: {
                      departmentId: scope.departmentId!,
                    },
                  },
                },
              ],
            },
          };

  const whereRecords =
    actor.role === "SUPER_ADMIN"
      ? {}
      : actor.role === "FACULTY_ADMIN"
        ? { student: { studentProfile: { facultyId: scope.facultyId! } } }
        : { student: { studentProfile: { departmentId: scope.departmentId! } } };

  const [applicationsRaw, records] = await Promise.all([
    prisma.activityApplication.findMany({
      where: applicationWhere,
      include: {
        activity: {
          include: {
            targetDepartments: true,
            targetMajors: true,
          },
        },
        student: {
          include: {
            studentProfile: {
              include: {
                faculty: true,
                department: true,
                major: true,
              },
            },
          },
        },
      },
      orderBy: { submittedAt: "desc" },
    }),
    prisma.studentActivityRecord.findMany({
      where: {
        status: RecordStatus.SUBMITTED,
        ...whereRecords,
      },
      include: {
        student: {
          include: {
            studentProfile: {
              include: {
                faculty: true,
                department: true,
                major: true,
              },
            },
          },
        },
      },
      orderBy: { submittedAt: "desc" },
    }),
  ]);

  const applications = applicationsRaw.filter((item) =>
    activityAllowsStudentScope({
      activity: item.activity,
      student: {
        studentProfile: item.student.studentProfile,
      },
    }),
  );

  return { applications, records };
}

export async function approveApplication(actor: Actor, applicationId: string, remark?: string) {
  const application = await prisma.activityApplication.findUnique({
    where: { id: applicationId },
    include: {
      activity: {
        include: {
          targetDepartments: true,
          targetMajors: true,
        },
      },
      student: {
        include: {
          studentProfile: true,
        },
      },
    },
  });

  if (!application) {
    throw new ApiError(404, "404_NOT_FOUND", "Application not found");
  }

  if (application.status !== "APPLIED" && application.status !== "REVISION_REQUIRED") {
    throw new ApiError(422, "422_INVALID_STATUS_TRANSITION", "Application is not pending");
  }

  await ensureCanReviewApplication(actor, application);

  return prisma.activityApplication.update({
    where: { id: applicationId },
    data: {
      status: "APPROVED",
      decidedById: actor.id,
      decidedAt: new Date(),
      remark,
    },
  });
}

export async function requestApplicationRevision(actor: Actor, applicationId: string, remark?: string) {
  const application = await prisma.activityApplication.findUnique({
    where: { id: applicationId },
    include: {
      activity: {
        include: {
          targetDepartments: true,
          targetMajors: true,
        },
      },
      student: {
        include: {
          studentProfile: true,
        },
      },
    },
  });

  if (!application) {
    throw new ApiError(404, "404_NOT_FOUND", "Application not found");
  }

  if (application.status !== "APPLIED") {
    throw new ApiError(422, "422_INVALID_STATUS_TRANSITION", "Application cannot request revision");
  }

  await ensureCanReviewApplication(actor, application);

  return prisma.activityApplication.update({
    where: { id: applicationId },
    data: {
      status: "REVISION_REQUIRED",
      decidedById: actor.id,
      decidedAt: new Date(),
      remark,
    },
  });
}

export async function approveRecord(actor: Actor, recordId: string, remark?: string) {
  const record = await prisma.studentActivityRecord.findUnique({
    where: { id: recordId },
    include: {
      student: {
        include: {
          studentProfile: true,
        },
      },
    },
  });

  if (!record || !record.student.studentProfile) {
    throw new ApiError(404, "404_NOT_FOUND", "Record not found");
  }

  if (record.status !== "SUBMITTED") {
    throw new ApiError(422, "422_INVALID_STATUS_TRANSITION", "Record is not submitted");
  }

  await ensureCanReviewRecord(
    actor,
    record.student.studentProfile.facultyId,
    record.student.studentProfile.departmentId,
  );

  return prisma.studentActivityRecord.update({
    where: { id: recordId },
    data: {
      status: "APPROVED",
      reviewedById: actor.id,
      reviewedAt: new Date(),
      remark,
    },
  });
}

export async function requestRecordRevision(actor: Actor, recordId: string, remark?: string) {
  const record = await prisma.studentActivityRecord.findUnique({
    where: { id: recordId },
    include: {
      student: {
        include: {
          studentProfile: true,
        },
      },
    },
  });

  if (!record || !record.student.studentProfile) {
    throw new ApiError(404, "404_NOT_FOUND", "Record not found");
  }

  if (record.status !== "SUBMITTED") {
    throw new ApiError(422, "422_INVALID_STATUS_TRANSITION", "Record is not submitted");
  }

  await ensureCanReviewRecord(
    actor,
    record.student.studentProfile.facultyId,
    record.student.studentProfile.departmentId,
  );

  return prisma.studentActivityRecord.update({
    where: { id: recordId },
    data: {
      status: "REVISION_REQUIRED",
      reviewedById: actor.id,
      reviewedAt: new Date(),
      remark,
      lockedWhenApproved: false,
    },
  });
}

export async function completeRecord(actor: Actor, recordId: string, remark?: string) {
  const record = await prisma.studentActivityRecord.findUnique({
    where: { id: recordId },
    include: {
      student: {
        include: {
          studentProfile: true,
        },
      },
    },
  });

  if (!record || !record.student.studentProfile) {
    throw new ApiError(404, "404_NOT_FOUND", "Record not found");
  }

  if (record.status !== "APPROVED") {
    throw new ApiError(422, "422_INVALID_STATUS_TRANSITION", "Record must be APPROVED before COMPLETED");
  }

  await ensureCanReviewRecord(
    actor,
    record.student.studentProfile.facultyId,
    record.student.studentProfile.departmentId,
  );

  return prisma.studentActivityRecord.update({
    where: { id: recordId },
    data: {
      status: "COMPLETED",
      reviewedById: actor.id,
      reviewedAt: new Date(),
      remark,
      lockedWhenApproved: true,
    },
  });
}
