// controllers/orderController.js
import Order from "../models/ModelOrder.js";

// 📝 Order Save کول
export const placeOrder = async (req, res) => {
  try {
    const { customerName, customerEmail, totalAmount, items } = req.body;

    if (!customerName || !customerEmail || !totalAmount || !items) {
      return res.status(400).json({ message: "ټول فیلډونه ضروري دي." });
    }

    const order = await Order.create({
      customerName,
      customerEmail,
      totalAmount,
      items,
    });

    res.status(201).json({ message: "✅ Order په کامیابۍ Save شو", order });
  } catch (error) {
    console.error("❌ د Order Save کولو کې ستونزه:", error);
    res.status(500).json({ message: "د سرور ستونزه" });
  }
};

// 📋 د ټولو Orderونو راوړل (Admin لپاره)
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ order: [["createdAt", "DESC"]] });
    res.json(orders);
  } catch (error) {
    console.error("❌ د Orderونو راوړلو کې ستونزه:", error);
    res.status(500).json({ message: "د سرور ستونزه" });
  }
};
