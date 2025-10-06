import express from "express";
import {
  addVivo,
  getAllVivo,
  deleteVivo,
} from "../controllers/vivoController.js";

const router = express.Router();

// POST → Add Vivo Product
router.post("/vivo", addVivo);

// GET → Get All Vivo Products
router.get("/vivo", getAllVivo);

// DELETE → Delete Vivo Product by ID
router.delete("/vivo/:id", deleteVivo);

export default router;
