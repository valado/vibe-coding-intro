import { ClosingSlideData } from '../../types';
import { useTheme } from '../../theme/useTheme';

interface ClosingSlideProps {
  data: ClosingSlideData;
}

export function ClosingSlide({ data }: ClosingSlideProps) {
  const { theme } = useTheme();

  return (
    <div
      className="r-pad"
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
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="t-lg s1" style={{ fontSize: '3rem', fontWeight: 900, color: theme.text }}>
          {data.title}
        </h2>
        <p
          className="s2"
          style={{
            fontSize: '1.1rem',
            color: theme.textMuted,
            marginTop: 20,
            lineHeight: 1.7,
            whiteSpace: 'pre-line',
          }}
        >
          {data.subtitle}
        </p>
        {data.cta && (
          <div
            className="s3"
            style={{ marginTop: 40, fontSize: '1.3rem', fontWeight: 700, color: theme.accent }}
          >
            {data.cta} 🚀
          </div>
        )}
      </div>
    </div>
  );
}
