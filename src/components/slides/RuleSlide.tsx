import { RuleSlideData } from '../../types';
import { useTheme } from '../../theme/useTheme';

interface RuleSlideProps {
  data: RuleSlideData;
}

export function RuleSlide({ data }: RuleSlideProps) {
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
        className="wm sc"
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          fontSize: '15rem',
          fontWeight: 900,
          color: theme.watermark,
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {data.number}
      </div>
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto' }}>
        <div
          className="s1"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 36,
            height: 36,
            borderRadius: 10,
            background: theme.accentSoft,
            border: `1px solid ${theme.accentBorder}`,
            color: theme.accent,
            fontWeight: 700,
            fontSize: '0.85rem',
            marginBottom: 16,
          }}
        >
          {data.number}
        </div>
        <h2
          className="t-md s2"
          style={{ fontSize: '2.2rem', fontWeight: 800, color: theme.text, lineHeight: 1.15 }}
        >
          {data.title}
        </h2>
        <p
          className="s3"
          style={{ fontSize: '1rem', color: theme.accent, fontWeight: 500, marginTop: 6 }}
        >
          {data.subtitle}
        </p>
        <p
          className="s4"
          style={{
            fontSize: '1.02rem',
            lineHeight: 1.7,
            color: theme.textMuted,
            marginTop: 18,
          }}
        >
          {data.description}
        </p>
        {data.points && (
          <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {data.points.map((point, i) => (
              <div key={i} className={`pt s${i + 5}`}>
                <div
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    backgroundColor: theme.accent,
                    marginTop: 9,
                    flexShrink: 0,
                  }}
                />
                <span style={{ color: theme.text }}>{point}</span>
              </div>
            ))}
          </div>
        )}
        {data.tip && (
          <div
            className={`tip s${(data.points?.length || 0) + 5}`}
            style={{
              marginTop: 28,
              background: theme.accentSoft,
              border: `1px solid ${theme.accentBorder}`,
              color: theme.text,
            }}
          >
            <span style={{ fontSize: '1rem', flexShrink: 0 }}>💡</span>
            <span>{data.tip}</span>
          </div>
        )}
        {data.externalLink && (
          <a
            href={data.externalLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`s${(data.points?.length || 0) + (data.tip ? 6 : 5)}`}
            style={{
              marginTop: 20,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 18px',
              borderRadius: 10,
              background: theme.accentSoft,
              border: `1px solid ${theme.accentBorder}`,
              color: theme.accent,
              fontWeight: 600,
              fontSize: '0.95rem',
              textDecoration: 'none',
              transition: 'filter 0.2s',
            }}
          >
            {data.externalLink.label}
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}
