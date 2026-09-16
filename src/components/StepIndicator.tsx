import { Check } from 'lucide-react';
import { cn } from '../lib/cn';
import type { Step } from '../types';

const PASOS: Array<{ step: Step; label: string }> = [
  { step: 'identity', label: 'Nombre' },
  { step: 'mode', label: 'Modalidad' },
  { step: 'challenges', label: 'Desafíos' },
  { step: 'review', label: 'Revisión' },
];

interface Props {
  current: Step;
  onGoToStep: (step: Step) => void;
}

/** Guía de avance. Los pasos ya recorridos se pueden tocar para volver. */
export function StepIndicator({ current, onGoToStep }: Props) {
  const actual = PASOS.findIndex((p) => p.step === current);

  return (
    <nav aria-label="Progreso del registro" className="mb-5 mt-4">
      <ol className="flex items-center gap-1.5">
        {PASOS.map((paso, index) => {
          const completado = index < actual;
          const esActual = index === actual;
          return (
            <li key={paso.step} className="flex-1">
              <button
                type="button"
                disabled={!completado}
                aria-current={esActual ? 'step' : undefined}
                aria-label={`Paso ${index + 1}: ${paso.label}${completado ? ' (completado)' : ''}`}
                onClick={() => completado && onGoToStep(paso.step)}
                className={cn(
                  'flex w-full flex-col items-center gap-1.5 rounded-xl py-1 transition-colors',
                  completado ? 'cursor-pointer' : 'cursor-default',
                )}
              >
                <span
                  className={cn(
                    'flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs font-bold',
                    esActual && 'border-gold-400 bg-gold-400 text-imperio-950',
                    completado && 'border-success-500 bg-success-500/20 text-success-400',
                    !esActual && !completado && 'border-imperio-600 text-silver-500',
                  )}
                >
                  {completado ? <Check size={15} strokeWidth={3} aria-hidden="true" /> : index + 1}
                </span>
                <span
                  className={cn(
                    'text-[10px] font-semibold uppercase tracking-wider',
                    esActual ? 'text-gold-400' : completado ? 'text-success-400' : 'text-silver-500',
                  )}
                >
                  {paso.label}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
