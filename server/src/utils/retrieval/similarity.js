export function similarity(a, b) {
  if (!a || !b || a.length !== b.length) return -1;

  let sum = 0;

  for (let i = 0; i < a.length; i++) {
    sum += a[i] * b[i];
  }

  return sum;
}