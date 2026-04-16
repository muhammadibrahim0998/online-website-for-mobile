import Order from "../models/ModelOrder.js";

// ✅ Place Order (any user or guest)
export const placeOrder = async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      totalAmount,
      items,
      shippingAddress,
      paymentMethod,
      stripePaymentId,
      transactionId,
    } = req.body;

    if (!totalAmount || !items) {
      return res.status(400).json({ message: "Amount and items are required" });
    }

    // Default values if missing (for P2P simulation)
    const finalName = customerName || "P2P Customer";
    const finalEmail = customerEmail || "guest@mobizone.pk";
    const finalAddress = shippingAddress || "Local Pickup / P2P Delivery";

    const order = await Order.create({
      user: req.user ? req.user._id : null,
      customerName: finalName,
      customerEmail: finalEmail,
      items,
      totalAmount,
      shippingAddress: finalAddress,
      paymentMethod: paymentMethod || "P2P Transfer",
      paymentStatus: (stripePaymentId || transactionId) ? "paid" : "pending",
      transactionId: transactionId || stripePaymentId || null,
    });

    res.status(201).json({ message: "✅ Order placed successfully!", order });
  } catch (error) {
    console.error("❌ Order Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get all orders (Admin)
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).populate("user", "name email");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get my orders (User)
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update order status (Admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = req.body.orderStatus || order.orderStatus;
    order.paymentStatus = req.body.paymentStatus || order.paymentStatus;
    await order.save();

    res.json({ message: "Order updated!", order });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔄 Simulated P2P Transfer (Via Webhook logic)
export const simulatedTransfer = async (req, res) => {
  try {
    const { senderCard, receiverAccount, amount, senderName } = req.body;
    
    console.log("-----------------------------------------");
    console.log("🚀 SIMULATED P2P TRANSFER INITIATED (Controller)");
    console.log(`👤 Sender: ${senderName}`);
    console.log(`💳 From Card: ${senderCard}`);
    console.log(`📥 To Account/Card: ${receiverAccount}`);
    console.log(`💰 Amount: Rs. ${amount}`);
    console.log("📡 Status: Processing via Webhook simulation...");
    
    // Simulate some "hook" delay
    setTimeout(() => {
      console.log("✅ Webhook Response: Transfer Completed Successfully!");
      console.log("-----------------------------------------");
    }, 1000);

    res.status(200).json({ 
      success: true, 
      message: "Transfer successful",
      transactionId: "TXN-" + Math.random().toString(36).substr(2, 9).toUpperCase()
    });
  } catch (err) {
    res.status(500).json({ error: "Transfer simulation failed" });
  }
};
