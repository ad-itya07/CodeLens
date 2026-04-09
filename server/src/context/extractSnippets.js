import { expandToLogicalBlock } from "../utils/context/expandToLogicalBlock.js";
import { generateSnippetSummary } from "../utils/context/generateSummary.js";
import { mergeRanges } from "../utils/context/mergeRanges.js";

export function extractSnippets(dataset, tokens, matchedTokens) {

  if (!dataset?.code) return [];

  const lines = dataset.code.split("\n");

  const MAX_FUNCTION_LINES = 120;
  const MAX_SNIPPETS = 3;

  // NORMalize tokens
  const tokenSet = new Set(
    (matchedTokens.length ? matchedTokens : tokens.map((t) => t.word)).map(
      (t) => t.toLowerCase(),
    ),
  );

  if (lines.length <= MAX_FUNCTION_LINES) {
    return [
      {
        code: dataset.code.trim(),
        summary: "complete function",
      },
    ];
  }

  // for large function we extract logical blocks
  const ranges = [];

  lines.forEach((line, index) => {
    const lower = line.toLowerCase();

    for (let token of tokenSet) {
      if (lower.includes(token)) {
        const [start, end] = expandToLogicalBlock(lines, index);
        ranges.push([start, end]);
        break;
      }
    }
  });

  if (ranges.length === 0) {
    return [
      {
        code: lines.slice(0, MAX_FUNCTION_LINES).join("\n").trim(),
        summary: "top of function (fallback)",
      },
    ];
  }

  // MERGING overlapping ranges
  const merged = mergeRanges(ranges);

  const finalRanges = merged.slice(0, MAX_SNIPPETS);

  return finalRanges.map(([start, end]) => {
    const snippetCode = lines.slice(start, end + 1).join("\n");

    return {
      code: snippetCode.trim(),
      summary: generateSnippetSummary(snippetCode, tokenSet),
    };
  });
}
