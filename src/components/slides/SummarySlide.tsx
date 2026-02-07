import { SummarySlideData } from '../../types';
import { useTheme } from '../../theme/useTheme';

interface SummarySlideProps {
  data: SummarySlideData;
  onGoTo: (slideIndex: number) => void;
}

export function SummarySlide({ data, onGoTo }: SummarySlideProps) {
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
      <h2
        className="t-md s1"
        style={{ fontSize: '2.2rem', fontWeight: 800, color: theme.text, textAlign: 'center' }}
      >
        {data.title}
      </h2>
      {data.subtitle && (
        <p
          className="s2"
          style={{ fontSize: '1rem', color: theme.textMuted, textAlign: 'center', marginTop: 8 }}
        >
          {data.subtitle}
        </p>
      )}
      <div
        className="sum-grid s3"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginTop: 36 }}
      >
        {data.rules.map((rule, i) => (
          <div
            key={i}
            className={`sc-card s${i + 3}`}
            onClick={() => onGoTo(i + 2)}
            style={{
              background: theme.surface,
              border: `1px solid ${theme.border}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = theme.accentBorder;
              e.currentTarget.style.background = theme.surfaceHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = theme.border;
              e.currentTarget.style.background = theme.surface;
            }}
          >
            <div
              style={{ fontWeight: 800, fontSize: '1.5rem', color: theme.accent, marginBottom: 6 }}
            >
              {rule.num}
            </div>
            <div
              style={{ fontWeight: 700, fontSize: '0.92rem', color: theme.text, marginBottom: 4 }}
            >
              {rule.title}
            </div>
            <div style={{ fontSize: '0.8rem', color: theme.textMuted, lineHeight: 1.4 }}>
              {rule.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
