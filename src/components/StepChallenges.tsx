import { ChevronLeft, ClipboardCheck } from 'lucide-react';
import { useRef, useState } from 'react';
import { CHALLENGES } from '../data/challenges';
import { isEntryComplete, validateMeasure } from '../lib/validation';
import type { Challenge, ChallengeId, Entries, Mode } from '../types';
import { ChallengeCard } from './ChallengeCard';
import { ProgressBar } from './ProgressBar';
import { StickyBar } from './StickyBar';
import { Button } from './ui/Button';

interface Props {
  mode: Mode;
  selected: ChallengeId[];
  entries: Entries;
  onSelectSingle: (id: ChallengeId) => void;
  onBinary: (id: ChallengeId, achieved: boolean) => void;
  onMeasure: (id: ChallengeId, raw: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

/** Pasos 3 y 4: elegir el desafío (si corresponde) y registrar los resultados. */
export function StepChallenges({
  mode,
  selected,
  entries,
  onSelectSingle,
  onBinary,
  onMeasure,
  onBack,
  onContinue,
}: Props) {
  const [intentado, setIntentado] = useState(false);
  const inputs = useRef<Partial<Record<ChallengeId, HTMLInputElement | null>>>({});

  const esPack = mode === 'pack';
  const elegido = selected[0];
  const completados = CHALLENGES.filter(
    (challenge) => selected.includes(challenge.id) && isEntryComplete(challenge, entries[challenge.id]),
  );

  function errorDe(challenge: Challenge): string | undefined {
    if (!selected.includes(challenge.id)) return undefined;
    const entry = entries[challenge.id];

    if (challenge.kind === 'binary') {
      if (entry || !intentado || esPack) return undefined;
      return 'Marca si lo lograste o no.';
    }

    const raw = entry?.kind === 'number' ? entry.raw : '';
    if (raw.trim() === '') {
      return intentado && !esPack ? 'Escribe tu resultado para continuar.' : undefined;
    }
    const validacion = validateMeasure(raw, challenge.unit ?? 'kg');
    return validacion.ok ? undefined : validacion.error;
  }

  function continuar() {
    if (esPack) {
      onContinue();
      return;
    }
    const challenge = CHALLENGES.find((c) => c.id === elegido);
    if (!challenge || !isEntryComplete(challenge, entries[challenge.id])) {
      setIntentado(true);
      if (challenge && challenge.kind !== 'binary') {
        inputs.current[challenge.id]?.focus();
      }
      return;
    }
    onContinue();
  }

  const puedeContinuar = esPack || Boolean(elegido);

  return (
    <section className="animate-fade-up">
      <h2 className="text-lg font-bold text-silver-100">
        {esPack ? 'Registra tus ocho marcas' : 'Elige tu desafío'}
      </h2>
      <p className="mb-4 mt-1 text-sm text-silver-400">
        {esPack
          ? 'Puedes completarlos en cualquier orden y enviar cuando quieras.'
          : 'Toca un desafío y registra tu resultado.'}
      </p>

      {esPack && <ProgressBar done={completados.length} total={CHALLENGES.length} />}

      <div className="space-y-3">
        {CHALLENGES.map((challenge) => {
          const activo = esPack || elegido === challenge.id;
          return (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              entry={entries[challenge.id]}
              done={selected.includes(challenge.id) && isEntryComplete(challenge, entries[challenge.id])}
              active={activo}
              selectable={!esPack && !activo}
              error={errorDe(challenge)}
              inputRef={(element) => {
                inputs.current[challenge.id] = element;
              }}
              onSelect={() => {
                setIntentado(false);
                onSelectSingle(challenge.id);
              }}
              onBinary={(achieved) => onBinary(challenge.id, achieved)}
              onMeasure={(raw) => onMeasure(challenge.id, raw)}
            />
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
            disabled={!puedeContinuar}
            onClick={continuar}
          >
            <ClipboardCheck size={20} strokeWidth={2.5} aria-hidden="true" />
            Revisar y enviar
          </Button>
        </div>
        <p className="text-center text-xs text-silver-500">
          {esPack
            ? `${completados.length} de ${CHALLENGES.length} desafíos con resultado`
            : elegido
              ? 'Registra tu resultado para continuar.'
              : 'Elige uno de los ocho desafíos.'}
        </p>
      </StickyBar>
    </section>
  );
}
