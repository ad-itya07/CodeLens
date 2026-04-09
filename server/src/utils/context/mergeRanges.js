export function mergeRanges(ranges) {
  if (ranges.length === 0) return [];

  ranges.sort((a, b) => a[0] - b[0]);

  const merged = [];
  let [currStart, currEnd] = ranges[0];

  for (let i = 1; i < ranges.length; i++) {
    const [start, end] = ranges[i];

    if (start <= currEnd) {
      currEnd = Math.max(currEnd, end);
    } else {
      merged.push([currStart, currEnd]);
      [currStart, currEnd] = [start, end];
    }
  }

  merged.push([currStart, currEnd]);

  return merged;
}