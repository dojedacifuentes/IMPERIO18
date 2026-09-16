import { ALL_CHALLENGE_IDS } from '../data/challenges';
import type { ChallengeId, Entries, RegistrationState, Step } from '../types';

const STORAGE_KEY = 'imperio18:registro:v1';

const STEPS: Step[] = ['identity', 'mode', 'challenges', 'review'];

function isChallengeId(value: unknown): value is ChallengeId {
  return typeof value === 'number' && (ALL_CHALLENGE_IDS as number[]).includes(value);
}

function parseEntries(value: unknown): Entries {
  if (typeof value !== 'object' || value === null) return {};
  const entries: Entries = {};
  for (const [key, raw] of Object.entries(value as Record<string, unknown>)) {
    const id = Number(key);
    if (!isChallengeId(id) || typeof raw !== 'object' || raw === null) continue;
    const candidate = raw as Record<string, unknown>;
    if (candidate.kind === 'binary' && typeof candidate.achieved === 'boolean') {
      entries[id] = { kind: 'binary', achieved: candidate.achieved };
    } else if (candidate.kind === 'number' && typeof candidate.raw === 'string') {
      entries[id] = { kind: 'number', raw: candidate.raw };
    }
  }
  return entries;
}

/**
 * Recupera el registro guardado. Si el contenido está corrupto o el navegador
 * bloquea el almacenamiento, simplemente se empieza de cero.
 */
export function loadState(): RegistrationState | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Record<string, unknown>;
    if (typeof data !== 'object' || data === null) return null;

    const step = STEPS.includes(data.step as Step) ? (data.step as Step) : 'identity';
    const mode = data.mode === 'single' || data.mode === 'pack' ? data.mode : null;
    const selected = Array.isArray(data.selected) ? data.selected.filter(isChallengeId) : [];

    return {
      step,
      name: typeof data.name === 'string' ? data.name : '',
      mode,
      selected: mode === 'pack' ? [...ALL_CHALLENGE_IDS] : selected.slice(0, 1),
      entries: parseEntries(data.entries),
      sentAt: typeof data.sentAt === 'string' ? data.sentAt : null,
    };
  } catch {
    return null;
  }
}

export function saveState(state: RegistrationState): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Safari en modo privado puede bloquear la escritura: la app sigue funcionando.
  }
}

export function clearStoredState(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // sin almacenamiento no hay nada que limpiar
  }
}
