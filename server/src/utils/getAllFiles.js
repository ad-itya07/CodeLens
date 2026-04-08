import fs from "fs"
import path from "path"

const IGNORE_DIRS = ["node_modules", ".git", ".next", "dist", "build"];

export function getAllFiles(dirPath) {
  let files = [];

  const items = fs.readdirSync(dirPath);

  items.forEach(item => {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
        if (IGNORE_DIRS.includes(item)) return;
        files = files.concat(getAllFiles(fullPath)); // recursively calling subfolders
    } else {
      files.push(fullPath);
    }
  });

  return files;
}