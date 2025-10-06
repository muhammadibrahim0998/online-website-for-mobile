import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// POST /api/checkout
router.post("/checkout", async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalItems = items.reduce(
      (sum, item) => sum + (item.quantity || 1),
      0
    );
    const totalPrice = items.reduce(
      (sum, item) =>
        sum + (item.quantity || 1) * parseFloat(item.price.replace("$", "")),
      0
    );

    const order = await Order.create({ items, totalItems, totalPrice });

    res.status(201).json({ message: "Order placed successfully!", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Checkout failed" });
  }
});

// GET /api/orders  => view all orders
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.findAll({ order: [["id", "DESC"]] });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

export default router;
