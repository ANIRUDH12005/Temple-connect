import express from "express";
import { createTemple } from "../controllers/temple.controller.js";

const router = express.Router();

// POST /api/temples
router.post("/", createTemple);

export default router;