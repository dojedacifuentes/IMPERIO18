import type { ComponentPropsWithRef } from 'react';
import { cn } from '../../lib/cn';

export type ButtonVariant = 'primary' | 'whatsapp' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

const BASE =
  'inline-flex select-none items-center justify-center gap-2 rounded-2xl font-display uppercase tracking-wide leading-none transition-colors duration-150 active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100';

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-b from-gold-400 to-gold-600 text-imperio-950 shadow-gold hover:from-gold-300 hover:to-gold-500',
  whatsapp:
    'bg-gradient-to-b from-whatsapp-400 to-whatsapp-600 text-imperio-950 shadow-green hover:from-whatsapp-400 hover:to-whatsapp-500',
  outline:
    'border-2 border-imperio-600 bg-imperio-850 text-silver-100 hover:border-gold-500 hover:text-gold-300',
  ghost: 'text-silver-300 hover:text-gold-300',
  danger: 'border-2 border-danger-600 bg-danger-600/15 text-danger-400 hover:bg-danger-600/25',
};

const SIZES: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-5 text-base',
  lg: 'h-14 px-6 text-lg',
};

export function buttonClasses(variant: ButtonVariant = 'primary', size: ButtonSize = 'md'): string {
  return cn(BASE, VARIANTS[variant], SIZES[size]);
}

interface ButtonProps extends ComponentPropsWithRef<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonClasses(variant, size), fullWidth && 'w-full', className)}
      {...props}
    />
  );
}
