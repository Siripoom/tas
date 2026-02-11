import { UserRole } from "@prisma/client";
import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { requireRoles } from "../../middlewares/rbac.middleware";
import { validateBody, validateQuery } from "../../middlewares/validate.middleware";
import {
  createActivityTypeSchema,
  listActivityTypesQuerySchema,
  updateActivityTypeSchema,
} from "./activity-types.schema";
import {
  createActivityType,
  deleteActivityType,
  getActivityTypeById,
  listActivityTypes,
  updateActivityType,
} from "./activity-types.service";

const router = Router();

router.use(authMiddleware);

router.get(
  "/",
  requireRoles(
    UserRole.STUDENT,
    UserRole.TEACHER,
    UserRole.DEPT_STAFF,
    UserRole.FACULTY_ADMIN,
    UserRole.SUPER_ADMIN,
  ),
  validateQuery(listActivityTypesQuerySchema),
  async (req, res, next) => {
    try {
      const data = await listActivityTypes({
        search: req.query.search as string | undefined,
      });
      res.json(data);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  "/:id",
  requireRoles(
    UserRole.STUDENT,
    UserRole.TEACHER,
    UserRole.DEPT_STAFF,
    UserRole.FACULTY_ADMIN,
    UserRole.SUPER_ADMIN,
  ),
  async (req, res, next) => {
    try {
      const data = await getActivityTypeById(req.params.id);
      res.json(data);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/",
  requireRoles(UserRole.FACULTY_ADMIN, UserRole.SUPER_ADMIN),
  validateBody(createActivityTypeSchema),
  async (req, res, next) => {
    try {
      const data = await createActivityType(req.body);
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  "/:id",
  requireRoles(UserRole.FACULTY_ADMIN, UserRole.SUPER_ADMIN),
  validateBody(updateActivityTypeSchema),
  async (req, res, next) => {
    try {
      const data = await updateActivityType(req.params.id, req.body);
      res.json(data);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  "/:id",
  requireRoles(UserRole.FACULTY_ADMIN, UserRole.SUPER_ADMIN),
  async (req, res, next) => {
    try {
      const data = await deleteActivityType(req.params.id);
      res.json(data);
    } catch (error) {
      next(error);
    }
  },
);

export { router as activityTypesRoutes };
