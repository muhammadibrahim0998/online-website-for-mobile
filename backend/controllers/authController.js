import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ✅ Signup
export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check existing
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: { email: newUser.email },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // JWT token
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Logout
export const logout = (req, res) => {
  res.json({ message: "Logout successful (remove token on client)" });
};
