import { GoogleGenerativeAI } from "@google/generative-ai"; // Updated import
import { buildPrompt } from "./promptBuilder.js";
import { safeParse } from "../utils/llm/safeParse.js";
import { handleMError } from "../utils/llm/handleMeError.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateResponse(context) {
  try {
    const prompt = buildPrompt(context);

    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });


    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return safeParse(text);
  } catch (err) {
    console.error("GEMINI Error: ", err);
    return handleMError(err);
  }
}