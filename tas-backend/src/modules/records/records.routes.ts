import { UserRole } from "@prisma/client";
import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { requireRoles } from "../../middlewares/rbac.middleware";
import { validateBody } from "../../middlewares/validate.middleware";
import { createRecordSchema, updateRecordSchema } from "./records.schema";
import {
  createMyRecord,
  deleteMyRecord,
  listMyRecords,
  submitMyRecord,
  updateMyRecord,
} from "./records.service";

const router = Router();

router.use(authMiddleware, requireRoles(UserRole.STUDENT));

router.get("/", async (req, res, next) => {
  try {
    const records = await listMyRecords(req.user!.id);
    res.json(records);
  } catch (error) {
    next(error);
  }
});

router.post("/", validateBody(createRecordSchema), async (req, res, next) => {
  try {
    const record = await createMyRecord(req.user!.id, req.body);
    res.status(201).json(record);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", validateBody(updateRecordSchema), async (req, res, next) => {
  try {
    const record = await updateMyRecord(req.user!.id, req.params.id, req.body);
    res.json(record);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const result = await deleteMyRecord(req.user!.id, req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/:id/submit", async (req, res, next) => {
  try {
    const result = await submitMyRecord(req.user!.id, req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export { router as recordsRoutes };
