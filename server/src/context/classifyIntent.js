export function classifyIntent(tokens, hasAction) {
  if (hasAction) return "flow_explanation";
  return "conceptual";
}