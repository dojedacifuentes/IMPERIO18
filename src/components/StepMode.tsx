import { ArrowRight, Check, ChevronLeft, Layers, Target } from 'lucide-react';
import { cn } from '../lib/cn';
import { MODES } from '../lib/constants';
import type { Mode } from '../types';
import { StickyBar } from './StickyBar';
import { Button } from './ui/Button';

interface Props {
  mode: Mode | null;
  onChoose: (mode: Mode) => void;
  onBack: () => void;
  onContinue: () => void;
}

const TARJETAS: Array<{ mode: Mode; icon: typeof Target; detalle: string[] }> = [
  {
    mode: 'single',
    icon: Target,
    detalle: ['Eliges 1 de los 8 desafíos', 'Registras una marca'],
  },
  {
    mode: 'pack',
    icon: Layers,
    detalle: ['Los 8 desafíos activados', 'Puedes completarlos de a poco'],
  },
];

/** Paso 2: modalidad y precio. Solo existen estas dos opciones. */
export function StepMode({ mode, onChoose, onBack, onContinue }: Props) {
  return (
    <section className="animate-fade-up">
      <h2 className="text-lg font-bold text-silver-100">Elige tu modalidad</h2>
      <p className="mb-4 mt-1 text-sm text-silver-400">El pago se realiza en el puesto.</p>

      <div className="space-y-3" role="radiogroup" aria-label="Modalidad de participación">
        {TARJETAS.map(({ mode: valor, icon: Icono, detalle }) => {
          const info = MODES[valor];
          const activa = mode === valor;
          return (
            <button
              key={valor}
              type="button"
              role="radio"
              aria-checked={activa}
              onClick={() => onChoose(valor)}
              className={cn(
                'card w-full p-4 text-left transition-colors',
                activa ? 'border-gold-500 bg-imperio-800 ring-2 ring-gold-500/50' : 'hover:border-imperio-500',
              )}
            >
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border',
                    activa
                      ? 'border-gold-500 bg-gold-500/15 text-gold-400'
                      : 'border-imperio-600 bg-imperio-800 text-silver-300',
                  )}
                >
                  <Icono size={22} aria-hidden="true" />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-display text-xl font-bold uppercase tracking-wide text-silver-100">
                      {info.label}
                    </span>
                    <span
                      className={cn(
                        'font-display text-xl font-extrabold',
                        activa ? 'text-gold-400' : 'text-silver-200',
                      )}
                    >
                      {info.priceLabel}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-silver-400">{info.hint}</p>
                  <ul className="mt-2 space-y-1">
                    {detalle.map((linea) => (
                      <li key={linea} className="flex items-center gap-1.5 text-xs text-silver-300">
                        <Check size={13} strokeWidth={3} className="text-success-400" aria-hidden="true" />
                        {linea}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {activa && (
                <p className="mt-3 flex items-center gap-1.5 rounded-xl bg-gold-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-gold-400">
                  <Check size={14} strokeWidth={3} aria-hidden="true" />
                  Modalidad seleccionada
                </p>
              )}
            </button>
          );
        })}
      </div>

      <StickyBar>
        <div className="flex gap-2">
          <Button variant="outline" size="lg" onClick={onBack} aria-label="Volver al paso anterior">
            <ChevronLeft size={20} aria-hidden="true" />
          </Button>
          <Button
            variant="primary"
            size="lg"
            className="flex-1"
            disabled={!mode}
            onClick={onContinue}
          >
            Continuar
            <ArrowRight size={20} strokeWidth={2.5} aria-hidden="true" />
          </Button>
        </div>
        {!mode && (
          <p className="text-center text-xs text-silver-500">Selecciona una modalidad para seguir.</p>
        )}
      </StickyBar>
    </section>
  );
}
