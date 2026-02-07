import { useEffect } from 'react';

interface UseKeyboardNavigationProps {
  onNext: () => void;
  onPrev: () => void;
  onFirst?: () => void;
  onLast?: () => void;
  onHelp?: () => void;
  onEscape?: () => void;
  disabled?: boolean;
}

export function useKeyboardNavigation({
  onNext,
  onPrev,
  onFirst,
  onLast,
  onHelp,
  onEscape,
  disabled = false,
}: UseKeyboardNavigationProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Always allow Escape key
      if (e.key === 'Escape' && onEscape) {
        e.preventDefault();
        onEscape();
        return;
      }

      // Always allow help key (? or /)
      if ((e.key === '?' || e.key === '/') && onHelp) {
        e.preventDefault();
        onHelp();
        return;
      }

      if (disabled) return;

      // Navigate forward with ArrowRight, ArrowDown, or Space/PageDown
      if (
        e.key === 'ArrowRight' ||
        e.key === 'ArrowDown' ||
        e.key === ' ' ||
        e.key === 'PageDown'
      ) {
        e.preventDefault();
        onNext();
        return;
      }

      // Navigate backward with ArrowLeft, ArrowUp, or PageUp
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        onPrev();
        return;
      }

      // Home key - go to first slide
      if (e.key === 'Home' && onFirst) {
        e.preventDefault();
        onFirst();
        return;
      }

      // End key - go to last slide
      if (e.key === 'End' && onLast) {
        e.preventDefault();
        onLast();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onPrev, onFirst, onLast, onHelp, onEscape, disabled]);
}
