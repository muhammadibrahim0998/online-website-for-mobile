import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import Stripe from "stripe";
import nodemailer from "nodemailer";

dotenv.config();

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// 📝 Request Logger (For debugging P2P transfers)
app.use((req, res, next) => {
  console.log(`📡 [${new Date().toISOString()}] ${req.method} ${req.url}`);
  if (req.method === 'POST') console.log('📦 Body:', req.body);
  next();
});
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Connect to MongoDB
connectDB();

// 🟡 Stripe Setup
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// 💳 Create Payment Intent (Real Stripe Integration)
app.post("/api/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body;
    console.log(`💳 Processing Payment Intent: ${amount} cents`);
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // in cents, e.g., 1000 = Rs. 10.00
      currency: "pkr",
      automatic_payment_methods: { enabled: true },
    });

    console.log("✅ Payment Intent Created:", paymentIntent.id);
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("❌ Stripe Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// 🩺 Health Check (To verify server is reachable)
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is healthy and routes are registered." });
});


// ✉️ Nodemailer setup
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// 🧾 Order + Email Route
app.post("/api/order-email", async (req, res) => {
  try {
    const { customer, items, total } = req.body;

    const html = `
      <h2>New Order Received 🛒</h2>
      <p><strong>Name:</strong> ${customer.name}</p>
      <p><strong>Email:</strong> ${customer.email}</p>
      <p><strong>Total:</strong> Rs.{total}</p>
      <hr/>
      <h3>Items:</h3>
      <ul>
        ${items
          .map(
            (item) =>
              `<li>${item.name} - Rs.{item.price} x ${item.quantity || 1}</li>`
          )
          .join("")}
      </ul>
    `;

    await transporter.sendMail({
      from: `"MobiZone Shop" <${process.env.SMTP_USER}>`,
      to: customer.email,
      subject: "Order Confirmation ✅",
      html,
    });

    res.status(200).json({ message: "Order email sent ✅" });
  } catch (err) {
    console.error("❌ Email Error:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("🚀 MobiZone Backend is running with MongoDB...");
});

// ✅ Auto-seed Super Admin on startup
const seedSuperAdmin = async () => {
  try {
    const User = (await import("./models/User.js")).default;
    const existing = await User.findOne({ email: process.env.SUPER_ADMIN_EMAIL });
    if (!existing) {
      await User.create({
        name: "Super Admin",
        email: process.env.SUPER_ADMIN_EMAIL,
        password: process.env.SUPER_ADMIN_PASSWORD,
        role: "superadmin",
      });
      console.log("✅ Super Admin auto-created:", process.env.SUPER_ADMIN_EMAIL);
    }
  } catch (err) {
    console.log("⚠️ Super Admin seed:", err.message);
  }
};

// Small delay to ensure DB connected before seeding
setTimeout(seedSuperAdmin, 2000);

// ✅ Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
