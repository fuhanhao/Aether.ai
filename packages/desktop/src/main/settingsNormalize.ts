/**
 * Normalize typographic dashes (en dash, em dash, non-breaking hyphen,
 * minus sign, etc.) to the ASCII hyphen. Model names like "qwen3‑vl‑plus"
 * pasted from formatted documents use these characters and are silently
 * rejected by provider APIs (e.g. DashScope returns 404 for an unknown
 * model). Normalizing on save prevents that class of configuration error.
 */
export function normalizeTypographicDashes(value: string): string {
  return value.replace(/[\u2010-\u2015\u2212]/g, '-');
}
