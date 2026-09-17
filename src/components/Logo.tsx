import { useState } from 'react';
import { cn } from '../lib/cn';
import { LOGO_SRC, LOGO_VECTOR } from '../lib/constants';

/**
 * Emblema del Team Imperio.
 * La ruta se define en `constants.ts`. Si el archivo configurado no existe,
 * cae en el emblema vectorial que viaja con el proyecto.
 */
export function Logo({ size = 96, className }: { size?: number; className?: string }) {
  const [src, setSrc] = useState(LOGO_SRC);

  return (
    <img
      src={src}
      onError={() => setSrc(LOGO_VECTOR)}
      width={size}
      height={size}
      alt="Team Imperio · V Región"
      className={cn(
        'block shrink-0 object-contain drop-shadow-[0_6px_18px_rgba(37,99,235,0.35)]',
        className,
      )}
      style={{ width: size, height: size }}
      decoding="async"
    />
  );
}
