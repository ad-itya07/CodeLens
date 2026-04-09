export function handleMError(err) {
  const message = err?.message || "";

  // Rate limit / quota exceeded
  if (
    message.includes("quota") ||
    message.includes("rate") ||
    message.includes("limit")
  ) {
    return {
      status: "llm_error",
      type: "quota_exceeded",
      explanation: "LLM usage limit reached. Please try again later."
    };
  }

  // Model overloaded / service issue
  if (
    message.includes("overloaded") ||
    message.includes("unavailable")
  ) {
    return {
      status: "llm_error",
      type: "service_unavailable",
      explanation: "LLM service is currently unavailable. Please try again shortly."
    };
  }

  // Timeout / network
  if (
    message.includes("timeout") ||
    message.includes("network")
  ) {
    return {
      status: "llm_error",
      type: "timeout",
      explanation: "LLM request timed out. Try again."
    };
  }

  // Unknown error
  return {
    status: "llm_error",
    type: "unknown",
    explanation: "Something went wrong while generating response."
  };
}