import { UserRole } from "@prisma/client";
import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { requireRoles } from "../../middlewares/rbac.middleware";
import { validateBody } from "../../middlewares/validate.middleware";
import {
  importStaffSchema,
  importStudentsSchema,
  importTeachersSchema,
  resetPasswordSchema,
} from "./admin.schema";
import { importStaff, importStudents, importTeachers, resetUserPassword } from "./admin.service";

const router = Router();

router.use(authMiddleware, requireRoles(UserRole.FACULTY_ADMIN, UserRole.SUPER_ADMIN));

router.post("/import/students", validateBody(importStudentsSchema), async (req, res, next) => {
  try {
    const result = await importStudents(req.body.items);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/import/teachers", validateBody(importTeachersSchema), async (req, res, next) => {
  try {
    const result = await importTeachers(req.body.items);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/import/staff", validateBody(importStaffSchema), async (req, res, next) => {
  try {
    const result = await importStaff(req.body.items);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/users/:id/reset-password",
  validateBody(resetPasswordSchema),
  async (req, res, next) => {
    try {
      const result = await resetUserPassword(req.params.id, req.body.newPassword);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
);

export { router as adminRoutes };
