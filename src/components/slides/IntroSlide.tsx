import type { LucideIcon } from 'lucide-react';
import { MessageSquareText, RefreshCw, Sparkles } from 'lucide-react';
import { useTheme } from '../../theme/useTheme';
import { IntroSlideData } from '../../types';

const iconMap: Record<string, LucideIcon> = {
  MessageSquareText,
  Sparkles,
  RefreshCw,
};

interface IntroSlideProps {
  data: IntroSlideData;
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
        style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto', width: '100%' }}
      >
        <h2 className="t-md s1" style={{ fontSize: '2.4rem', fontWeight: 800, color: theme.text }}>
          {data.title}
        </h2>
        <p
          className="s2"
          style={{
            fontSize: '1.08rem',
            lineHeight: 1.7,
            color: theme.textMuted,
            marginTop: 16,
            maxWidth: 640,
          }}
        >
          {data.description}
        </p>
        {data.steps && (
          <div
            className="steps-row s3"
            style={{ display: 'flex', alignItems: 'stretch', gap: 16, marginTop: 40 }}
          >
            {data.steps.map((step, i) => {
              const Icon = iconMap[step.icon];
              return (
                <div
                  key={i}
                  style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}
                >
                  <div
                    className={`step-card s${i + 4}`}
                    style={{
                      flex: 1,
                      padding: '28px 20px',
                      borderRadius: 16,
                      background: theme.surface,
                      border: `1px solid ${theme.border}`,
                      textAlign: 'center',
                      transition: 'border-color 0.2s, box-shadow 0.2s',
                      height: '200px',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = theme.accentBorder;
                      e.currentTarget.style.boxShadow = `0 4px 24px ${theme.accentGlow}`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = theme.border;
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 14,
                        background: theme.accentSoft,
                        border: `1px solid ${theme.accentBorder}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px',
                      }}
                    >
                      {Icon && <Icon size={22} color={theme.accent} strokeWidth={2} />}
                    </div>
                    <div
                      style={{
                        fontSize: '0.68rem',
                        fontWeight: 600,
                        color: theme.accent,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        marginBottom: 6,
                      }}
                    >
                      Step {i + 1}
                    </div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: '1.05rem',
                        color: theme.text,
                        marginBottom: 6,
                      }}
                    >
                      {step.label}
                    </div>
                    <div style={{ fontSize: '0.86rem', color: theme.textMuted, lineHeight: 1.5 }}>
                      {step.detail}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
