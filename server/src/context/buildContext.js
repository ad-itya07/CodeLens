export function buildContext(query, results) {
  if (!results || results.length === 0) {
    return {
      contextText: "",
      uiResults: [],
    };
  }

  const topResults = results.slice(0, 5);

  //  LLM COntext
  const contextText = `
    User Query:
    ${query}

    Relevant Code Snippets:
    ${topResults.map((e, i) => `
    [${i + 1}] ${e.name} (${e.type})
    File: ${e.filePath}

    ${e.code.slice(0, 500)}
    `).join("\n")}
    `;

  // UI results
  const uiResults = topResults.map(e => ({
    name: e.name,
    type: e.type,
    filePath: e.filePath,
    code: e.code,
    score: Number(e.score?.toFixed(3))
  }));

  return {
    contextText,
    uiResults,
  };
}