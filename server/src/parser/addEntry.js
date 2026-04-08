import { normalizeWord } from "../utils/normalizeWord.js";
import { splitCamelCase } from "../utils/splitCamelCase.js";

export function addEntry(code, name, type, filePath, node, DATABASE) {
    if (!node || node.start == null || node.end == null) return;
    if (!name) return;

    DATABASE.push({
        name: name,
        nameTokens: splitCamelCase(name),
        normalizedNameTokens: [...new Set(splitCamelCase(name).map(normalizeWord))],
        type,
        filePath,
        fileTokens: filePath.toLowerCase().split(/\W+/),
        code: code.slice(node.start, node.end)
    })
}