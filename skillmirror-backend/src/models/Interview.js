import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    skill: { type: String, required: true },
    questions: { type: [String], required: true },
    answers: { type: [String], default: [] },
    currentIndex: { type: Number, default: 0 },
    totalQuestions: { type: Number, default: 5 },
    finished: { type: Boolean, default: false },
    result: {
      score: Number,          // 0–100
      strengths: [String],    // string[]
      gaps: [String],         // string[]
    },
  },
  { timestamps: true }
);

export default mongoose.model("Interview", interviewSchema);
