import { buildContext } from "../context/buildContext.js";
import { generateResponse } from "../llm/generateResponse.js";
import { scorer } from "../retrieval/scorer.js";

function isVagueQuery(query) {
    return query.split(" ").length <= 3;
}

export async function handleQuery(req, res) {
    try {
        const { query } = req.body;

        if (!query) {
            return res.status(400).json({ error: "Query is required!"});
        }

        const { tokens, hasAction, results,  } = await scorer(query);

        const context = buildContext(query, tokens, results, hasAction);
        if (!context.candidates || context.candidates.length === 0 && isVagueQuery(query)) {
            return res.status(200).json({
                explaination: "Query is too vague. Showing overall project overview.",
                fallback: true,
            });
        }

        const llmResponse = await generateResponse(context);

        if (!llmResponse || !llmResponse.status) {
            return res.json({
                status: "error",
                explanation: "LLM failed to return valid response"
            });
        }

        if (llmResponse.status === "llm_error") return res.json(llmResponse);
        
        return res.status(200).json(llmResponse);
    } catch (err) {
        console.error("Query Error: ", err);
        return res.status(500).json({ error: "Internal Server Error"});
    }
}