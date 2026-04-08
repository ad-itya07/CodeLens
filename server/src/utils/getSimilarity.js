function levenshtein(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0)
  );

  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] =
          1 +
          Math.min(
            dp[i - 1][j],     // delete
            dp[i][j - 1],     // insert
            dp[i - 1][j - 1]  // replace
          );
      }
    }
  }

  return dp[a.length][b.length];
}


export function getSimilarity(a, b) {
  const distance = levenshtein(a, b);
  const maxLen = Math.max(a.length, b.length);

  if (maxLen === 0) return 1;

  return 1 - distance / maxLen;
}