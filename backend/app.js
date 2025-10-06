import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import iphoneRoutes from "./routes/iphoneRoutes.js";
import sumsingRoutes from "./routes/sumsingRoutes.js";
import vivoRoutes from "./routes/vivoRoutes.js";



dotenv.config();

const app = express();

// ✅ CORS setup
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/iphones", iphoneRoutes);
app.use("/api/sumsing", sumsingRoutes);
app.use("/api", vivoRoutes);





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
