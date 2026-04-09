import { buildContext } from "../context/buildContext.js";
import { scorer } from "../retrieval/scorer.js";

export async function handleQuery(req, res) {
    try {
        const { query } = req.body;

        if (!query) {
            return res.status(400).json({ error: "Query is required!"});
        }

        const { tokens, hasAction, results,  } = await scorer(query);

        const context = buildContext(query, tokens, results, hasAction);
        
        return res.status(200).json({
            status: "debugged_context",
            context
        })
    } catch (err) {
        console.error("Query Error: ", err);
        return res.status(500).json({ error: "Internal Server Error"});
    }
}