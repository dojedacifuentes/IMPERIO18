import { ArrowRight } from 'lucide-react';
import { useRef, useState } from 'react';
import { cn } from '../lib/cn';
import { MAX_NAME_LENGTH, validateName } from '../lib/validation';
import { StickyBar } from './StickyBar';
import { Button } from './ui/Button';

interface Props {
  name: string;
  onChange: (name: string) => void;
  onContinue: (name: string) => void;
}

const FORM_ID = 'form-identidad';

/** Paso 1: lo único que se pide es el nombre o apodo. */
export function StepIdentity({ name, onChange, onContinue }: Props) {
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function enviar() {
    const resultado = validateName(name);
    if (!resultado.ok) {
      setError(resultado.error);
      inputRef.current?.focus();
      return;
    }
    setError(null);
    onContinue(resultado.value);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    enviar();
  }

  return (
    <section className="animate-fade-up">
      <form id={FORM_ID} onSubmit={handleSubmit} noValidate>
        <label htmlFor="nombre" className="block text-lg font-bold text-silver-100">
          Nombre o apodo
        </label>
        <p className="mb-3 mt-1 text-sm text-silver-400">
          Así aparecerá en el mensaje que recibe Brayan.
        </p>
        <input
          id="nombre"
          ref={inputRef}
          value={name}
          onChange={(event) => {
            onChange(event.target.value);
            if (error) setError(null);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              enviar();
            }
          }}
          type="text"
          inputMode="text"
          autoComplete="off"
          autoCapitalize="words"
          autoCorrect="off"
          enterKeyHint="go"
          maxLength={MAX_NAME_LENGTH}
          placeholder="Ej: El Gorila"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? 'nombre-error' : 'nombre-ayuda'}
          className={cn(
            'w-full rounded-2xl border-2 bg-imperio-850 px-4 py-4 text-xl font-semibold text-silver-100 placeholder:text-silver-500',
            error ? 'border-danger-500' : 'border-imperio-600 focus:border-gold-500',
          )}
        />
        {error ? (
          <p id="nombre-error" role="alert" className="mt-2 text-sm font-semibold text-danger-400">
            {error}
          </p>
        ) : (
          <p id="nombre-ayuda" className="mt-2 text-xs text-silver-500">
            Máximo {MAX_NAME_LENGTH} caracteres. No pedimos ningún otro dato.
          </p>
        )}
      </form>

      <StickyBar>
        <Button type="submit" form={FORM_ID} variant="primary" size="lg" fullWidth>
          Continuar
          <ArrowRight size={20} strokeWidth={2.5} aria-hidden="true" />
        </Button>
      </StickyBar>
    </section>
  );
}
