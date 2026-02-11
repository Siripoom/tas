import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { activitiesRoutes } from "../modules/activities/activities.routes";
import { approvalsRoutes } from "../modules/approvals/approvals.routes";
import { recordsRoutes } from "../modules/records/records.routes";
import { filesRoutes } from "../modules/files/files.routes";
import { reportsRoutes } from "../modules/reports/reports.routes";
import { usersRoutes } from "../modules/users/users.routes";
import { adminRoutes } from "../modules/admin/admin.routes";
import { studentsRoutes } from "../modules/students/students.routes";
import { notificationsRoutes } from "../modules/notifications/notifications.routes";
import { departmentsRoutes } from "../modules/departments/departments.routes";
import { activityTypesRoutes } from "../modules/activity-types/activity-types.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/activities", activitiesRoutes);
router.use("/approvals", approvalsRoutes);
router.use("/students/me/records", recordsRoutes);
router.use("/students", studentsRoutes);
router.use("/files", filesRoutes);
router.use("/reports", reportsRoutes);
router.use("/users", usersRoutes);
router.use("/departments", departmentsRoutes);
router.use("/admin", adminRoutes);
router.use("/notifications", notificationsRoutes);
router.use("/activity-types", activityTypesRoutes);

export { router as apiRouter };
