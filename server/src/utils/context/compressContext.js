export function compressContext(context) {
  return {
    q: context.query,
    i: context.intent,
    c: context.candidates.map(c => ({
      f: c.file,
      r: c.reason,
      s: c.snippets.map(sn => sn.code.slice(0, 1000)) 
    }))
  };
}