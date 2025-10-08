import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import iphoneRoutes from "./routes/iphoneRoutes.js";
import sumsingRoutes from "./routes/sumsingRoutes.js";
import vivoRoutes from "./routes/vivoRoutes.js";
import bodyParser from "body-parser";
import { placeOrder, getOrders } from "./controllers/orderController.js";
import orderRoutes from "./routes/orderRoutes.js";
dotenv.config();

const app = express();

// ✅ CORS setup
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/iphones", iphoneRoutes);
app.use("/api/sumsing", sumsingRoutes);
app.use("/api", vivoRoutes);
app.use("/api/orders", orderRoutes);
app.post("/api/orders", placeOrder);
app.get("/api/orders", getOrders);



app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// ✅ DB connect check
sequelize
  .authenticate()
  .then(() => console.log("Database connected ✅"))
  .catch((err) => console.log("Database error ❌", err));

  

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
