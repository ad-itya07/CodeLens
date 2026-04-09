import { ACTION_WORDS, DOMAIN_SYNONYMS, STOP_WORDS, SYNONYM_GROUPS } from "../lib/wordLists.js";
import { correctEntity, correctToken } from "../utils/correctTokens.js";
import { normalizeWord } from "../utils/normalizeWord.js";

function generateBaseTokens(query) {
    return query
        .split(/\W+/)
        .map(word => word.toLowerCase())
        .filter(word => word.length > 0 && !STOP_WORDS.has(word))
        .map(word => correctToken(word))
        .map(word => ACTION_WORDS.has(word) ? word : correctEntity(word))
        .map(normalizeWord);
}

function generateStructuredTokens(baseTokens) {
    return baseTokens.map(word => ({
            word,
            type: "original"
        }));
}

export function expandTokens(tokens) {
  const expanded = [...tokens];

  tokens.forEach(tokenObj => {
    const word = tokenObj.word;

    SYNONYM_GROUPS.forEach(group => {
      if (group.includes(word)) {
        group.forEach(w => {
          if (!expanded.some(t => t.word === w)) {
            expanded.push({ word: w, type: "expanded_synonym" });
          }
        });
      }
    });

    DOMAIN_SYNONYMS.forEach(Group => {
        if (Group.includes(word)) {
            Group.forEach(w => {
                if (!expanded.some(t => t.word === w)) {
                    expanded.push({
                        word: w,
                        type: "expanded_domain"
                    })
                }
            })
        }
    })
  });

  return expanded;
}

export function generateNonActionTokens(tokens) {
    return tokens.filter(
            t => !ACTION_WORDS.has(t.word)
        );
}

export default function tokenize(query) {
    const baseTokens = generateBaseTokens(query);

    const structuredTokens = generateStructuredTokens(baseTokens);

    const tokens = expandTokens(structuredTokens);

    return tokens;
}