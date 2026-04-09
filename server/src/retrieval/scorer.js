import { getDatabase } from "../db/database.js";
import { ACTION_WORDS, CONCEPTUAL_WORDS } from "../lib/wordLists.js";
import { getSimilarity } from "../utils/getSimilarity.js";
import tokenize, { generateNonActionTokens } from "./tokenizer.js";

export async function scorer(query) {
    const tokens = tokenize(query);

    const NON_ACTION_TOKENS = generateNonActionTokens(tokens);

    const hasAction = tokens.some(t => ACTION_WORDS.has(t.word));

    const result = [];

    const isConceptualQuery = tokens.some(t => CONCEPTUAL_WORDS.has(t.word));

    const DATABASE = getDatabase()
    DATABASE.forEach(dataset => {
        let matchScore = 0;
        // console.log(dataset.nameTokens)

        // MAIN matching and check if action words matched or not
        let matchedTokens = new Set();
        let matchedAction = false;
        tokens.forEach(token => {
            let word = token.word;

            if (dataset.nameTokens.includes(word)) {
                if (ACTION_WORDS.has(word)) {
                    matchScore += token.type === "original" ? 7 : "expanded_synonym" ? 4 : 2;
                    matchedAction = true;
                } else {
                    matchScore += token.type === "original" ? 5 : "expanded_synonym" ? 3 : 1.5;
                }
                matchedTokens.add(token.word);
            }

            else if (dataset.normalizedNameTokens && dataset.normalizedNameTokens.includes(word)) {
                if (ACTION_WORDS.has(word)) {
                    matchScore += token.type === "original" ? 3 : "expanded_synonym" ? 2 : 1;
                    matchedAction = true;
                } else {
                    matchScore += token.type === "original" ? 2 : "expanded_synonym" ? 1 : 0.5;
                }
                matchedTokens.add(token.word);
            }

            else {
                // Fuzzy match
                let bestSimilarity = 0;

                dataset.nameTokens.forEach(nameToken => {
                    const sim = getSimilarity(nameToken, word);
                    if (sim > bestSimilarity) bestSimilarity = sim;
                });
                
                if (bestSimilarity > 0.8) matchScore += 0.9;
                else if (bestSimilarity > 0.6) matchScore += 0.4;

                if (bestSimilarity > 0.6) matchedTokens.add(token.word);
            }

            if (dataset.fileTokens.includes(word)) {
                matchScore+=1;
                matchedTokens.add(token.word);
            }
            if (dataset.code.toLowerCase().includes(word)) {
                matchScore+=0.1;
                if (dataset.type === "documentation" || dataset.type === "metadata") matchScore+=2.3;
            }
        })
        if (hasAction && !matchedAction && dataset.type != "documentaion") matchScore *= 0.6;

        // Non-action words and penalty
        let entityMatchCount = 0;
        NON_ACTION_TOKENS.forEach(token => {
        if (
            dataset.nameTokens.includes(token.word) ||
            dataset.normalizedNameTokens?.includes(token.word)
        ) {
            entityMatchCount++;
        }
        });
        if (NON_ACTION_TOKENS.length > 0 && entityMatchCount === 0 && dataset.type != "documentaion" && dataset.type != "metadata") {
            matchScore *= 0.5;
        }

        // Adding penalty if the namedTokens have extra token which are not in query
        const queryTokenSet = new Set(tokens.map(t => t.word));
        let extraTokenCount = 0;

        dataset.nameTokens.forEach(token => {
            if (!queryTokenSet.has(token)) {
                extraTokenCount++;
            }
        });
        matchScore -= extraTokenCount * 0.5;

        // BOOST SCORE FOR CONCEPTUAL QUERIES
        if (isConceptualQuery) {
            if (dataset.type === "documentation") matchScore += 8;
            if (dataset.filePath.includes("package.json")) matchScore += 10;
            if (dataset.filePath.toLowerCase().includes("readme")) matchScore += 10;
        }

        // COVERING MORE TOKENS GIVE MORE POINTS, and Action-words weigh more than the normal words
        let weightedMatch = 0;
        let totalWeight = 0;
        tokens.forEach(token => {
            const weight = ACTION_WORDS.has(token.word) ? 2 : 1;

            totalWeight += weight;

            if (
                dataset.nameTokens.includes(token.word) ||
                dataset.normalizedNameTokens?.includes(token.word)
            ) {
                weightedMatch += weight;
            }
        });
        const coverage = weightedMatch / totalWeight;

        // Finally puting match score
        if (matchScore > 2.2 || (isConceptualQuery && matchScore > 1.2)) {
            result.push({dataset: dataset, score: matchScore + coverage * 2, matchedTokens: Array.from(matchedTokens)});
        }
        // console.log(matchScore)
    })

    const maxScore = Math.max(...result.map(r => r.score));

    const filteredResults = result.filter(r => r.score > maxScore * 0.4).sort((a, b) => b.score - a.score);

    const finalResults = filteredResults.slice(0, 5);

    return { tokens, hasAction, results: finalResults};
}