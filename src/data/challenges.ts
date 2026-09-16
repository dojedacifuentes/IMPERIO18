import { Disc3, Dumbbell, Hammer, Hand, MoveUp, RefreshCw, Scale, Swords } from 'lucide-react';
import type { Challenge, ChallengeId } from '../types';

export const CHALLENGES: Challenge[] = [
  {
    id: 1,
    emoji: '🤼',
    name: 'Derrota al campeón',
    messageName: 'Derrota al campeón',
    icon: Swords,
    kind: 'binary',
    resultLabel: 'Resultado',
    short: 'Vence al campeón nacional en menos de 5 segundos.',
    detail:
      'Te enfrentas en armwrestling a un campeón nacional. Tienes un máximo de cinco segundos para derrotarlo.',
  },
  {
    id: 2,
    emoji: '🔨',
    name: 'El martillo de Thor',
    messageName: 'Martillo de Thor',
    icon: Hammer,
    kind: 'binary',
    resultLabel: 'Resultado',
    short: 'Levanta el martillo y deja el brazo en 90°.',
    detail:
      'Levanta el martillo y coloca el brazo en una posición de 90 grados. Debes sostener la posición para que el intento cuente como logrado.',
  },
  {
    id: 3,
    emoji: '💿',
    name: 'Emboque de disco',
    messageName: 'Emboque de disco',
    icon: Disc3,
    kind: 'binary',
    resultLabel: 'Resultado',
    short: 'Cuelga el disco de 25 kg en la barra.',
    detail:
      'Levanta un disco de 25 kg y cuélgalo correctamente en la barra. Si el disco no queda colgado, el intento no se considera logrado.',
  },
  {
    id: 4,
    emoji: '⚖️',
    name: 'Equilibrio extremo',
    messageName: 'Equilibrio extremo',
    icon: Scale,
    kind: 'binary',
    resultLabel: 'Resultado',
    short: 'Sube al BOSU y aguanta 5 segundos con el plato.',
    detail:
      'Sube al BOSU, recoge un plato plástico del suelo, colócalo sobre la rodilla, mantén el equilibrio durante cinco segundos y vuelve a dejar el plato en el suelo sin caerte.',
  },
  {
    id: 5,
    emoji: '🦍',
    name: 'Búsqueda del gorila',
    messageName: 'Búsqueda del gorila',
    icon: Hand,
    kind: 'seconds',
    unit: 'segundos',
    resultLabel: 'Tiempo',
    short: 'Cuélgate de la barra con una sola mano.',
    detail:
      'Permanece colgado de la barra con una sola mano durante el mayor tiempo posible. Se registra el tiempo total en segundos.',
  },
  {
    id: 6,
    emoji: '⬆️',
    name: 'Rise',
    messageName: 'Rise',
    icon: MoveUp,
    kind: 'kg',
    unit: 'kg',
    resultLabel: 'Fuerza registrada',
    short: 'Máxima fuerza en el movimiento de rise.',
    detail:
      'Realiza la mayor cantidad de fuerza posible mediante el movimiento de rise. Se registran los kilogramos que marque el equipo.',
  },
  {
    id: 7,
    emoji: '🔄',
    name: 'Pronación',
    messageName: 'Pronación',
    icon: RefreshCw,
    kind: 'kg',
    unit: 'kg',
    resultLabel: 'Fuerza registrada',
    short: 'Máxima fuerza en el movimiento de pronación.',
    detail:
      'Realiza la mayor cantidad de fuerza posible mediante el movimiento de pronación. Se registran los kilogramos que marque el equipo.',
  },
  {
    id: 8,
    emoji: '💪',
    name: 'Back Pressure',
    messageName: 'Back Pressure',
    icon: Dumbbell,
    kind: 'kg',
    unit: 'kg',
    resultLabel: 'Fuerza registrada',
    short: 'Máxima fuerza en el movimiento de back pressure.',
    detail:
      'Realiza la mayor cantidad de fuerza posible mediante el movimiento de back pressure. Se registran los kilogramos que marque el equipo.',
  },
];

export const ALL_CHALLENGE_IDS: ChallengeId[] = CHALLENGES.map((c) => c.id);

export function getChallenge(id: ChallengeId): Challenge {
  const challenge = CHALLENGES.find((c) => c.id === id);
  if (!challenge) throw new Error(`Desafío desconocido: ${id}`);
  return challenge;
}

/** Etiqueta corta del tipo de resultado, para las tarjetas. */
export function resultKindLabel(challenge: Challenge): string {
  if (challenge.kind === 'binary') return 'Logrado / No logrado';
  return challenge.kind === 'seconds' ? 'Tiempo en segundos' : 'Fuerza en kg';
}
