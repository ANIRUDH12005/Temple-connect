import express from "express";
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