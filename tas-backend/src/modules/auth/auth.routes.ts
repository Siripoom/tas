import { Router } from "express";
import { validateBody } from "../../middlewares/validate.middleware";
import {
  changePasswordSchema,
  loginSchema,
  refreshSchema,
  registerStudentSchema,
} from "./auth.schema";
import { authMiddleware } from "../../middlewares/auth.middleware";
import {
  changePassword,
  login,
  refreshAccessToken,
  registerStudent,
} from "./auth.service";

const router = Router();

router.post("/login", validateBody(loginSchema), async (req, res, next) => {
  try {
    const result = await login(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/refresh", validateBody(refreshSchema), async (req, res, next) => {
  try {
    const result = await refreshAccessToken(req.body.refreshToken);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/change-password",
  authMiddleware,
  validateBody(changePasswordSchema),
  async (req, res, next) => {
    try {
      const result = await changePassword(req.user!.id, req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/register-student",
  validateBody(registerStudentSchema),
  async (req, res, next) => {
    try {
      const result = await registerStudent(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },
);

export { router as authRoutes };
