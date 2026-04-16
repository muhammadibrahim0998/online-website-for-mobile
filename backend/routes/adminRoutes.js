import express from "express";
import { protect, authorize } from "../middleware/auth.js";
import {
  addShopAdmin,
  getAllShopAdmins,
  deleteShopAdmin,
  getAllUsers,
  getAdminStats,
} from "../controllers/adminController.js";

const router = express.Router();

// All routes require superadmin role
router.use(protect, authorize("superadmin"));

router.post("/shop-admin", addShopAdmin);
router.get("/shop-admins", getAllShopAdmins);
router.delete("/shop-admin/:id", deleteShopAdmin);
router.get("/users", getAllUsers);
router.get("/stats", getAdminStats);

export default router;
