export const STOP_WORDS = new Set([
  "a","an","the",
  "is","are","was","were","be","been","being",
  
  "what","which","who","whom","whose","when","where","why","how",
  
  "do","does","did","done","doing",
  "have","has","had","having", "how",
  
  "in","on","at","by","for","with","about","against","between","into",
  "through","during","before","after","above","below","to","from",
  "up","down","out","over","under","again","further",
  
  "and","or","but","if","while","although","because","as","until","of",
  
  "this","that","these","those",
  "it","its","he","she","they","them","his","her","their",
  "we","us","you","your","yours",
  
  "can","could","should","would","may","might","must","shall",
  
  "find","give","show","tell",
]);

export const ACTION_WORDS = new Set([
  "get", "fetch", "create", "update", "delete", "book"
]);

export const SYNONYM_GROUPS = [
  ["get", "fetch", "retrieve", "load"],
  ["create", "add", "insert"],
  ["update", "edit"],
  ["delete", "remove"]
];

export const CONCEPTUAL_WORDS = new Set([
  "explain", "describe", "define", "meaning", "concept", "idea", "overview", "introduction",

  "architecture", "design", "structure", "pattern", "model", "blueprint", "layout",

  "working", "flow", "process", "mechanism", "internals",
  "lifecycle", "execution", "pipeline", "steps", "stages",

  "interaction", "communication", "integration", "dependency", "relationship",
  "coordination", "collaboration",

  "difference", "compare", "comparison", "vs", "versus", "better", "advantages",
  "disadvantages", "tradeoffs", "pros", "cons",

  "system", "component", "module", "service", "layer", "abstraction",
  "responsibility", "role",

  "tech", "stack", "framework", "library", "tooling", "ecosystem", "technology", "technologies",
  "library", "libraries", "tools", "dependencies",

  "config", "usage", "run", "start", "setup", "installation", "install", "configuration",
  
  "features", "capabilities", "functionality", "supports",

  "understand", "intuition", "logic", "reason", "rationale",
  "behind", "inside", "underlying",

  "scalability", "performance", "efficiency", "optimization",
  "reliability", "availability", "consistency",

  "approach", "strategy", "method", "technique", "principle",

  "usecase", "usecases", "application", "scenario", "example",

  "issue", "problem", "challenge", "limitation", "bottleneck",

  "basically", "actually", "simply", "detail", "deep", "highlevel",
  "lowlevel"
]);