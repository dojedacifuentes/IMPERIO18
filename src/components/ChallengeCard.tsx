import { Check, ChevronDown, Plus, X } from 'lucide-react';
import { useId, useState } from 'react';
import { resultKindLabel } from '../data/challenges';
import { cn } from '../lib/cn';
import { sanitizeNumericInput } from '../lib/format';
import type { Challenge, ChallengeEntry } from '../types';
import { StatusPill } from './StatusPill';

interface Props {
  challenge: Challenge;
  entry: ChallengeEntry | undefined;
  done: boolean;
  /** La tarjeta muestra los controles de resultado. */
  active: boolean;
  /** Modo individual: tocar la tarjeta la elige. */
  selectable: boolean;
  error?: string;
  inputRef?: (element: HTMLInputElement | null) => void;
  onSelect: () => void;
  onBinary: (achieved: boolean) => void;
  onMeasure: (raw: string) => void;
}

export function ChallengeCard({
  challenge,
  entry,
  done,
  active,
  selectable,
  error,
  inputRef,
  onSelect,
  onBinary,
  onMeasure,
}: Props) {
  const [abierto, setAbierto] = useState(false);
  const detalleId = useId();
  const campoId = `desafio-${challenge.id}`;
  const Icono = challenge.icon;

  const encabezado = (
    <div className="flex items-start gap-3">
      <span
        className={cn(
          'relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border',
          active
            ? 'border-gold-500 bg-gold-500/15 text-gold-400'
            : 'border-imperio-600 bg-imperio-800 text-silver-300',
        )}
      >
        <Icono size={21} aria-hidden="true" />
        <span className="absolute -left-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-imperio-700 text-[10px] font-bold text-silver-200">
          {challenge.id}
        </span>
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold leading-tight text-silver-100">{challenge.name}</h3>
          <StatusPill done={done} className="mt-0.5 shrink-0" />
        </div>
        <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-royal-400">
          {resultKindLabel(challenge)}
        </p>
      </div>
    </div>
  );

  return (
    <article
      className={cn(
        'card overflow-hidden transition-colors',
        active && 'border-gold-500/60',
        done && 'border-success-500/50',
      )}
    >
      {selectable ? (
        <button type="button" onClick={onSelect} className="w-full p-4 text-left">
          {encabezado}
          <p className="mt-2 text-sm text-silver-300">{challenge.short}</p>
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-xl border border-gold-500/60 bg-gold-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-gold-400">
            <Plus size={14} strokeWidth={3} aria-hidden="true" />
            Elegir este desafío
          </span>
        </button>
      ) : (
        <div className="p-4">
          {encabezado}
          <p className="mt-2 text-sm text-silver-300">{challenge.short}</p>

          {active && challenge.kind === 'binary' && (
            <div
              role="group"
              aria-label={`Resultado de ${challenge.name}`}
              className="mt-3 grid grid-cols-2 gap-2"
            >
              <button
                type="button"
                aria-pressed={entry?.kind === 'binary' && entry.achieved}
                onClick={() => onBinary(true)}
                className={cn(
                  'flex h-14 items-center justify-center gap-2 rounded-2xl border-2 font-display text-base font-bold uppercase tracking-wide transition-colors active:scale-[0.985]',
                  entry?.kind === 'binary' && entry.achieved
                    ? 'border-success-500 bg-success-500 text-imperio-950'
                    : 'border-success-600/50 bg-success-600/10 text-success-400',
                )}
              >
                <Check size={20} strokeWidth={3} aria-hidden="true" />
                Logrado
              </button>
              <button
                type="button"
                aria-pressed={entry?.kind === 'binary' && !entry.achieved}
                onClick={() => onBinary(false)}
                className={cn(
                  'flex h-14 items-center justify-center gap-2 rounded-2xl border-2 font-display text-base font-bold uppercase tracking-wide transition-colors active:scale-[0.985]',
                  entry?.kind === 'binary' && !entry.achieved
                    ? 'border-danger-500 bg-danger-500 text-imperio-950'
                    : 'border-imperio-600 bg-imperio-800 text-silver-300',
                )}
              >
                <X size={20} strokeWidth={3} aria-hidden="true" />
                No logrado
              </button>
            </div>
          )}

          {active && error && challenge.kind === 'binary' && (
            <p role="alert" className="mt-2 text-sm font-semibold text-danger-400">
              {error}
            </p>
          )}

          {active && challenge.kind !== 'binary' && (
            <div className="mt-3">
              <label htmlFor={campoId} className="block text-sm font-bold text-silver-100">
                {challenge.resultLabel}
              </label>
              <div className="relative mt-1.5">
                <input
                  id={campoId}
                  ref={inputRef}
                  value={entry?.kind === 'number' ? entry.raw : ''}
                  onChange={(event) => onMeasure(sanitizeNumericInput(event.target.value))}
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  enterKeyHint="done"
                  placeholder="0"
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? `${campoId}-error` : undefined}
                  className={cn(
                    'h-14 w-full rounded-2xl border-2 bg-imperio-800 px-4 text-xl font-bold text-silver-100 placeholder:text-silver-500',
                    challenge.unit === 'segundos' ? 'pr-28' : 'pr-14',
                    error ? 'border-danger-500' : 'border-imperio-600 focus:border-gold-500',
                  )}
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold uppercase tracking-wider text-silver-400"
                >
                  {challenge.unit}
                </span>
              </div>
              {error && (
                <p
                  id={`${campoId}-error`}
                  role="alert"
                  className="mt-1.5 text-sm font-semibold text-danger-400"
                >
                  {error}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      <div className="border-t border-imperio-700 bg-imperio-900/60">
        <button
          type="button"
          onClick={() => setAbierto((valor) => !valor)}
          aria-expanded={abierto}
          aria-controls={detalleId}
          className="flex w-full items-center justify-between px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-silver-400"
        >
          {abierto ? 'Ocultar instrucción' : 'Ver instrucción'}
          <ChevronDown
            size={16}
            className={cn('transition-transform', abierto && 'rotate-180')}
            aria-hidden="true"
          />
        </button>
        <p
          id={detalleId}
          hidden={!abierto}
          className="px-4 pb-3 text-sm leading-relaxed text-silver-300"
        >
          {challenge.detail}
        </p>
      </div>
    </article>
  );
}
