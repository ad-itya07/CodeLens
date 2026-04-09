export const RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    status: {
      type: "string",
      enum: ["ok", "insufficient_context"]
    },
    explanation: {
      type: "string"
    },
    steps: {
      type: "array",
      items: { type: "string" }
    },
    code_references: {
      type: "array",
      items: {
        type: "object",
        properties: {
          file: { type: "string" },
          snippet: { type: "string" }
        }
      }
    }
  },
  required: ["status", "explanation"]
};