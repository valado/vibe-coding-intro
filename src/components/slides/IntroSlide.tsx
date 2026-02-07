import { IntroSlideData } from '../../types';
import { useTheme } from '../../theme/useTheme';

interface IntroSlideProps {
  data: IntroSlideData;
}

export function IntroSlide({ data }: IntroSlideProps) {
  const { theme } = useTheme();

  return (
    <div
      className="r-pad"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        padding: '40px 32px',
        maxWidth: 800,
        margin: '0 auto',
      }}
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
        }}
      >
        {data.description}
      </p>
      {data.steps && (
        <div className="steps-row s3" style={{ display: 'flex', gap: 20, marginTop: 40 }}>
          {data.steps.map((step, i) => (
            <div
              key={i}
              className={`s${i + 4}`}
              style={{
                flex: 1,
                padding: '24px 20px',
                borderRadius: 14,
                background: theme.surface,
                border: `1px solid ${theme.border}`,
                textAlign: 'center',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = theme.accentBorder)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = theme.border)}
            >
              <div style={{ fontSize: '2rem', marginBottom: 10 }}>{step.emoji}</div>
              <div
                style={{ fontWeight: 700, fontSize: '1rem', color: theme.text, marginBottom: 6 }}
              >
                {step.label}
              </div>
              <div style={{ fontSize: '0.88rem', color: theme.textMuted, lineHeight: 1.5 }}>
                {step.detail}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
