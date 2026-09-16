import type { Mode, ResultLine } from '../types';
import { MODES, WHATSAPP_BASE_URL } from './constants';
import { formatDateTime } from './format';

export interface MessageInput {
  name: string;
  mode: Mode;
  lines: ResultLine[];
  date?: Date;
}

/** Arma el texto que verá Brayan en WhatsApp. */
export function buildMessage({ name, mode, lines, date = new Date() }: MessageInput): string {
  const modalidad = MODES[mode];
  return [
    '🏆 RESULTADOS — DESAFÍOS DE BRAYAN',
    `👤 Participante: ${name}`,
    `🎟️ Modalidad: ${modalidad.label}`,
    `💰 Valor: ${modalidad.priceLabel}`,
    '',
    'RESULTADOS',
    ...lines.map((line) => `${line.challenge.emoji} ${line.challenge.messageName}: ${line.text}`),
    '',
    `📅 Registro: ${formatDateTime(date)}`,
    'El resultado fue registrado en el puesto de desafíos.',
  ].join('\n');
}

/** Codifica saltos de línea, tildes y emojis para el enlace de WhatsApp. */
export function buildWhatsAppUrl(message: string): string {
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
}
