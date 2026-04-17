import express from "express";
import {
  createTemple,
  getAllTemples,
  getTempleById,
} from "../controllers/temple.controller.js";

const router = express.Router();

// CREATE
router.post("/", createTemple);

// GET ALL
router.get("/", getAllTemples);

// GET SINGLE
router.get("/:id", getTempleById);

export default router;