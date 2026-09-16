import { useCallback, useEffect, useState } from 'react';
import { ALL_CHALLENGE_IDS } from '../data/challenges';
import { clearStoredState, loadState, saveState } from '../lib/storage';
import type { ChallengeId, Mode, RegistrationState, Step } from '../types';

const ESTADO_INICIAL: RegistrationState = {
  step: 'identity',
  name: '',
  mode: null,
  selected: [],
  entries: {},
  sentAt: null,
};

/** Estado único del registro, sincronizado con localStorage. */
export function useRegistration() {
  const [state, setState] = useState<RegistrationState>(() => loadState() ?? ESTADO_INICIAL);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const setName = useCallback((name: string) => {
    setState((prev) => ({ ...prev, name }));
  }, []);

  const goToStep = useCallback((step: Step) => {
    setState((prev) => ({ ...prev, step }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const chooseMode = useCallback((mode: Mode) => {
    setState((prev) => ({
      ...prev,
      mode,
      // El pack activa los ocho desafíos; el individual conserva la elección previa.
      selected:
        mode === 'pack'
          ? [...ALL_CHALLENGE_IDS]
          : prev.mode === 'single'
            ? prev.selected.slice(0, 1)
            : [],
    }));
  }, []);

  const selectSingle = useCallback((id: ChallengeId) => {
    setState((prev) => ({ ...prev, selected: [id] }));
  }, []);

  const setBinary = useCallback((id: ChallengeId, achieved: boolean) => {
    setState((prev) => ({
      ...prev,
      entries: { ...prev.entries, [id]: { kind: 'binary', achieved } },
    }));
  }, []);

  const setMeasure = useCallback((id: ChallengeId, raw: string) => {
    setState((prev) => ({
      ...prev,
      entries: { ...prev.entries, [id]: { kind: 'number', raw } },
    }));
  }, []);

  const markSent = useCallback(() => {
    setState((prev) => ({ ...prev, sentAt: new Date().toISOString() }));
  }, []);

  /** Solo se llama después de que la persona confirma. */
  const reset = useCallback(() => {
    clearStoredState();
    setState(ESTADO_INICIAL);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return {
    state,
    setName,
    goToStep,
    chooseMode,
    selectSingle,
    setBinary,
    setMeasure,
    markSent,
    reset,
  };
}

export type Registration = ReturnType<typeof useRegistration>;
