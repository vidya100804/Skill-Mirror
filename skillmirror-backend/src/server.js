/* eslint-disable no-undef */
/* eslint-env node */

import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 SkillMirror Backend running on port ${PORT}`);
});
