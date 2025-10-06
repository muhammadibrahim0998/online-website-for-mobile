import express from "express";
import {
  addIphone,
  getAllIphones,
  getIphoneById,
} from "../controllers/iphoneController.js";

const router = express.Router();

router.post("/", addIphone); // Add product
router.get("/", getAllIphones); // Get all products
router.get("/:id", getIphoneById); // Get single product

export default router;
