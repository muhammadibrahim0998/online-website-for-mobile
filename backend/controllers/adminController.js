import User from "../models/User.js";

// ✅ Super Admin: Add Shop Admin
export const addShopAdmin = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    const shopAdmin = await User.create({
      name,
      email,
      password,
      role: "shopadmin",
      phone: phone || "",
    });

    res.status(201).json({
      message: "Shop Admin created successfully!",
      shopAdmin: {
        _id: shopAdmin._id,
        name: shopAdmin.name,
        email: shopAdmin.email,
        role: shopAdmin.role,
      },
    });
  } catch (err) {
    console.error("Add Shop Admin Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Super Admin: Get all Shop Admins
export const getAllShopAdmins = async (req, res) => {
  try {
    const shopAdmins = await User.find({ role: "shopadmin" }).select("-password");
    res.json(shopAdmins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Super Admin: Delete Shop Admin
export const deleteShopAdmin = async (req, res) => {
  try {
    const admin = await User.findById(req.params.id);
    if (!admin || admin.role !== "shopadmin") {
      return res.status(404).json({ message: "Shop Admin not found" });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Shop Admin deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Super Admin: Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Super Admin: Get all orders (overview)
export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalShopAdmins = await User.countDocuments({ role: "shopadmin" });

    res.json({
      totalUsers,
      totalShopAdmins,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
