import { classifyIntent } from "./classifyIntent.js";
import { extractSnippets } from "./extractSnippets.js";
import { generateReason } from "./generateReason.js";

function filterCandidates(results) {
  return results
    .filter(r => r.score > 2.2)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

function roundScore(score) {
  return Math.round(score * 100) / 100;
}

export function buildContext(query, tokens, results, hasAction) {
  if (!results || results.length === 0) {
    return {
      query,
      intent: "unknown",
      tokens,
      candidates: []
    };
  }

  const filtered = filterCandidates(results);

  const intent = classifyIntent(tokens, hasAction);

  const candidates = filtered.map((r) => {
    const dataset = r.dataset;

    return {
      file: dataset.filePath,
      type: dataset.type,
      score: roundScore(r.score),

      reason: generateReason(dataset, r.matchedTokens),

      snippets: extractSnippets(
        dataset,
        tokens,
        r.matchedTokens
      )
    };
  });

  if (candidates.length === 0) {
    return {
      query,
      intent,
      tokens,
      candidates: []
    };
  }

  return {
    query,
    intent,
    tokens: tokens.map(t => t.word), 
    candidates
  };
}