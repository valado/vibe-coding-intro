import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../../theme/useTheme';

interface NavigationControlsProps {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onShowOverview: () => void;
}

export function NavigationControls({
  current,
  total,
  onPrev,
  onNext,
  onShowOverview,
}: NavigationControlsProps) {
  const { theme } = useTheme();

  return (
    <nav
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
        padding: '16px 0',
        zIndex: 20,
      }}
    >
      <button
        className="nb"
        onClick={onPrev}
        disabled={current === 0}
        style={{ color: theme.text }}
        title={current === 0 ? 'First slide' : 'Previous slide (←, ↑, or PgUp)'}
        aria-label="Previous slide"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={onShowOverview}
        style={{
          background: 'none',
          border: `1px solid ${theme.border}`,
          borderRadius: 8,
          padding: '5px 14px',
          color: theme.textMuted,
          fontSize: '0.82rem',
          fontWeight: 500,
          cursor: 'pointer',
          fontFamily: 'inherit',
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = theme.accentBorder;
          e.currentTarget.style.color = theme.text;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = theme.border;
          e.currentTarget.style.color = theme.textMuted;
        }}
        title="Open slide overview (use arrow keys to navigate)"
        aria-label="Open slide overview"
      >
        {current + 1} / {total}
      </button>
      <button
        className="nb"
        onClick={onNext}
        disabled={current === total - 1}
        style={{ color: theme.text }}
        title={current === total - 1 ? 'Last slide' : 'Next slide (→, ↓, Space, or PgDn)'}
        aria-label="Next slide"
      >
        <ChevronRight size={22} />
      </button>
    </nav>
  );
}
