import { Check, Clock } from 'lucide-react';
import { cn } from '../lib/cn';

/** Estado del desafío. No depende solo del color: lleva icono y texto. */
export function StatusPill({ done, className }: { done: boolean; className?: string }) {
  const Icono = done ? Check : Clock;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider',
        done
          ? 'border-success-500 bg-success-500/15 text-success-400'
          : 'border-imperio-600 bg-imperio-800 text-silver-400',
        className,
      )}
    >
      <Icono size={11} strokeWidth={3} aria-hidden="true" />
      {done ? 'Completado' : 'Pendiente'}
    </span>
  );
}
