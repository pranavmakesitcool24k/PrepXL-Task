import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ControlButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}

export function ControlButton({
  onClick,
  isActive = false,
  disabled = false,
  children,
  className,
}: ControlButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'relative px-8 py-3 rounded-xl font-medium text-sm',
        'transition-all duration-300 ease-out',
        'border border-transparent',
        'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background',
        isActive
          ? 'bg-destructive text-destructive-foreground border-destructive/30 hover:bg-destructive/90'
          : 'bg-primary text-primary-foreground hover:bg-primary/90',
        disabled && 'opacity-50 cursor-not-allowed',
        !disabled && !isActive && 'glow-primary hover:shadow-lg',
        className
      )}
    >
      {/* Glow effect */}
      <div
        className={cn(
          'absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300',
          isActive ? 'bg-destructive/20' : 'bg-primary/20',
          !disabled && 'group-hover:opacity-100'
        )}
      />
      
      <span className="relative flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
}
