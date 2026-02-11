import { UserRole } from "@prisma/client";
import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { requireRoles } from "../../middlewares/rbac.middleware";
import { validateBody } from "../../middlewares/validate.middleware";
import { createUserSchema, updateUserSchema } from "./users.schema";
import { createUser, deleteUser, getUserById, listUsers, updateUser } from "./users.service";

const router = Router();

router.use(
  authMiddleware,
  requireRoles(UserRole.FACULTY_ADMIN, UserRole.SUPER_ADMIN),
);

router.get("/", async (req, res, next) => {
  try {
    const data = await listUsers(req.user!, {
      role: req.query.role as UserRole | undefined,
      status: req.query.status as any,
      departmentId: req.query.departmentId as string | undefined,
      facultyId: req.query.facultyId as string | undefined,
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const data = await getUserById(req.user!, req.params.id);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.post("/", validateBody(createUserSchema), async (req, res, next) => {
  try {
    const data = await createUser(req.user!, req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", validateBody(updateUserSchema), async (req, res, next) => {
  try {
    const data = await updateUser(req.user!, req.params.id, req.body);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const data = await deleteUser(req.user!, req.params.id);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

export { router as usersRoutes };
