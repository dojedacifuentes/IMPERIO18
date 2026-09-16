import type { LucideIcon } from 'lucide-react';

/** Los ocho desafíos del puesto, en orden. */
export type ChallengeId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

/** Cómo se registra el resultado de un desafío. */
export type ResultKind = 'binary' | 'seconds' | 'kg';

export type Unit = 'segundos' | 'kg';

/** Modalidad de participación. */
export type Mode = 'single' | 'pack';

/** Pasos de la pantalla única. */
export type Step = 'identity' | 'mode' | 'challenges' | 'review';

export interface Challenge {
  id: ChallengeId;
  emoji: string;
  name: string;
  /** Nombre usado en el mensaje de WhatsApp. */
  messageName: string;
  icon: LucideIcon;
  kind: ResultKind;
  unit?: Unit;
  /** Etiqueta visible del campo de resultado. */
  resultLabel: string;
  /** Instrucción de una línea, siempre visible. */
  short: string;
  /** Instrucción completa, visible al abrir la tarjeta. */
  detail: string;
}

/**
 * Resultado registrado. Los desafíos numéricos guardan el texto tal cual lo
 * escribió la persona: así no se pierde lo tecleado y la validación vive en un
 * solo lugar (`validateMeasure`).
 */
export type ChallengeEntry =
  | { kind: 'binary'; achieved: boolean }
  | { kind: 'number'; raw: string };

export type Entries = Partial<Record<ChallengeId, ChallengeEntry>>;

export interface RegistrationState {
  step: Step;
  name: string;
  mode: Mode | null;
  selected: ChallengeId[];
  entries: Entries;
  /** ISO de la última vez que se abrió WhatsApp con este registro. */
  sentAt: string | null;
}

/** Línea de resultado ya resuelta, lista para el resumen y para WhatsApp. */
export interface ResultLine {
  challenge: Challenge;
  text: string;
}
