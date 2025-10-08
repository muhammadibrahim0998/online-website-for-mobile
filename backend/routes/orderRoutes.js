// routes/orderRoutes.js
import express from "express";
import { placeOrder, getOrders } from "../controllers/orderController.js";

const router = express.Router();

// 📝 Place Order
router.post("/", placeOrder);

// 📋 Get All Orders
router.get("/", getOrders);

export default router;
