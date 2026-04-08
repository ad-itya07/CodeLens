import { scorer } from "../retrieval/scorer.js";

export async function handleQuery(req, res) {
    try {
        const { query } = req.body;

        if (!query) {
            return res.status(400).json({ error: "Query is required!"});
        }

        const results = await scorer(query);
        
        return res.status(200).json({
            success: true,
            count: results.length,
            results
        })
    } catch (err) {
        console.error("Query Error: ", err);
        return res.status(500).json({ error: "Internal Server Error"});
    }
}