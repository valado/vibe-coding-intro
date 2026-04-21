import type { LucideIcon } from 'lucide-react';
import { Settings, Sparkles, Compass, Layers } from 'lucide-react';
import { useTheme } from '../../theme/useTheme';
import { IntroSlideData, ContinuumStop } from '../../types';
import { parseGlossaryTerms } from '../../utils/glossaryParser';

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Settings,
  Compass,
  Layers,
};

interface IntroSlideProps {
  data: IntroSlideData;
}

function ContinuumCard({
  stop,
  index,
  total,
  accentColor,
}: {
  stop: ContinuumStop;
  index: number;
  total: number;
  accentColor: string;
}) {
  const { theme } = useTheme();
  const Icon = iconMap[stop.icon];
  // Interpolate from light to full accent opacity
  const progress = total > 1 ? index / (total - 1) : 0;
  const opacity = 0.35 + progress * 0.65;

  return (
    <div
      className="step-card"
      style={{
        flex: 1,
        minWidth: 0,
        padding: '20px 16px',
        borderRadius: 14,
        background: theme.surface,
        border: `1px solid ${theme.border}`,
        transition: 'border-color 0.2s, box-shadow 0.2s',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = accentColor;
        e.currentTarget.style.boxShadow = `0 4px 20px ${theme.accentGlow}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = theme.border;
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: `${accentColor}18`,
            border: `1px solid ${accentColor}33`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            opacity,
          }}
        >
          {Icon && <Icon size={18} color={accentColor} strokeWidth={2} />}
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: theme.text }}>
            {stop.label}
          </div>
          <div
            style={{
              fontSize: '0.72rem',
              color: accentColor,
              fontWeight: 600,
              letterSpacing: '0.03em',
              opacity,
            }}
          >
            {stop.tagline}
          </div>
        </div>
      </div>

      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: '8px 0 0 0',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}
      >
        {stop.traits.map((trait, i) => (
          <li
            key={i}
            style={{
              fontSize: '0.82rem',
              color: theme.textMuted,
              lineHeight: 1.4,
              paddingLeft: 14,
              position: 'relative',
            }}
          >
            <span
              style={{
                position: 'absolute',
                left: 0,
                top: 2,
                color: accentColor,
                fontWeight: 700,
                fontSize: '0.7rem',
                opacity,
              }}
            >
              &bull;
            </span>
            {parseGlossaryTerms(trait)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function IntroSlide({ data }: IntroSlideProps) {
  const { theme } = useTheme();
  const stops = data.continuum;

  return (
    <div
      className="r-pad slide-scroll"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        padding: '40px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: theme.subtleGrad,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{ position: 'relative', zIndex: 1, maxWidth: 1000, margin: '0 auto', width: '100%' }}
      >
        <h2 className="t-md s1" style={{ fontSize: '2.2rem', fontWeight: 800, color: theme.text }}>
          {data.title}
        </h2>
        <p
          className="s2"
          style={{
            fontSize: '1.02rem',
            lineHeight: 1.7,
            color: theme.textMuted,
            marginTop: 12,
            maxWidth: 720,
          }}
        >
          {parseGlossaryTerms(data.description)}
        </p>

        {/* Continuum arrow bar */}
        <div className="s3" style={{ position: 'relative', marginTop: 32 }}>
          {/* Gradient bar behind cards */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: 24,
              right: 24,
              height: 3,
              borderRadius: 2,
              background: `linear-gradient(to right, ${theme.accentBorder}, ${theme.accent})`,
              transform: 'translateY(-50%)',
              zIndex: 0,
              opacity: 0.4,
            }}
          />
          {/* Arrow tip */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              right: 14,
              transform: 'translateY(-50%)',
              width: 0,
              height: 0,
              borderTop: '6px solid transparent',
              borderBottom: '6px solid transparent',
              borderLeft: `10px solid ${theme.accent}`,
              opacity: 0.4,
              zIndex: 0,
            }}
          />

          {/* Cards row */}
          <div
            className="intro-row"
            style={{
              display: 'flex',
              gap: 14,
              position: 'relative',
              zIndex: 1,
            }}
          >
            {stops.map((stop, i) => (
              <ContinuumCard
                key={stop.label}
                stop={stop}
                index={i}
                total={stops.length}
                accentColor={theme.accent}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
