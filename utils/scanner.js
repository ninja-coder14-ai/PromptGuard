import { PATTERNS, severityWeight } from '../data/patterns';

export function scanPrompt(text) {
  if (!text || typeof text !== 'string') return [];

  const matches = PATTERNS
    .filter((p) => p.regex.test(text))
    .map((p) => ({
      id: p.id,
      label: p.label,
      severity: p.severity,
      description: p.description,
      fixSuggestion: p.fixSuggestion,
    }));

  return matches.sort((a, b) => severityWeight(b.severity) - severityWeight(a.severity));
}

export function overallRisk(matches) {
  if (matches.length === 0) return 'clean';
  return matches[0].severity;
}

export async function deepScan(text, isEntitled) {
  if (!isEntitled) {
    throw new Error('User is not entitled to deep scan.');
  }
  throw new Error('deepScan not yet implemented.');
}