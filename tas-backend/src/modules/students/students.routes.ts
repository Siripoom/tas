import { UserRole } from "@prisma/client";
import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { requireRoles } from "../../middlewares/rbac.middleware";
import { prisma } from "../../lib/prisma";

const router = Router();

router.get(
  "/me/progress",
  authMiddleware,
  requireRoles(UserRole.STUDENT),
  async (req, res, next) => {
    try {
      const [records, applications] = await Promise.all([
        prisma.studentActivityRecord.findMany({
          where: {
            studentUserId: req.user!.id,
            status: "COMPLETED",
          },
          select: { hours: true },
        }),
        prisma.activityApplication.findMany({
          where: {
            studentUserId: req.user!.id,
            status: "APPROVED",
          },
          include: {
            activity: {
              select: {
                hours: true,
              },
            },
          },
        }),
      ]);

      const completedRecordHours = records.reduce((sum, item) => sum + item.hours, 0);
      const approvedActivityHours = applications.reduce((sum, item) => sum + item.activity.hours, 0);
      const totalHours = completedRecordHours + approvedActivityHours;
      const targetHours = 60;

      res.json({
        totalHours,
        targetHours,
        percent: Math.min(100, Math.round((totalHours / targetHours) * 100)),
        breakdown: {
          completedRecordHours,
          approvedActivityHours,
        },
      });
    } catch (error) {
      next(error);
    }
  },
);

export { router as studentsRoutes };
