/**
 * Convierte el texto de un campo numérico en número.
 * Acepta coma o punto como separador decimal y tolera un separador final
 * mientras la persona todavía escribe ("38," se lee como 38).
 * Devuelve `null` si el texto no representa un número válido.
 */
export function parseDecimal(raw: string): number | null {
  const cleaned = raw.trim().replace(',', '.').replace(/\.$/, '');
  if (cleaned === '') return null;
  if (!/^\d*\.?\d+$/.test(cleaned)) return null;
  const value = Number(cleaned);
  return Number.isFinite(value) ? value : null;
}

/** 38.4 -> "38,4"   31 -> "31"   27.5 -> "27,5" */
export function formatMeasure(value: number): string {
  const rounded = Math.round(value * 100) / 100;
  return String(rounded).replace('.', ',');
}

/** Deja escribir solo dígitos y un separador decimal. */
export function sanitizeNumericInput(raw: string): string {
  const onlyAllowed = raw.replace(/[^\d.,]/g, '');
  const firstSeparator = onlyAllowed.search(/[.,]/);
  if (firstSeparator === -1) return onlyAllowed.slice(0, 7);
  const head = onlyAllowed.slice(0, firstSeparator + 1);
  const tail = onlyAllowed.slice(firstSeparator + 1).replace(/[.,]/g, '');
  return (head + tail).slice(0, 7);
}

/** "18/09/2026, 19:42" — formato fijo, independiente del idioma del teléfono. */
export function formatDateTime(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  const fecha = `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
  const hora = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  return `${fecha}, ${hora}`;
}
