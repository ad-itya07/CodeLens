export function expandToLogicalBlock(lines, index) {
  let start = index;
  let end = index;
  
  // once we expand above, and then we expand for below code
  let balance = 0;
  for (let i = index; i >= 0; i--) {
    if (lines[i].includes("}")) balance++;
    if (lines[i].includes("{")) balance--;

    start = i;

    if (balance <= 0 && i !== index) break;
  }

  balance = 0;
  for (let i = index; i < lines.length; i++) {
    if (lines[i].includes("{")) balance++;
    if (lines[i].includes("}")) balance--;

    end = i;

    if (balance <= 0 && i !== index) break;
  }

  return [start, end];
}