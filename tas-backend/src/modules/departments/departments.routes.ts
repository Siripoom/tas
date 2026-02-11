import { UserRole } from "@prisma/client";
import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { requireRoles } from "../../middlewares/rbac.middleware";
import { validateBody, validateQuery } from "../../middlewares/validate.middleware";
import {
  createMajorSchema,
  createDepartmentSchema,
  listDepartmentsQuerySchema,
  updateMajorSchema,
  updateDepartmentSchema,
} from "./departments.schema";
import {
  createMajor,
  deleteMajor,
  createDepartment,
  deleteDepartment,
  getDepartmentById,
  listDepartments,
  listFaculties,
  listMajorsByDepartment,
  updateMajor,
  updateDepartment,
} from "./departments.service";

const router = Router();

router.use(authMiddleware, requireRoles(UserRole.FACULTY_ADMIN, UserRole.SUPER_ADMIN));

router.get("/faculties", async (req, res, next) => {
  try {
    const data = await listFaculties(req.user!);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/:id/majors", async (req, res, next) => {
  try {
    const data = await listMajorsByDepartment(req.user!, req.params.id);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.post("/:id/majors", validateBody(createMajorSchema), async (req, res, next) => {
  try {
    const data = await createMajor(req.user!, req.params.id, req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/majors/:majorId", validateBody(updateMajorSchema), async (req, res, next) => {
  try {
    const data = await updateMajor(req.user!, req.params.id, req.params.majorId, req.body);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id/majors/:majorId", async (req, res, next) => {
  try {
    const data = await deleteMajor(req.user!, req.params.id, req.params.majorId);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/", validateQuery(listDepartmentsQuerySchema), async (req, res, next) => {
  try {
    const data = await listDepartments(req.user!, {
      facultyId: req.query.facultyId as string | undefined,
      search: req.query.search as string | undefined,
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const data = await getDepartmentById(req.user!, req.params.id);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.post("/", validateBody(createDepartmentSchema), async (req, res, next) => {
  try {
    const data = await createDepartment(req.user!, req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", validateBody(updateDepartmentSchema), async (req, res, next) => {
  try {
    const data = await updateDepartment(req.user!, req.params.id, req.body);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const data = await deleteDepartment(req.user!, req.params.id);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

export { router as departmentsRoutes };
