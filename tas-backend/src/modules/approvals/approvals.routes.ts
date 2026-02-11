import { UserRole } from "@prisma/client";
import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { requireRoles } from "../../middlewares/rbac.middleware";
import { validateBody } from "../../middlewares/validate.middleware";
import { approvalActionSchema, revisionActionSchema } from "./approvals.schema";
import {
  approveApplication,
  approveRecord,
  completeRecord,
  getPendingApprovals,
  requestApplicationRevision,
  requestRecordRevision,
} from "./approvals.service";

const router = Router();

const approverRoles = [
  UserRole.TEACHER,
  UserRole.DEPT_STAFF,
  UserRole.FACULTY_ADMIN,
  UserRole.SUPER_ADMIN,
] as const;

router.get(
  "/pending",
  authMiddleware,
  requireRoles(...approverRoles),
  async (req, res, next) => {
    try {
      const data = await getPendingApprovals(req.user!);
      res.json(data);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/:applicationId/approve",
  authMiddleware,
  requireRoles(...approverRoles),
  validateBody(approvalActionSchema),
  async (req, res, next) => {
    try {
      const result = await approveApplication(req.user!, req.params.applicationId, req.body.remark);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/:applicationId/request-revision",
  authMiddleware,
  requireRoles(...approverRoles),
  validateBody(revisionActionSchema),
  async (req, res, next) => {
    try {
      const result = await requestApplicationRevision(
        req.user!,
        req.params.applicationId,
        req.body.remark,
      );
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/records/:recordId/approve",
  authMiddleware,
  requireRoles(...approverRoles),
  validateBody(approvalActionSchema),
  async (req, res, next) => {
    try {
      const result = await approveRecord(req.user!, req.params.recordId, req.body.remark);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/records/:recordId/request-revision",
  authMiddleware,
  requireRoles(...approverRoles),
  validateBody(revisionActionSchema),
  async (req, res, next) => {
    try {
      const result = await requestRecordRevision(req.user!, req.params.recordId, req.body.remark);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/records/:recordId/complete",
  authMiddleware,
  requireRoles(...approverRoles),
  validateBody(approvalActionSchema),
  async (req, res, next) => {
    try {
      const result = await completeRecord(req.user!, req.params.recordId, req.body.remark);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
);

export { router as approvalsRoutes };
