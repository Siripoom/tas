import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { listMyNotifications, markNotificationRead } from "./notifications.service";

const router = Router();

router.use(authMiddleware);

router.get("/me", async (req, res, next) => {
  try {
    const data = await listMyNotifications(req.user!.id);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/read", async (req, res, next) => {
  try {
    const result = await markNotificationRead(req.user!.id, req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export { router as notificationsRoutes };
