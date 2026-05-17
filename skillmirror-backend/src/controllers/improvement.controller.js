import { generatePlan } from "../services/openrouter.service.js";

export const generateImprovementPlan = async (req, res) => {
  try {
    const { skill, score, strengths, gaps } = req.body;

    if (!skill || !gaps || gaps.length === 0) {
      return res.status(400).json({ message: "Insufficient data" });
    }

    const plan = await generatePlan({ skill, score, strengths, gaps });

    res.json({ plan });
  } catch {
    res.status(500).json({ message: "Failed to generate improvement plan" });
  }
};
