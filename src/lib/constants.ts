import type { Mode } from '../types';

/** Destinatario de todos los resultados. */
export const WHATSAPP_NUMBER = '56949671466';
export const WHATSAPP_CONTACT = 'Brayan Morales';
export const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export const MODES: Record<Mode, { label: string; price: number; priceLabel: string; hint: string }> = {
  single: {
    label: 'Un desafío',
    price: 2000,
    priceLabel: '$2.000',
    hint: 'Eliges uno de los ocho desafíos.',
  },
  pack: {
    label: 'Pack completo',
    price: 10000,
    priceLabel: '$10.000',
    hint: 'Incluye los ocho desafíos.',
  },
};


/**
 * Ruta del emblema del Team Imperio.
 * El proyecto trae el emblema vectorial: carga al instante y se ve nítido en
 * cualquier pantalla. Si subes el PNG oficial a `public/logo-imperio.png`,
 * cambia esta línea a '/logo-imperio.png'. Si ese archivo llegara a faltar,
 * la app vuelve sola al vectorial.
 */
export const LOGO_SRC = '/logo-imperio.svg';

/** Emblema que siempre viaja con el proyecto. */
export const LOGO_VECTOR = '/logo-imperio.svg';

export const SAFETY_NOTICE =
  'Realiza los desafíos bajo supervisión. Detén el intento ante dolor, mareo o pérdida de control.';
