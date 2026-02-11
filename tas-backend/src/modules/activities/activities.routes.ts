import { UserRole } from "@prisma/client";
import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { requireRoles } from "../../middlewares/rbac.middleware";
import { validateBody, validateQuery } from "../../middlewares/validate.middleware";
import {
  activitiesQuerySchema,
  createActivitySchema,
  updateActivitySchema,
} from "./activities.schema";
import {
  applyActivity,
  createActivity,
  deleteActivity,
  getActivityById,
  listMajorsForDepartment,
  listActivities,
  updateActivity,
} from "./activities.service";

const router = Router();

router.get("/", validateQuery(activitiesQuerySchema), async (req, res, next) => {
  try {
    const activities = await listActivities(req.query as any);
    res.json(activities);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/departments/:departmentId/majors",
  authMiddleware,
  requireRoles(
    UserRole.TEACHER,
    UserRole.DEPT_STAFF,
    UserRole.FACULTY_ADMIN,
    UserRole.SUPER_ADMIN,
  ),
  async (req, res, next) => {
    try {
      const majors = await listMajorsForDepartment(req.user!, req.params.departmentId);
      res.json(majors);
    } catch (error) {
      next(error);
    }
  },
);

router.get("/:id", async (req, res, next) => {
  try {
    const activity = await getActivityById(req.params.id);
    res.json(activity);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  authMiddleware,
  requireRoles(
    UserRole.TEACHER,
    UserRole.DEPT_STAFF,
    UserRole.FACULTY_ADMIN,
    UserRole.SUPER_ADMIN,
  ),
  validateBody(createActivitySchema),
  async (req, res, next) => {
    try {
      const activity = await createActivity(req.user!, req.body);
      res.status(201).json(activity);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  "/:id",
  authMiddleware,
  requireRoles(
    UserRole.TEACHER,
    UserRole.DEPT_STAFF,
    UserRole.FACULTY_ADMIN,
    UserRole.SUPER_ADMIN,
  ),
  validateBody(updateActivitySchema),
  async (req, res, next) => {
    try {
      const activity = await updateActivity(req.user!, req.params.id, req.body);
      res.json(activity);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  "/:id",
  authMiddleware,
  requireRoles(
    UserRole.TEACHER,
    UserRole.DEPT_STAFF,
    UserRole.FACULTY_ADMIN,
    UserRole.SUPER_ADMIN,
  ),
  async (req, res, next) => {
    try {
      const result = await deleteActivity(req.user!, req.params.id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/:id/apply",
  authMiddleware,
  requireRoles(UserRole.STUDENT),
  async (req, res, next) => {
    try {
      const result = await applyActivity(req.user!.id, req.params.id);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },
);

export { router as activitiesRoutes };
