import { AppHeader } from './components/AppHeader';
import { SafetyNotice } from './components/SafetyNotice';
import { StepChallenges } from './components/StepChallenges';
import { StepIdentity } from './components/StepIdentity';
import { StepIndicator } from './components/StepIndicator';
import { StepMode } from './components/StepMode';
import { StepReview } from './components/StepReview';
import { useRegistration } from './hooks/useRegistration';
import { validateName } from './lib/validation';
import type { RegistrationState, Step } from './types';

const ORDEN: Step[] = ['identity', 'mode', 'challenges', 'review'];

/**
 * Nunca se muestra un paso por delante de los datos disponibles: protege contra
 * un localStorage a medias o modificado a mano.
 */
function pasoEfectivo(state: RegistrationState): Step {
  if (!validateName(state.name).ok) return 'identity';
  const indice = ORDEN.indexOf(state.step);
  if (!state.mode && indice > 1) return 'mode';
  if (state.selected.length === 0 && state.step === 'review') return 'challenges';
  return state.step;
}

export default function App() {
  const {
    state,
    setName,
    goToStep,
    chooseMode,
    selectSingle,
    setBinary,
    setMeasure,
    markSent,
    reset,
  } = useRegistration();

  const step = pasoEfectivo(state);

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader compact={step !== 'identity'} />

      <main
        className={`mx-auto w-full max-w-md flex-1 px-4 ${step === 'review' ? 'pb-56' : 'pb-40'}`}
      >
        <StepIndicator current={step} onGoToStep={goToStep} />

        {step === 'identity' && (
          <StepIdentity
            name={state.name}
            onChange={setName}
            onContinue={(nombre) => {
              setName(nombre);
              goToStep('mode');
            }}
          />
        )}

        {step === 'mode' && (
          <StepMode
            mode={state.mode}
            onChoose={chooseMode}
            onBack={() => goToStep('identity')}
            onContinue={() => goToStep('challenges')}
          />
        )}

        {step === 'challenges' && state.mode && (
          <StepChallenges
            mode={state.mode}
            selected={state.selected}
            entries={state.entries}
            onSelectSingle={selectSingle}
            onBinary={setBinary}
            onMeasure={setMeasure}
            onBack={() => goToStep('mode')}
            onContinue={() => goToStep('review')}
          />
        )}

        {step === 'review' && state.mode && (
          <StepReview
            name={state.name}
            mode={state.mode}
            selected={state.selected}
            entries={state.entries}
            sentAt={state.sentAt}
            onEdit={() => goToStep('challenges')}
            onSent={markSent}
            onReset={reset}
          />
        )}

        <SafetyNotice />
      </main>
    </div>
  );
}
