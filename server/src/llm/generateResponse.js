import 'dotenv/config'
import { GoogleGenerativeAI } from "@google/generative-ai";
import Groq from "groq-sdk";
import { buildPrompt } from "./promptBuilder.js";
import { safeParse } from "../utils/llm/safeParse.js";
import { handleMError } from "../utils/llm/handleMeError.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function generateWithGemini(prompt) {
  const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

async function generateWithGroq(prompt) {
  const result = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content: `You are a senior engineer. Always respond with valid JSON only. No markdown, no backticks, just raw JSON.
        The JSON must have exactly this shape:
{ "status": "ok", "answer": "your answer as a plain string here" }
IMPORTANT: "answer" must ALWAYS be a plain string. Never an array. Never an object. Always a string.`
      },
      {
        role: "user",
        content: prompt
      }
    ],
    response_format: { type: "json_object" }
  });
  return result.choices[0].message.content;
}

export async function generateResponse(query, context) {
  try {
    const prompt = buildPrompt({ query, contextText: context });

    let text;
    try {
      text = await generateWithGemini(prompt);
    } catch (geminiErr) {
      const isGeoBlocked =
        geminiErr?.status === 400 ||
        geminiErr?.message?.includes("location is not supported") ||
        geminiErr?.message?.includes("quota");

      if (isGeoBlocked) {
        console.warn("Gemini blocked (geo/quota), falling back to Groq...");
        text = await generateWithGroq(prompt);
      } else {
        throw geminiErr;
      }
    }

    return safeParse(text);
  } catch (err) {
    console.error("LLM Error: ", err);
    return handleMError(err);
  }
}