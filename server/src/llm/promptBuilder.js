import { compressContext } from "../utils/context/compressContext.js";

const intentInstruction = {
  flow_explanation: `
- Provide step-by-step execution flow
- Focus on sequence of operations
`,
  conceptual: `
- Provide high-level explanation
- Focus on purpose and architecture
`,
  unknown: `
- Provide best possible explanation using context
`
};

export function buildPrompt(context) {
  const compact = compressContext(context);

  return `
You are a strict codebase analyzer.

Task:
${intentInstruction[context.intent]}

Rules:
- Use ONLY the provided context
- Do NOT assume missing logic
- If unclear → return "insufficient_context"

IMPORTANT:
- Return ONLY valid JSON
- Do NOT include explanations outside JSON
- Do NOT include markdown or text before/after JSON
-If the context only partially answers the query:
  - provide partial explanation
  - but clearly state limitations

Format:
{
  "status": "ok | insufficient_context",
  "explanation": "...",
  "steps": [],
  "code_references": [
    {
      "file": "...",
      "snippet": "..."
    }
  ]
}

Context:
${JSON.stringify(compact)}
`;
}