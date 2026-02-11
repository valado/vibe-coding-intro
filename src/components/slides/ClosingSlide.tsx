import { ClosingSlideData } from '../../types';
import { useTheme } from '../../theme/useTheme';
import { parseGlossaryTerms } from '../../utils/glossaryParser';

interface ClosingSlideProps {
  data: ClosingSlideData;
}

export function ClosingSlide({ data }: ClosingSlideProps) {
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
          {parseGlossaryTerms(data.subtitle)}
        </p>
        {data.cta && (
          <div
            className="s3"
            style={{ marginTop: 40, fontSize: '1.3rem', fontWeight: 700, color: theme.accent }}
          >
            {data.cta} 🚀
          </div>
        )}

        {/* Survey / Discount CTA */}
        <div
          className="s4 closing-survey"
          style={{
            marginTop: 48,
            padding: '28px 36px',
            borderRadius: 16,
            border: `1px solid ${theme.accentBorder}`,
            background: theme.accentSoft,
          }}
        >
          <p
            style={{
              fontSize: '0.95rem',
              color: theme.textMuted,
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            {data.surveyLabel}
          </p>

          <div className="s5" style={{ marginTop: 20 }}>
            <a
              className="closing-cta-btn"
              href={data.surveyUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                padding: '16px 32px',
                borderRadius: 12,
                background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent}cc)`,
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '1rem',
                transition: 'all 0.2s',
                cursor: 'pointer',
                boxShadow: `0 4px 24px ${theme.accentGlow}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                e.currentTarget.style.boxShadow = `0 8px 32px ${theme.accentGlow}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = `0 4px 24px ${theme.accentGlow}`;
              }}
            >
              <span style={{ fontSize: '1.3rem' }}>🎁</span>
              <span>{data.surveyDetail}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
