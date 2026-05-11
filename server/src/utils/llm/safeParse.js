function normalizeAnswer(answer) {
  if (typeof answer === "string") return answer;

  if (Array.isArray(answer)) {
    return answer.map(item => {
      if (typeof item === "string") return item;
      if (typeof item === "object") return Object.values(item).join(" ");
      return String(item);
    }).join(" ");
  }

  if (typeof answer === "object") return Object.values(answer).join(" ");

  return String(answer);
}

export function safeParse(text) {
  try {
    const parsed = JSON.parse(text);
    if (parsed.answer !== undefined) {
      parsed.answer = normalizeAnswer(parsed.answer);
    }

    return parsed;
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        const parsed = JSON.parse(match[0]);
        if (parsed.answer !== undefined) {
          parsed.answer = normalizeAnswer(parsed.answer);
        }

        return parsed;
      } catch {}
    }

    return {
      status: "error",
      answer: text
    };
  }
}