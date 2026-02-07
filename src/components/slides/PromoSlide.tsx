import { PromoSlideData } from '../../types';
import { useTheme } from '../../theme/useTheme';

interface PromoSlideProps {
  data: PromoSlideData;
}

export function AuthorSlide({ data }: PromoSlideProps) {
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
        <h2
          className="t-md s1"
          style={{ fontSize: '2.4rem', fontWeight: 900, color: theme.text, lineHeight: 1.15 }}
        >
          {data.title}
        </h2>
        <p
          className="s2"
          style={{ fontSize: '1.08rem', color: theme.textMuted, marginTop: 12, lineHeight: 1.6 }}
        >
          {data.role}
        </p>

        {/* Social Links */}
        <p
          className="s2"
          style={{ fontSize: '1.08rem', color: theme.textMuted, marginTop: 12, lineHeight: 1.6 }}
        >
          {data.socialCall2Action}
        </p>
        <div
          className="s4"
          style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 28 }}
        >
          <a
            href={data.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '14px 28px',
              borderRadius: 12,
              background: theme.surface,
              border: `1px solid ${theme.border}`,
              color: theme.text,
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              transition: 'all 0.2s',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#0A66C2';
              e.currentTarget.style.background = theme.surfaceHover;
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = theme.border;
              e.currentTarget.style.background = theme.surface;
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#0A66C2">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
          <a
            href={data.xUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '14px 28px',
              borderRadius: 12,
              background: theme.surface,
              border: `1px solid ${theme.border}`,
              color: theme.text,
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              transition: 'all 0.2s',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = theme.textMuted;
              e.currentTarget.style.background = theme.surfaceHover;
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = theme.border;
              e.currentTarget.style.background = theme.surface;
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill={theme.text}>
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            X (Twitter)
          </a>
        </div>

        {/* Survey / Discount CTA */}
        <div className="s5" style={{ marginTop: 32 }}>
          <a
            href={data.surveyUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              padding: '20px 40px',
              borderRadius: 14,
              background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent}dd)`,
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '1.1rem',
              transition: 'all 0.2s',
              cursor: 'pointer',
              boxShadow: `0 4px 24px ${theme.accentGlow}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
              e.currentTarget.style.boxShadow = `0 8px 32px ${theme.accentGlow}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = `0 4px 24px ${theme.accentGlow}`;
            }}
          >
            <span>{data.surveyLabel}</span>
            <span style={{ fontSize: '0.82rem', fontWeight: 400, opacity: 0.85 }}>
              {data.surveyDetail}
            </span>
          </a>
        </div>

        {/* Tool Links */}
        <p
          className="s2"
          style={{ fontSize: '1.08rem', color: theme.textMuted, marginTop: 12, lineHeight: 1.6 }}
        >
          {data.toolsLabel}
        </p>
        {data.tools && data.tools.length > 0 && (
          <div
            className="s3"
            style={{
              display: 'grid',
              gridTemplateColumns: data.tools.length === 1 ? '1fr' : '1fr 1fr',
              gap: 16,
              marginTop: 36,
            }}
          >
            {data.tools.map((tool, index) => (
              <a
                key={index}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 12,
                  padding: '20px 24px',
                  borderRadius: 14,
                  background: theme.surface,
                  border: `2px solid ${theme.border}`,
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = theme.accentBorder;
                  e.currentTarget.style.background = theme.surfaceHover;
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = `0 8px 24px ${theme.accentGlow}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = theme.border;
                  e.currentTarget.style.background = theme.surface;
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div>
                  <img src={tool.icon} aria-label="icon" />
                </div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    color: theme.text,
                    textAlign: 'center',
                  }}
                >
                  {tool.name}
                </div>
                <div
                  style={{
                    fontSize: '0.9rem',
                    color: theme.textMuted,
                    textAlign: 'center',
                    lineHeight: 1.5,
                  }}
                >
                  {tool.description}
                </div>
              </a>
            ))}
          </div>
        )}

        {isClosing && (
          <p className="s6" style={{ marginTop: 32, fontSize: '0.9rem', color: theme.textMuted }}>
            Thank you for reading!
          </p>
        )}
      </div>
    </div>
  );
}
