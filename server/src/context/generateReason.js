export function generateReason(dataset, matchedTokens) {
  return `matches tokens: ${matchedTokens.join(", ")} in ${dataset.type}`;
}