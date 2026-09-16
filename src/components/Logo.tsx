import { useState } from 'react';
import { cn } from '../lib/cn';

/**
 * Emblema del Team Imperio.
 * Usa el PNG oficial si existe en `public/logo-imperio.png`; si no, cae en el
 * emblema vectorial que viaja con el proyecto (más liviano y siempre nítido).
 */
export function Logo({ size = 96, className }: { size?: number; className?: string }) {
  const [src, setSrc] = useState('/logo-imperio.png');

  return (
    <img
      src={src}
      onError={() => setSrc('/logo-imperio.svg')}
      width={size}
      height={size}
      alt="Team Imperio · V Región"
      className={cn('block shrink-0 object-contain drop-shadow-[0_6px_18px_rgba(37,99,235,0.35)]', className)}
      style={{ width: size, height: size }}
      decoding="async"
    />
  );
}
