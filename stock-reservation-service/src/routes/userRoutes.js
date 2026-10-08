import { Router } from "express";
import { getUsers, getUser, updateUserRole, deleteUser } from "../controllers/userController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = Router();
router.use(protect);
router.get("/", authorize("admin", "manager"), getUsers);
router.get("/:id", authorize("admin", "manager"), getUser);
router.patch("/:id/role", authorize("admin"), updateUserRole);
router.delete("/:id", authorize("admin"), deleteUser);
export default router;
