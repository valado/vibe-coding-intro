import { AuthorSlideData } from '../../types';
import { useTheme } from '../../theme/useTheme';

interface AuthorSlideProps {
  data: AuthorSlideData;
}

export function AuthorSlide({ data }: AuthorSlideProps) {
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
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 32,
          maxWidth: 560,
          width: '100%',
        }}
      >
        {/* Author Identity */}
        <div>
          <h2
            className="t-md s1"
            style={{ fontSize: '2.4rem', fontWeight: 900, color: theme.text, lineHeight: 1.15 }}
          >
            {data.title}
          </h2>
          <p
            className="s2"
            style={{ fontSize: '1.05rem', color: theme.textMuted, marginTop: 8, lineHeight: 1.5 }}
          >
            {data.role}
          </p>
        </div>

        {/* Social Section */}
        <div className="s3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <p
            style={{
              fontSize: '0.9rem',
              color: theme.textMuted,
              margin: 0,
              fontWeight: 500,
              letterSpacing: '0.02em',
            }}
          >
            {data.socialCall2Action}
          </p>
          <div className="author-socials" style={{ display: 'flex', gap: 12 }}>
            <a
              href={data.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 22px',
                borderRadius: 10,
                background: theme.surface,
                border: `1px solid ${theme.border}`,
                color: theme.text,
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.9rem',
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
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2">
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
                gap: 8,
                padding: '10px 22px',
                borderRadius: 10,
                background: theme.surface,
                border: `1px solid ${theme.border}`,
                color: theme.text,
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.9rem',
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill={theme.text}>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              X (Twitter)
            </a>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            width: 48,
            height: 2,
            borderRadius: 1,
            background: theme.accentBorder,
          }}
        />

        {/* Tools Section */}
        {data.tools && data.tools.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, width: '100%' }}>
            <p
              className="s4"
              style={{
                fontSize: '0.85rem',
                color: theme.textMuted,
                margin: 0,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              {data.toolsLabel}
            </p>
            <div
              className="s5 author-tools"
              style={{
                display: 'flex',
                gap: 16,
                justifyContent: 'center',
                width: '100%',
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
                    alignItems: 'center',
                    gap: 14,
                    padding: '16px 22px',
                    borderRadius: 14,
                    background: theme.surface,
                    border: `1px solid ${theme.border}`,
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    cursor: 'pointer',
                    flex: '1 1 0',
                    maxWidth: 260,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = theme.accentBorder;
                    e.currentTarget.style.background = theme.surfaceHover;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = `0 6px 20px ${theme.accentGlow}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = theme.border;
                    e.currentTarget.style.background = theme.surface;
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <img
                    src={tool.icon}
                    alt={`${tool.name} icon`}
                    style={{ width: 36, height: 36, borderRadius: 8, flexShrink: 0 }}
                  />
                  <div style={{ textAlign: 'left', minWidth: 0 }}>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        color: theme.text,
                      }}
                    >
                      {tool.name}
                    </div>
                    <div
                      style={{
                        fontSize: '0.78rem',
                        color: theme.textMuted,
                        lineHeight: 1.4,
                        marginTop: 2,
                      }}
                    >
                      {tool.description}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
