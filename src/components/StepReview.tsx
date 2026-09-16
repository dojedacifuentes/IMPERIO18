import {
  ChevronDown,
  CircleAlert,
  MessageCircle,
  Pencil,
  RotateCcw,
  Send,
  TriangleAlert,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { cn } from '../lib/cn';
import { MODES, WHATSAPP_CONTACT } from '../lib/constants';
import { buildResultLines, pendingChallenges } from '../lib/results';
import { buildMessage, buildWhatsAppUrl } from '../lib/whatsapp';
import type { ChallengeId, Entries, Mode } from '../types';
import { ConfirmDialog } from './ConfirmDialog';
import { StickyBar } from './StickyBar';
import { Button, buttonClasses } from './ui/Button';

interface Props {
  name: string;
  mode: Mode;
  selected: ChallengeId[];
  entries: Entries;
  sentAt: string | null;
  onEdit: () => void;
  onSent: () => void;
  onReset: () => void;
}

/** Paso 5: resumen, advertencias y envío por WhatsApp. */
export function StepReview({
  name,
  mode,
  selected,
  entries,
  sentAt,
  onEdit,
  onSent,
  onReset,
}: Props) {
  const [verMensaje, setVerMensaje] = useState(false);
  const [confirmando, setConfirmando] = useState(false);

  const modalidad = MODES[mode];
  const lines = useMemo(() => buildResultLines(selected, entries), [selected, entries]);
  const pendientes = useMemo(() => pendingChallenges(selected, entries), [selected, entries]);
  const mensaje = useMemo(
    () => buildMessage({ name, mode, lines, date: new Date() }),
    [name, mode, lines],
  );

  const sinResultados = lines.length === 0;
  const enviado = Boolean(sentAt);

  function abrirWhatsApp(event: React.MouseEvent<HTMLAnchorElement>) {
    // Se recalcula al tocar para que la hora del mensaje sea la del envío.
    event.currentTarget.href = buildWhatsAppUrl(
      buildMessage({ name, mode, lines, date: new Date() }),
    );
    onSent();
  }

  return (
    <section className="animate-fade-up">
      <h2 className="text-lg font-bold text-silver-100">Revisa antes de enviar</h2>
      <p className="mb-4 mt-1 text-sm text-silver-400">
        Esto es lo que recibirá {WHATSAPP_CONTACT}.
      </p>

      <dl className="card mb-3 divide-y divide-imperio-700">
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <dt className="text-xs font-bold uppercase tracking-wider text-silver-400">
            Participante
          </dt>
          <dd className="truncate text-right font-bold text-silver-100">{name}</dd>
        </div>
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <dt className="text-xs font-bold uppercase tracking-wider text-silver-400">Modalidad</dt>
          <dd className="text-right font-bold text-silver-100">{modalidad.label}</dd>
        </div>
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <dt className="text-xs font-bold uppercase tracking-wider text-silver-400">Valor</dt>
          <dd className="text-right font-display text-xl font-extrabold text-gold-400">
            {modalidad.priceLabel}
          </dd>
        </div>
      </dl>

      <div className="card mb-3 overflow-hidden">
        <h3 className="border-b border-imperio-700 bg-imperio-900/60 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-silver-300">
          Resultados registrados ({lines.length})
        </h3>
        {sinResultados ? (
          <p className="flex items-start gap-2 px-4 py-4 text-sm text-silver-400">
            <CircleAlert size={16} className="mt-0.5 shrink-0 text-danger-400" aria-hidden="true" />
            Todavía no hay ningún resultado registrado.
          </p>
        ) : (
          <ul className="divide-y divide-imperio-700">
            {lines.map((line) => (
              <li
                key={line.challenge.id}
                className="flex items-center justify-between gap-3 px-4 py-3"
              >
                <span className="flex min-w-0 items-center gap-2">
                  <span aria-hidden="true">{line.challenge.emoji}</span>
                  <span className="truncate text-sm text-silver-200">{line.challenge.name}</span>
                </span>
                <span
                  className={cn(
                    'shrink-0 text-right text-sm font-bold',
                    line.text === 'No logrado' ? 'text-silver-300' : 'text-success-400',
                  )}
                >
                  {line.text}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {pendientes.length > 0 && (
        <div className="mb-3 rounded-2xl border border-gold-500/60 bg-gold-500/10 p-4">
          <p className="flex items-start gap-2 text-sm font-semibold text-gold-300">
            <TriangleAlert size={17} className="mt-0.5 shrink-0" aria-hidden="true" />
            Todavía existen desafíos sin resultado. Puedes continuar y enviar solamente los registros
            completados.
          </p>
          <ul className="mt-2 space-y-1 pl-7">
            {pendientes.map((challenge) => (
              <li key={challenge.id} className="text-xs text-silver-300">
                {challenge.emoji} {challenge.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="card mb-3 overflow-hidden">
        <button
          type="button"
          onClick={() => setVerMensaje((valor) => !valor)}
          aria-expanded={verMensaje}
          aria-controls="vista-mensaje"
          className="flex w-full items-center justify-between px-4 py-3 text-xs font-bold uppercase tracking-wider text-silver-300"
        >
          {verMensaje ? 'Ocultar mensaje' : 'Ver mensaje que se enviará'}
          <ChevronDown
            size={16}
            className={cn('transition-transform', verMensaje && 'rotate-180')}
            aria-hidden="true"
          />
        </button>
        <pre
          id="vista-mensaje"
          hidden={!verMensaje}
          className="whitespace-pre-wrap break-words border-t border-imperio-700 bg-imperio-900/60 px-4 py-3 font-sans text-xs leading-relaxed text-silver-300"
        >
          {mensaje}
        </pre>
      </div>

      {enviado && (
        <div className="card animate-pop border-whatsapp-500/60 bg-whatsapp-500/10 p-4">
          <p className="flex items-start gap-2 text-sm font-semibold text-whatsapp-400">
            <MessageCircle size={17} className="mt-0.5 shrink-0" aria-hidden="true" />
            Abrimos WhatsApp con tu resumen. Revisa el mensaje y presiona enviar dentro de WhatsApp.
          </p>
          <p className="mt-2 pl-7 text-xs text-silver-400">
            Tus resultados siguen guardados aquí por si necesitas enviarlos otra vez.
          </p>
        </div>
      )}

      <StickyBar>
        {sinResultados ? (
          <Button variant="whatsapp" size="lg" fullWidth disabled>
            <Send size={20} aria-hidden="true" />
            Enviar a Brayan por WhatsApp
          </Button>
        ) : (
          <a
            href={buildWhatsAppUrl(mensaje)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={abrirWhatsApp}
            className={cn(buttonClasses('whatsapp', 'lg'), 'w-full')}
          >
            <Send size={20} aria-hidden="true" />
            {enviado ? 'Volver a abrir WhatsApp' : 'Enviar a Brayan por WhatsApp'}
          </a>
        )}

        <div className="flex gap-2">
          <Button variant="outline" size="md" className="flex-1" onClick={onEdit}>
            <Pencil size={17} aria-hidden="true" />
            Editar resultados
          </Button>
          {enviado && (
            <Button
              variant="outline"
              size="md"
              className="flex-1"
              onClick={() => setConfirmando(true)}
            >
              <RotateCcw size={17} aria-hidden="true" />
              Otro participante
            </Button>
          )}
        </div>

        <p className="text-center text-[11px] text-silver-500">
          El mensaje se abre en WhatsApp: debes presionar enviar dentro de la aplicación.
        </p>
      </StickyBar>

      <ConfirmDialog
        open={confirmando}
        title="¿Quieres borrar estos resultados y comenzar un nuevo registro?"
        description={`Se borrará el registro de ${name} en este teléfono. No se puede deshacer.`}
        confirmLabel="Sí, borrar"
        cancelLabel="Cancelar"
        onCancel={() => setConfirmando(false)}
        onConfirm={() => {
          setConfirmando(false);
          onReset();
        }}
      />
    </section>
  );
}
