import type { Challenge, ChallengeEntry, Unit } from '../types';
import { parseDecimal } from './format';

export type Validation = { ok: true; value: number } | { ok: false; error: string };

const MAX_MEASURE = 9999;

/** Valida un campo numérico: sin texto, sin negativos y sin ceros. */
export function validateMeasure(raw: string, unit: Unit): Validation {
  const texto = raw.trim();
  if (texto === '') {
    return {
      ok: false,
      error: unit === 'segundos' ? 'Escribe el tiempo en segundos.' : 'Escribe los kilogramos marcados.',
    };
  }
  const value = parseDecimal(texto);
  if (value === null) {
    return { ok: false, error: 'Usa solo números. Los decimales van con coma o punto.' };
  }
  if (value <= 0) {
    return { ok: false, error: 'El valor debe ser mayor que 0.' };
  }
  if (value > MAX_MEASURE) {
    return { ok: false, error: `Revisa el valor: el máximo permitido es ${MAX_MEASURE}.` };
  }
  return { ok: true, value };
}

export type NameValidation = { ok: true; value: string } | { ok: false; error: string };

export const MAX_NAME_LENGTH = 40;

/** El nombre o apodo es el único dato obligatorio del participante. */
export function validateName(raw: string): NameValidation {
  const value = raw.trim().replace(/\s+/g, ' ');
  if (value === '') return { ok: false, error: 'Escribe tu nombre o apodo para continuar.' };
  if (value.length < 2) return { ok: false, error: 'Usa al menos 2 caracteres.' };
  if (value.length > MAX_NAME_LENGTH) {
    return { ok: false, error: `Máximo ${MAX_NAME_LENGTH} caracteres.` };
  }
  return { ok: true, value };
}

/** Un desafío está completo cuando tiene un resultado utilizable. */
export function isEntryComplete(challenge: Challenge, entry: ChallengeEntry | undefined): boolean {
  if (!entry) return false;
  if (entry.kind === 'binary') return challenge.kind === 'binary';
  if (challenge.kind === 'binary') return false;
  return validateMeasure(entry.raw, challenge.unit ?? 'kg').ok;
}
