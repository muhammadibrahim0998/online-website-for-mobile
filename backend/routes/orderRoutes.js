import express from "express";
import { protect, authorize } from "../middleware/auth.js";
import {
  placeOrder,
  getOrders,
  getMyOrders,
  updateOrderStatus,
  simulatedTransfer,
} from "../controllers/orderController.js";

const router = express.Router();

// User: place order (optionally authenticated)
router.post("/", async (req, res, next) => {
  // Try to authenticate, but don't block if no token
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      const jwt = await import("jsonwebtoken");
      const User = (await import("../models/User.js")).default;
      const decoded = jwt.default.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
    }
  } catch (e) {
    // Continue without user
  }
  next();
}, placeOrder);

// User: get my orders
router.get("/my-orders", protect, getMyOrders);

// Admin: get all orders
router.get("/", protect, authorize("superadmin", "shopadmin"), getOrders);

// Admin: update order status
router.put("/:id", protect, authorize("superadmin", "shopadmin"), updateOrderStatus);

// P2P: simulated transfer
router.post("/simulated-transfer", simulatedTransfer);

export default router;
