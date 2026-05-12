import { useTheme } from '../../theme/useTheme';
import { AuthorSlide } from '../slides/AuthorSlide';
import { CoverSlide } from '../slides/CoverSlide';
import { SLIDES } from '../../config/slides';
import { AuthorSlideData, CoverSlideData } from '../../types';
import type { SessionSlide, Session } from '../NonTechiesPage';

interface Props {
  slide: SessionSlide;
  session: Session;
  index: number;
}

export function NonTechiesSlideContent({ slide, session }: Props) {
  const { theme } = useTheme();

  if (slide.layout === 'cover') {
    return (
      <div style={{ width: '100%', maxWidth: 820, position: 'relative', zIndex: 1 }}>
        <CoverSlide data={slide as CoverSlideData} />
      </div>
    );
  }

  if (slide.layout === 'author') {
    return (
      <div style={{ width: '100%', maxWidth: 820, position: 'relative', zIndex: 1 }}>
        <AuthorSlide data={SLIDES.find((s) => s.layout === 'author') as AuthorSlideData} />
      </div>
    );
  }

  if (slide.layout === 'qa') {
    return (
      <div
        style={{
          width: '100%',
          maxWidth: 820,
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: 32,
        }}
      >
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <h1
            style={{
              fontSize: 'clamp(3rem, 8vw, 5.5rem)',
              fontWeight: 900,
              lineHeight: 1.0,
              margin: 0,
              color: theme.text,
              letterSpacing: '-0.02em',
            }}
          >
            {slide.title}
          </h1>
          {slide.subtitle && (
            <p
              style={{
                fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                color: theme.textMuted,
                margin: 0,
                maxWidth: 480,
                lineHeight: 1.6,
                fontWeight: 500,
              }}
            >
              {slide.subtitle}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (slide.layout === 'mindmap-link') {
    return (
      <div
        style={{
          width: '100%',
          maxWidth: 820,
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: 32,
        }}
      >
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              margin: 0,
              color: theme.text,
            }}
          >
            {slide.title}
          </h1>
          {slide.subtitle && (
            <p
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                color: theme.textMuted,
                margin: 0,
                maxWidth: 540,
                lineHeight: 1.6,
              }}
            >
              {slide.subtitle}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 820,
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div
            style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: theme.accent,
            }}
          >
            {session.title}
          </div>
          <h1
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              margin: 0,
              color: theme.text,
            }}
          >
            {slide.title}
          </h1>
          {slide.subtitle && (
            <p
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                color: theme.textMuted,
                margin: 0,
                fontWeight: 400,
              }}
            >
              {slide.subtitle}
            </p>
          )}
        </div>

        {slide.points && slide.points.length > 0 && (
          <ul
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            {slide.points.map((point, i) => (
              <li
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 14,
                  fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
                  color: theme.text,
                  lineHeight: 1.5,
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: theme.accent,
                    flexShrink: 0,
                    marginTop: '0.45em',
                  }}
                />
                {point}
              </li>
            ))}
          </ul>
        )}

        {slide.ascii && (
          <pre
            style={{
              fontFamily: "'Courier New', Courier, monospace",
              fontSize: 'clamp(0.75rem, 1.4vw, 0.9rem)',
              lineHeight: 1.6,
              color: theme.textMuted,
              background: theme.surface,
              border: `1px solid ${theme.border}`,
              borderRadius: 8,
              padding: '14px 18px',
              margin: 0,
              overflowX: 'auto',
              whiteSpace: 'pre',
            }}
          >
            {slide.ascii}
          </pre>
        )}

        {slide.tip && (
          <div
            style={{
              backgroundColor: theme.accentSoft,
              border: `1px solid ${theme.accentBorder}`,
              borderRadius: 10,
              padding: '12px 18px',
              fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
              color: theme.accent,
              fontStyle: 'italic',
            }}
          >
            {slide.tip}
          </div>
        )}

        {slide.externalLink && (
          <a
            href={slide.externalLink.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 18px',
              borderRadius: 10,
              background: theme.accentSoft,
              border: `1px solid ${theme.accentBorder}`,
              color: theme.accent,
              fontWeight: 600,
              fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)',
              textDecoration: 'none',
              alignSelf: 'flex-start',
            }}
          >
            {slide.externalLink.label}
            <svg
              width="14"
              height="14"
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
