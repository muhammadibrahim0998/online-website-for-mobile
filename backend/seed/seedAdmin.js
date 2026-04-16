import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const seedSuperAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Check if super admin already exists
    const existingAdmin = await User.findOne({ email: process.env.SUPER_ADMIN_EMAIL });

    if (existingAdmin) {
      console.log("⚠️ Super Admin already exists:", existingAdmin.email);
    } else {
      const superAdmin = await User.create({
        name: "Super Admin",
        email: process.env.SUPER_ADMIN_EMAIL,
        password: process.env.SUPER_ADMIN_PASSWORD,
        role: "superadmin",
      });
      console.log("✅ Super Admin created successfully!");
      console.log("   Email:", superAdmin.email);
      console.log("   Role:", superAdmin.role);
    }

    await mongoose.disconnect();
    console.log("✅ Done!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed Error:", error);
    process.exit(1);
  }
};

seedSuperAdmin();
