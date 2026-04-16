import express from "express";
import { protect, authorize } from "../middleware/auth.js";
import multer from "multer";
import path from "path";
import {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getMyProducts,
} from "../controllers/productController.js";

const router = express.Router();

// 📂 Multer Configuration for Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Public routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Shop Admin only routes
router.post(
  "/",
  protect,
  authorize("shopadmin", "superadmin"),
  upload.single("image"),
  addProduct
);
router.put(
  "/:id",
  protect,
  authorize("shopadmin", "superadmin"),
  upload.single("image"),
  updateProduct
);
router.delete("/:id", protect, authorize("shopadmin", "superadmin"), deleteProduct);
router.get("/admin/my-products", protect, authorize("shopadmin", "superadmin"), getMyProducts);

export default router;
