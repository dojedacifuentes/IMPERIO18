import { getChallenge } from '../data/challenges';
import type { Challenge, ChallengeEntry, ChallengeId, Entries, ResultLine } from '../types';
import { formatMeasure, parseDecimal } from './format';
import { isEntryComplete } from './validation';

/** Texto final de un resultado: "Logrado", "38,4 segundos", "31 kg". */
export function describeEntry(challenge: Challenge, entry: ChallengeEntry): string {
  if (entry.kind === 'binary') return entry.achieved ? 'Logrado' : 'No logrado';
  const value = parseDecimal(entry.raw);
  if (value === null) return '';
  return `${formatMeasure(value)} ${challenge.unit ?? ''}`.trim();
}

/** Solo los desafíos con resultado utilizable; nunca inventa valores. */
export function buildResultLines(ids: ChallengeId[], entries: Entries): ResultLine[] {
  const lines: ResultLine[] = [];
  for (const id of ids) {
    const challenge = getChallenge(id);
    const entry = entries[id];
    if (!entry || !isEntryComplete(challenge, entry)) continue;
    lines.push({ challenge, text: describeEntry(challenge, entry) });
  }
  return lines;
}

/** Desafíos seleccionados que todavía no tienen resultado. */
export function pendingChallenges(ids: ChallengeId[], entries: Entries): Challenge[] {
  return ids
    .map(getChallenge)
    .filter((challenge) => !isEntryComplete(challenge, entries[challenge.id]));
}
