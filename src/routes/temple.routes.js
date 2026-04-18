import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  createTemple,
  getAllTemples,
  getTempleById,
  updateTemple,
  deleteTemple,
} from "../controllers/temple.controller.js";

const router = express.Router();

// CREATE
router.post("/", createTemple);

// GET ALL
router.get("/", getAllTemples);

// GET SINGLE
router.get("/:id", getTempleById);

// UPDATE
router.put("/:id", updateTemple);

// DELETE
router.delete("/:id", deleteTemple);

export default router;

// CREATE (Protected)
router.post("/", protect, createTemple);

// UPDATE (Protected)
router.put("/:id", protect, updateTemple);

// DELETE (Protected)
router.delete("/:id", protect, deleteTemple);