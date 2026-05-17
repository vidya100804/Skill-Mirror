/* eslint-disable no-undef */
/* eslint-env node */

import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const MODEL = "google/gemini-2.5-flash";

function getOpenRouterApiKey() {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is missing");
  }

  return apiKey;
}

// --------------------------------------------------
//  Helper: Clean & Parse JSON safely
// --------------------------------------------------
function safeJsonParse(raw) {
  if (!raw) throw new Error("Empty response from OpenRouter");

  const cleaned = raw
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    console.error(" OpenRouter returned invalid JSON:");
    console.error(cleaned);
    throw new Error("Invalid JSON returned by OpenRouter");
  }
}

// --------------------------------------------------
//  Generate Interview Questions
// --------------------------------------------------
export async function generateQuestions(skill, count = 5) {
  const prompt = `
Generate exactly ${count} professional interview questions for ${skill}.

STRICT RULES:
- Return ONLY a raw JSON object
- DO NOT use markdown formatting (no triple backticks, no \`\`\`json)
- DO NOT include any introductory or concluding text
- Each question must be a short, clear, realistic interview question

JSON Format:
{
  "questions": [
    "Question 1 text...",
    "Question 2 text...",
    "Question 3 text...",
    "Question 4 text...",
    "Question 5 text..."
  ]
}
`;

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getOpenRouterApiKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4,
      max_tokens: 400,
    }),
  });

  const data = await res.json();
  console.log("OPENROUTER RESPONSE:", JSON.stringify(data));
  const raw = data?.choices?.[0]?.message?.content?.trim() || "";

  try {
    const parsed = safeJsonParse(raw);
    if (parsed && Array.isArray(parsed.questions)) {
      return parsed.questions;
    }
  } catch (err) {
    console.error("Failed to parse JSON questions, falling back to line split:", err);
  }

  // Fallback to line splitting in case LLM ignored JSON rules
  return raw
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .split("\n")
    .map((q) => q.replace(/^\d+\.\s*/, "").trim()) // Remove any number prefixes like "1. "
    .filter((q) => q.length > 10 && !q.includes("{") && !q.includes("}"));
}

// --------------------------------------------------
//  Evaluate Interview Answers
// --------------------------------------------------
export async function evaluateInterview(skill, qaPairs) {
  const prompt = `
Evaluate the following ${skill} interview.

STRICT RULES:
- Return ONLY raw JSON
- DO NOT use markdown
- DO NOT wrap in triple backticks
- DO NOT add explanation text

JSON format:
{
  "score": number between 0 and 100,
  "strengths": string[],
  "gaps": string[]
}

Interview Q&A:
${qaPairs
  .map((x, i) => `Question ${i + 1}: ${x.q}\nAnswer ${i + 1}: ${x.a}`)
  .join("\n\n")}
`;

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getOpenRouterApiKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
      max_tokens: 500,
    }),
  });

  const data = await res.json();
  const raw = data?.choices?.[0]?.message?.content?.trim();

  return safeJsonParse(raw);
}

// --------------------------------------------------
//  Generate Improvement Plan
// --------------------------------------------------
export async function generatePlan({ skill, score, strengths, gaps }) {
  const prompt = `
You are an expert technical mentor.

Create a detailed improvement plan for a ${skill} interview candidate.

Candidate profile:
- Score: ${score}/100
- Strengths: ${strengths.join(", ")}
- Weak areas: ${gaps.join(", ")}

Rules:
- Return ONLY valid JSON
- No markdown
- No explanations outside JSON
- Output an array called "plan"
- Each plan item must include:
  - title
  - priority (High / Medium / Low)
  - why (1 sentence)
  - actions (array of 3 short steps)
  - practice (1 practical task)
  - time (estimated effort)
  - impact (confidence improvement)

JSON format:
{
  "plan": [ ... ]
}
`;

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getOpenRouterApiKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.35,
      max_tokens: 2500,
    }),
  });

  const data = await res.json();
  let raw = data.choices[0].message.content.trim();

  if (raw.startsWith("```")) {
    raw = raw.replace(/```json|```/g, "").trim();
  }

  return JSON.parse(raw).plan;
}
