export function generateSnippetSummary(code, tokenSet) {
  for (let token of tokenSet) {
    if (code.toLowerCase().includes(token)) {
      return `relevant to "${token}"`;
    }
  }
  return "relevant code section";
}