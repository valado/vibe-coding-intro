import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface UseUrlSyncProps {
  currentSlide: number;
  totalSlides: number;
  onSlideChange: (slideIndex: number) => void;
}

export function useUrlSync({ currentSlide, totalSlides, onSlideChange }: UseUrlSyncProps) {
  const { slideId } = useParams<{ slideId: string }>();
  const navigate = useNavigate();

  // Sync URL to current slide
  useEffect(() => {
    const expectedPath = currentSlide === 0 ? '/' : `/slide/${currentSlide}`;
    const currentPath = window.location.pathname;

    if (currentPath !== expectedPath) {
      navigate(expectedPath, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide]);

  // Sync current slide from URL on mount and when URL changes
  useEffect(() => {
    if (slideId) {
      const slideIndex = parseInt(slideId, 10);
      if (!isNaN(slideIndex) && slideIndex >= 0 && slideIndex < totalSlides) {
        if (slideIndex !== currentSlide) {
          onSlideChange(slideIndex);
        }
      } else {
        // Invalid slide ID, redirect to first slide
        navigate('/', { replace: true });
      }
    }
    // Note: Only sync FROM URL when slideId changes, not when currentSlide changes
    // This prevents infinite loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideId, totalSlides]);
}
