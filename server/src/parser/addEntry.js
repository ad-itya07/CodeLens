import { normalizeWord } from "../utils/normalizeWord.js";
import { splitCamelCase } from "../utils/splitCamelCase.js";

function buildEmbeddingText({ name, type, filePath, code }) {
  return `
Name: ${name}
Type: ${type}
File: ${filePath}

Code:
${code.slice(0, 1500)}
`;
}

export function addEntry(code, name, type, filePath, node, DATABASE) {
  if (!node || node.start == null || node.end == null) return;
  if (!name) return;

  const snippet = code.slice(node.start, node.end);

  const entry = {
    name,
    type,
    filePath,
    code: snippet,

    nameTokens: splitCamelCase(name),
    normalizedNameTokens: [...new Set(splitCamelCase(name).map(normalizeWord))],
    fileTokens: filePath.toLowerCase().split(/\W+/),

    embeddingText: buildEmbeddingText({
      name,
      type,
      filePath,
      code: snippet,
    }),
    embedding: null,
  };

  DATABASE.push(entry);
}