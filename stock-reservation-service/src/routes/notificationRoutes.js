import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getNotifications, markNotificationRead, markAllNotificationsRead } from "../controllers/notificationController.js";

const router = Router();
router.use(protect);
router.get("/", getNotifications);
router.patch("/:id/read", markNotificationRead);
router.patch("/read-all", markAllNotificationsRead);
export default router;
