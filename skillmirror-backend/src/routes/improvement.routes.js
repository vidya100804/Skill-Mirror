import express from "express";
import { generateImprovementPlan } from "../controllers/improvement.controller.js";

const router = express.Router();

router.post("/generate", generateImprovementPlan);

export default router;
