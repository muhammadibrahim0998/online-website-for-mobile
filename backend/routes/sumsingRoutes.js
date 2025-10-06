import express from "express";
import {
  getAllSumsing,
  addSumsingProduct,
} from "../controllers/sumsingController.js";

const router = express.Router();

router.get("/", getAllSumsing);
router.post("/", addSumsingProduct);

export default router;
