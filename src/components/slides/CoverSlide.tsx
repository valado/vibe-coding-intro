import { ChevronRight } from 'lucide-react';
import { CoverSlideData } from '../../types';
import { useTheme } from '../../theme/useTheme';

interface CoverSlideProps {
  data: CoverSlideData;
}

export function CoverSlide({ data }: CoverSlideProps) {
  const { theme } = useTheme();

  return (
    <div
      className="r-pad slide-scroll"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        height: '100%',
        width: '100%',
        position: 'relative',
        padding: '40px 32px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: theme.heroGrad,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '12%',
          right: '12%',
          width: 180,
          height: 180,
          borderRadius: '50%',
          border: `1px solid ${theme.accentBorder}`,
          backgroundColor: theme.accentSoft,
          opacity: 0.7,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '18%',
          left: '10%',
          width: 110,
          height: 110,
          borderRadius: '50%',
          border: `1px solid ${theme.accentBorder}`,
          backgroundColor: theme.accentSoft,
          opacity: 0.7,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {data.badge && (
          <div
            className="s1"
            style={{
              display: 'inline-block',
              padding: '6px 16px',
              borderRadius: 20,
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              color: theme.accent,
              background: theme.accentSoft,
              border: `1px solid ${theme.accentBorder}`,
              marginBottom: 28,
            }}
          >
            {data.badge}
          </div>
        )}
        <h1
          className="t-lg s2"
          style={{
            fontSize: '3.5rem',
            fontWeight: 900,
            lineHeight: 1.08,
            color: theme.text,
            whiteSpace: 'pre-line',
          }}
        >
          {data.title}
        </h1>
        <p
          className="s3"
          style={{
            fontSize: '1.2rem',
            color: theme.textMuted,
            marginTop: 20,
            lineHeight: 1.6,
          }}
        >
          {data.subtitle}
        </p>

        <div
          className="s5"
          style={{
            marginTop: 28,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 20px',
            borderRadius: 24,
            fontSize: '0.82rem',
            fontWeight: 600,
            letterSpacing: '0.04em',
            color: theme.accent,
            background: theme.accentSoft,
            border: `1px solid ${theme.accentBorder}`,
          }}
        >
          <span>This presentation was vibe-coded</span>
        </div>
        <div
          className="s4"
          style={{
            marginTop: 48,
            fontSize: '0.85rem',
            color: theme.textMuted,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <span
            style={{
              animation: 'pulse 2s ease-in-out infinite',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            <ChevronRight size={16} />
          </span>
          <span>Press arrow keys to navigate</span>
        </div>
      </div>
    </div>
  );
}
