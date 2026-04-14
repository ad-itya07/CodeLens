import { search } from "../retrieval/search.js";
import { getProject, getQuestions, saveQuestion } from "../db/database.js";
import { buildContext } from "../context/buildContext.js";
import { generateResponse } from "../llm/generateResponse.js";

function isVagueQuery(query) {
  return query.split(" ").length <= 3;
}

export async function handleQuery(req, res) {
  try {
    const { projectId, query } = req.body;

    if (!query || !projectId) {
      return res.status(400).json({ error: "Query and projectId are required!" });
    }

    const userId = req.user.id;

    const project = await getProject({ userId, projectId });

    const DATABASE = project.entries;

    if (!DATABASE || DATABASE.length === 0) {
      return res.status(500).json({ error: "Database not initialized" });
    }

    const results = await search(query, DATABASE, 5);

    if (results.length === 0 && isVagueQuery(query)) {
      return res.status(200).json({
        message: "Query too vague, no strong matches found",
        results: [],
      });
    }

    const {contextText, uiResults } = buildContext(query, results);

    const llmResponse = await generateResponse(query, contextText);
    // const llmResponse = { answer: "Yes", status: "ok"};

    // if (!llmResponse || !llmResponse.answer) {
    //   return res.json({
    //     status: "error",
    //     explanation: "LLM services are down please try again later"
    //   });
    // }

    if (llmResponse.status === "insufficient_context") {
      return res.status(200).json({
        answer: llmResponse.answer,
        codeResults: uiResults,
        fallback: true
      })
    }
    if (llmResponse.status === "llm_error") {
      return res.json({
        status: "error",
        explanation: llmResponse.explanation
      });
    }

    return res.status(200).json({
      answer: llmResponse.answer,
      codeResults: uiResults,
    });

  } catch (err) {
    console.error("Query Error: ", err);
    return res.status(500).json({
      message: "Internal Server Error", err: {
        message: err.message,
        code: err.code,
        stack: err.stack,
      }
    });
  }
}

export async function saveQuery(req, res) {
  const { projectId, query, answer, codeResults } = req.body;
  const userId = req.user.id;
  try {
    const question = await saveQuestion({ userId, projectId, query, answer, codeResults });
    return res.status(200).json({
      success: true,
      question,
    });
  } catch (err) {
    console.error("Prisma Error in saveQuery:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err
    });
  }
}

export async function getQueries(req, res) {
  const userId = req.user.id;

  try {
    const questions = await getQuestions({ userId });
    return res.status(200).json({
      success: true,
      questions,
    });
  } catch (err) {
    console.error("Prisma Error in getQueries:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err
    });
  }
}