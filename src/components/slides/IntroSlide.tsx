import type { LucideIcon } from 'lucide-react';
import { Settings, Sparkles } from 'lucide-react';
import { useTheme } from '../../theme/useTheme';
import { IntroSlideData } from '../../types';
import { parseGlossaryTerms } from '../../utils/glossaryParser';

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Settings,
};

interface IntroSlideProps {
  data: IntroSlideData;
}

function ComparisonCard({
  side,
  accentColor,
  accentSoft,
  accentBorder,
}: {
  side: IntroSlideData['left'];
  accentColor: string;
  accentSoft: string;
  accentBorder: string;
}) {
  const { theme } = useTheme();
  const Icon = iconMap[side.icon];

  return (
    <div
      className="step-card"
      style={{
        flex: 1,
        padding: '28px 24px',
        borderRadius: 16,
        background: theme.surface,
        border: `1px solid ${theme.border}`,
        transition: 'border-color 0.2s, box-shadow 0.2s',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = accentBorder;
        e.currentTarget.style.boxShadow = `0 4px 24px ${theme.accentGlow}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = theme.border;
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: accentSoft,
            border: `1px solid ${accentBorder}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {Icon && <Icon size={22} color={accentColor} strokeWidth={2} />}
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: '1.15rem', color: theme.text }}>
            {side.label}
          </div>
          <div
            style={{
              fontSize: '0.78rem',
              color: accentColor,
              fontWeight: 600,
              letterSpacing: '0.03em',
            }}
          >
            {side.tagline}
          </div>
        </div>
      </div>

      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: '12px 0 0 0',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        {side.points.map((point, i) => (
          <li
            key={i}
            style={{
              fontSize: '0.9rem',
              color: theme.textMuted,
              lineHeight: 1.5,
              paddingLeft: 16,
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
                fontSize: '0.75rem',
              }}
            >
              &bull;
            </span>
            {parseGlossaryTerms(point)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function IntroSlide({ data }: IntroSlideProps) {
  const { theme } = useTheme();

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
        style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto', width: '100%' }}
      >
        <h2 className="t-md s1" style={{ fontSize: '2.2rem', fontWeight: 800, color: theme.text }}>
          {data.title}
        </h2>
        <p
          className="s2"
          style={{
            fontSize: '1.05rem',
            lineHeight: 1.7,
            color: theme.textMuted,
            marginTop: 12,
            maxWidth: 680,
          }}
        >
          {parseGlossaryTerms(data.description)}
        </p>

        <div
          className="s3"
          style={{
            display: 'flex',
            gap: 20,
            marginTop: 32,
            alignItems: 'stretch',
          }}
        >
          <ComparisonCard
            side={data.left}
            accentColor={theme.accent}
            accentSoft={theme.accentSoft}
            accentBorder={theme.accentBorder}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: theme.textMuted,
              letterSpacing: '0.05em',
              opacity: 0.5,
            }}
          >
            VS
          </div>
          <ComparisonCard
            side={data.right}
            accentColor={theme.accent}
            accentSoft={theme.accentSoft}
            accentBorder={theme.accentBorder}
          />
        </div>
      </div>
    </div>
  );
}
