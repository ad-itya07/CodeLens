import { getDatabase } from "../db/database.js";
import { ACTION_WORDS } from "../lib/wordLists.js";
import { getSimilarity } from "./getSimilarity.js";

export function correctToken(word) {
    let bestMatch = word;
    let bestScore = 0;

    ACTION_WORDS.forEach(action => {
        const sim = getSimilarity(word, action);
        if (sim > bestScore) {
            bestScore = sim;
            bestMatch = action;
        }
    })

    if (bestScore > 0.5) return bestMatch;
    return word;
}

export function correctEntity(word) {
    const DATABASE = getDatabase();
    const VOCAB = new Set();

    DATABASE.forEach(dataset => {
        dataset.nameTokens.forEach(t => VOCAB.add(t));
    })
    
    let bestMatch = word;
    let bestScore = 0;

    VOCAB.forEach(v => {
        const sim = getSimilarity(word, v);
        if (sim > bestScore) {
            bestScore = sim;
            bestMatch = v;
        }
    })

    if (bestScore > 0.65) return bestMatch;
    return word;
}