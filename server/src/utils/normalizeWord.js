export function normalizeWord(word) {
  if (word.endsWith("ing")) return word.slice(0, -3);
  if (word.endsWith("ed")) return word.slice(0, -2);
  if (word.endsWith("s")) return word.slice(0, -1);
  return word;
}