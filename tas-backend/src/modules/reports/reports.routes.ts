import { UserRole } from "@prisma/client";
import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { requireRoles } from "../../middlewares/rbac.middleware";
import {
  buildAdminReportXlsx,
  buildDepartmentReportXlsx,
  buildStudentReportPdf,
} from "./reports.service";

const router = Router();

router.get(
  "/student/me.pdf",
  authMiddleware,
  requireRoles(UserRole.STUDENT),
  async (req, res, next) => {
    try {
      const pdf = await buildStudentReportPdf(req.user!.id);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=student-report.pdf");
      res.send(pdf);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  "/department.xlsx",
  authMiddleware,
  requireRoles(
    UserRole.TEACHER,
    UserRole.DEPT_STAFF,
    UserRole.FACULTY_ADMIN,
    UserRole.SUPER_ADMIN,
  ),
  async (req, res, next) => {
    try {
      const xlsx = await buildDepartmentReportXlsx(req.user!, {
        year: req.query.year as string | undefined,
        classYear: req.query.classYear as string | undefined,
        major: req.query.major as string | undefined,
      });
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      );
      res.setHeader("Content-Disposition", "attachment; filename=department-report.xlsx");
      res.send(Buffer.from(xlsx));
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  "/admin.xlsx",
  authMiddleware,
  requireRoles(UserRole.FACULTY_ADMIN, UserRole.SUPER_ADMIN),
  async (req, res, next) => {
    try {
      const xlsx = await buildAdminReportXlsx({
        departmentId: req.query.department as string | undefined,
        majorId: req.query.major as string | undefined,
        status: req.query.status as string | undefined,
        activityId: req.query.activity as string | undefined,
        dateFrom: req.query.dateFrom as string | undefined,
        dateTo: req.query.dateTo as string | undefined,
        classYear: req.query.classYear as string | undefined,
        academicYear: req.query.academicYear as string | undefined,
      });
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      );
      res.setHeader("Content-Disposition", "attachment; filename=admin-report.xlsx");
      res.send(Buffer.from(xlsx));
    } catch (error) {
      next(error);
    }
  },
);

export { router as reportsRoutes };
