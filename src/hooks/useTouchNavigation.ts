import { useState } from 'react';

interface UseTouchNavigationProps {
  onNext: () => void;
  onPrev: () => void;
}

export function useTouchNavigation({ onNext, onPrev }: UseTouchNavigationProps) {
  const [touchX, setTouchX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchX === null) return;

    const delta = touchX - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 60) {
      delta > 0 ? onNext() : onPrev();
    }
    setTouchX(null);
  };

  return { handleTouchStart, handleTouchEnd };
}
