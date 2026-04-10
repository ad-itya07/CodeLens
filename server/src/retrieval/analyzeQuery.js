import { splitCamelCase } from "../utils/splitCamelCase.js";
import { normalizeWord } from "../utils/normalizeWord.js";

export function analyzeQuery(query) {
  const rawTokens = query.toLowerCase().split(/\W+/);

  const splitTokens = rawTokens.flatMap(splitCamelCase);

  const normalized = [...new Set(splitTokens.map(normalizeWord))];

  return {
    rawTokens,
    normalizedTokens: normalized,
  };
}