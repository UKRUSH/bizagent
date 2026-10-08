/** Splits a free-text query into lower-case terms. */
export function toTerms(query: string): string[] {
  return query.toLowerCase().split(/\s+/).filter(Boolean);
}

/** True when every term appears in the text (case-insensitive). An empty query matches. */
export function matchesAllTerms(text: string, terms: string[]): boolean {
  const haystack = text.toLowerCase();
  return terms.every((term) => haystack.includes(term));
}
