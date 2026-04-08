import { getAllFiles } from "../utils/getAllFiles.js";
import { parseFiles } from "./parseFiles.js";

export function parseRepo(folderPath) {
  let files = getAllFiles(folderPath);

  files = files.filter(
    (file) =>
      file.endsWith(".js") ||
      file.endsWith(".ts") ||
      file.endsWith(".jsx") ||
      file.endsWith(".tsx") ||
      file.endsWith(".md") ||
      file.endsWith(".json"),
  );

  const DATABASE = parseFiles(files);

  return DATABASE;
}
