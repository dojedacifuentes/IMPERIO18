import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

/**
 * Barra inferior siempre visible con la acción principal del paso.
 * Va en un portal: si viviera dentro de una sección animada, el `transform`
 * del ancestro la anclaría a la sección en vez de a la pantalla.
 */
export function StickyBar({ children }: { children: ReactNode }) {
  return createPortal(
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30">
      <div className="h-8 bg-gradient-to-t from-imperio-950 to-transparent" />
      <div className="safe-bottom pointer-events-auto border-t border-imperio-700 bg-imperio-950/95 px-4 pt-3 backdrop-blur">
        <div className="mx-auto w-full max-w-md space-y-2">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
