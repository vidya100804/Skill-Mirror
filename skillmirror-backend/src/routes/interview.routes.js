import express from "express";
import {
  startInterview,
  submitAnswer,
} from "../controllers/interview.controller.js";


const router = express.Router();

router.post("/start", startInterview);
router.post("/answer", submitAnswer);
 
export default router;
