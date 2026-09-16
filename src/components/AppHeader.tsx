import { Logo } from './Logo';

/** Encabezado único de la app: emblema, nombre y promesa en una línea. */
export function AppHeader({ compact }: { compact: boolean }) {
  if (compact) {
    return (
      <header className="safe-top sticky top-0 z-20 border-b border-imperio-700 bg-imperio-950/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-md items-center gap-3 px-4 pb-3">
          <Logo size={44} />
          <div className="min-w-0">
            <h1 className="truncate text-xl font-extrabold text-silver-100">Desafíos de Brayan</h1>
            <p className="truncate text-xs font-semibold uppercase tracking-widest text-gold-400">
              ¿Tienes lo necesario?
            </p>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="safe-top border-b border-imperio-700 bg-imperio-950/70">
      <div className="mx-auto flex w-full max-w-md flex-col items-center gap-2 px-4 pb-5 pt-2 text-center">
        <Logo size={116} className="animate-fade-up" />
        <h1 className="text-3xl font-extrabold leading-none text-silver-100">Desafíos de Brayan</h1>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold-400">
          ¿Tienes lo necesario?
        </p>
        <p className="text-sm text-silver-300">Elige tu desafío, registra tu marca y envíala.</p>
      </div>
    </header>
  );
}
