import { useEffect, useState, useRef } from 'react';
import { X } from 'lucide-react';
import { useTheme } from '../../theme/useTheme';
import { SlideData } from '../../types';

interface SlideOverviewProps {
  slides: SlideData[];
  currentSlide: number;
  onClose: () => void;
  onSelectSlide: (index: number) => void;
}

export function SlideOverview({
  slides,
  currentSlide,
  onClose,
  onSelectSlide,
}: SlideOverviewProps) {
  const { theme } = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(currentSlide);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Keyboard navigation within overview
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const cols = window.innerWidth <= 768 ? 1 : 2; // Match grid columns

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(slides.length - 1, prev + 1));
          break;
        case 'ArrowLeft':
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(0, prev - 1));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(slides.length - 1, prev + cols));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(0, prev - cols));
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          onSelectSlide(selectedIndex);
          break;
        case 'Home':
          e.preventDefault();
          setSelectedIndex(0);
          break;
        case 'End':
          e.preventDefault();
          setSelectedIndex(slides.length - 1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length, selectedIndex, onSelectSlide]);

  // Auto-scroll to selected slide
  useEffect(() => {
    buttonRefs.current[selectedIndex]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }, [selectedIndex]);

  return (
    <div
      className="ov-overlay"
      onClick={onClose}
      style={{ backgroundColor: theme.overlayBg, backdropFilter: 'blur(8px)' }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ width: '90%', maxWidth: 640, maxHeight: '80vh', overflow: 'auto', padding: 24 }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: theme.text }}>All Slides</h3>
          <button className="ib" onClick={onClose} style={{ color: theme.textMuted }}>
            <X size={18} />
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {slides.map((slide, i) => (
            <button
              key={i}
              ref={(el) => (buttonRefs.current[i] = el)}
              className="ov-card"
              onClick={() => onSelectSlide(i)}
              onMouseEnter={() => setSelectedIndex(i)}
              style={{
                background:
                  i === selectedIndex
                    ? theme.accentSoft
                    : i === currentSlide
                      ? theme.surfaceHover
                      : theme.surface,
                borderColor:
                  i === selectedIndex
                    ? theme.accentBorder
                    : i === currentSlide
                      ? theme.border
                      : theme.border,
                outline: i === selectedIndex ? `2px solid ${theme.accent}` : 'none',
                outlineOffset: -2,
              }}
            >
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <span
                  style={{
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    color: i === selectedIndex ? theme.accent : theme.textMuted,
                    minWidth: 24,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ fontWeight: 600, fontSize: '0.88rem', color: theme.text }}>
                  {slide.title.replace('\n', ' ')}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
