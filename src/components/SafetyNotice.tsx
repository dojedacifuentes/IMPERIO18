import { ShieldAlert } from 'lucide-react';
import { SAFETY_NOTICE } from '../lib/constants';

/** Aviso de seguridad física, discreto pero siempre presente. */
export function SafetyNotice() {
  return (
    <p className="mt-8 flex items-start gap-2 text-[11px] leading-snug text-silver-500">
      <ShieldAlert size={14} className="mt-px shrink-0 text-silver-400" aria-hidden="true" />
      <span>{SAFETY_NOTICE}</span>
    </p>
  );
}
