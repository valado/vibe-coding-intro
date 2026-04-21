import { useEffect, useRef } from 'react';
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

  // Keep a ref to totalSlides so the effect can read the latest value
  const totalRef = useRef(totalSlides);
  totalRef.current = totalSlides;

  // Sync current slide from URL on mount and when URL changes
  useEffect(() => {
    if (slideId) {
      const slideIndex = parseInt(slideId, 10);
      if (!isNaN(slideIndex) && slideIndex >= 0 && slideIndex < totalRef.current) {
        if (slideIndex !== currentSlide) {
          onSlideChange(slideIndex);
        }
      } else {
        navigate('/', { replace: true });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideId]);
}
