export function splitCamelCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")   // split camelCase
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2") // handle PascalCase like "HTMLParser"
    .toLowerCase()
    .split(/\s+/);
}