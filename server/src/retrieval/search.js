import { embed } from '../embeddings/embedder.js';
import { similarity } from '../utils/retrieval/similarity.js';
import { analyzeQuery } from './analyzeQuery.js';

function tokenScore(entry, queryTokens) {
  let score = 0;

  if (entry.normalizedNameTokens?.some(t => queryTokens.includes(t))) {
    score += 0.15;
  }

  if (entry.fileTokens?.some(t => queryTokens.includes(t))) {
    score += 0.1;
  }

  return score;
}

export async function search(query, entries, K = 5) {
  const { normalizedTokens } = analyzeQuery(query);

  const queryVector = await embed(query);

  const scored = entries.map(e => {
    if (!e.embedding) return null;

    const sim = similarity(queryVector, e.embedding);
    const boost = tokenScore(e, normalizedTokens);

    return {
      ...e,
      score: sim + boost,
    };
  }).filter(Boolean);

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, K);
}