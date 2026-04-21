import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  createTemple,
  getAllTemples,
  getTempleById,
  updateTemple,
  deleteTemple,
  getPopularTemples,
  getNearbyTemples,
} from "../controllers/temple.controller.js";

const router = express.Router();

// Public Routes
router.get("/", getAllTemples);
router.get("/popular", getPopularTemples);
router.get("/nearby", getNearbyTemples);
router.get("/:id", getTempleById);

// Protected Routes (Admin)
router.post("/", protect, createTemple);
router.put("/:id", protect, updateTemple);
router.delete("/:id", protect, deleteTemple);

export default router;