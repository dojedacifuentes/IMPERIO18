interface Props {
  done: number;
  total: number;
}

/** Avance del pack completo. */
export function ProgressBar({ done, total }: Props) {
  const porcentaje = total === 0 ? 0 : Math.round((done / total) * 100);
  return (
    <div className="card mb-4 p-3">
      <div className="flex items-baseline justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-silver-300">
          Avance del pack
        </span>
        <span className="font-display text-lg font-extrabold text-gold-400">
          {done} de {total}
        </span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={done}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`${done} de ${total} desafíos completados`}
        className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-imperio-700"
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-300 transition-all duration-300"
          style={{ width: `${porcentaje}%` }}
        />
      </div>
    </div>
  );
}
