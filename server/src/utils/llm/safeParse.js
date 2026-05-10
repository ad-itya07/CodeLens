export function safeParse(text) {
  try {
    const parsed = JSON.parse(text);

    if (Array.isArray(parsed.answer)) {
      parsed.answer = parsed.answer.join("\n");
    }

    return parsed;
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        const parsed = JSON.parse(match[0]);

        if (Array.isArray(parsed.answer)) {
          parsed.answer = parsed.answer.join("\n");
        }

        return parsed;
      } catch {}
    }

    return {
      status: "error",
      explanation: text
    };
  }
}