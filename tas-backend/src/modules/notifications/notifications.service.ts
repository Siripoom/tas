import { NotificationType, Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";

export async function listMyNotifications(userId: string) {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 100,
  });
}

export async function markNotificationRead(userId: string, notificationId: string) {
  return prisma.notification.updateMany({
    where: {
      id: notificationId,
      userId,
    },
    data: {
      readAt: new Date(),
    },
  });
}

async function createUniqueNotification(params: {
  userId: string;
  type: NotificationType;
  payload: Record<string, unknown>;
}) {
  const jsonPayload = params.payload as Prisma.InputJsonValue;
  const key = JSON.stringify(params.payload);
  const exists = await prisma.notification.findFirst({
    where: {
      userId: params.userId,
      type: params.type,
      payload: {
        equals: jsonPayload,
      },
      createdAt: {
        gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
    },
  });

  if (exists) return;

  await prisma.notification.create({
    data: {
      userId: params.userId,
      type: params.type,
      payload: jsonPayload,
    },
  });

  return key;
}

export async function generateScheduledNotifications() {
  const now = new Date();
  const in48Hours = new Date(Date.now() + 48 * 60 * 60 * 1000);

  const [activities, students] = await Promise.all([
    prisma.activity.findMany({
      where: {
        status: "OPEN_REGISTRATION",
        startAt: {
          gte: now,
          lte: in48Hours,
        },
      },
      include: {
        targetDepartments: true,
        targetMajors: true,
      },
    }),
    prisma.user.findMany({
      where: {
        role: "STUDENT",
        status: "ACTIVE",
      },
      include: {
        studentProfile: true,
      },
    }),
  ]);

  for (const activity of activities) {
    const scopedStudents = students.filter((student) => {
      if (!student.studentProfile) return false;

      const hasTargetDepartments = activity.targetDepartments.length > 0;
      const hasTargetMajors = activity.targetMajors.length > 0;

      if (hasTargetDepartments) {
        const deptSet = new Set(activity.targetDepartments.map((item) => item.departmentId));
        if (!deptSet.has(student.studentProfile.departmentId)) {
          return false;
        }
      } else if (activity.ownerScope === "FACULTY") {
        if (student.studentProfile.facultyId !== activity.ownerFacultyId) {
          return false;
        }
      } else if (student.studentProfile.departmentId !== activity.ownerDepartmentId) {
        return false;
      }

      if (hasTargetMajors) {
        const majorSet = new Set(activity.targetMajors.map((item) => item.majorId));
        return majorSet.has(student.studentProfile.majorId);
      }

      return true;
    });

    for (const student of scopedStudents) {
      await createUniqueNotification({
        userId: student.id,
        type: NotificationType.ACTIVITY_NEAR_DUE,
        payload: {
          activityId: activity.id,
          activityTitle: activity.title,
          startAt: activity.startAt.toISOString(),
        },
      });

      const joined = await prisma.activityApplication.findUnique({
        where: {
          activityId_studentUserId: {
            activityId: activity.id,
            studentUserId: student.id,
          },
        },
      });

      if (!joined) {
        await createUniqueNotification({
          userId: student.id,
          type: NotificationType.ACTIVITY_NOT_JOINED,
          payload: {
            activityId: activity.id,
            activityTitle: activity.title,
          },
        });
      }
    }
  }
}
