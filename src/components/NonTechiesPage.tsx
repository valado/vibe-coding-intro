import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../theme/useTheme';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import { ThemeToggle } from './ui/ThemeToggle';
import { NavigationControls } from './ui/NavigationControls';
import { AuthorModal } from './ui/AuthorModal';
import { KeyboardHelp } from './ui/KeyboardHelp';
import { ProgressBar } from './ui/ProgressBar';
import { ParticleBackground } from './ui/ParticleBackground';
import { Home, Printer, Maximize, Minimize, User, ChevronDown, FileText } from 'lucide-react';
import sessionsData from '../config/nonTechiesSessions.json';
import { AuthorSlide } from './slides/AuthorSlide';
import { CoverSlide } from './slides/CoverSlide';
import { MarkdownDrawer } from './ui/MarkdownDrawer';
import { SLIDES } from '../config/slides';
import { AuthorSlideData, CoverSlideData } from '../types';

interface SessionSlide {
  id: string;
  layout?: string;
  title: string;
  subtitle?: string;
  badge?: string;
  points?: string[];
  tip?: string;
  externalLink?: { label: string; url: string };
}

interface Session {
  id: string;
  title: string;
  subtitle: string;
  slides: SessionSlide[];
}

const sessions = sessionsData.sessions as Session[];

const formatSlideIndex = (index: number) => String(index).padStart(2, '0');

export function NonTechiesPage() {
  const navigate = useNavigate();
  const { sessionId } = useParams<{ sessionId: string }>();
  const { theme } = useTheme();
  const sessionIdx = Math.max(0, Math.min(sessions.length - 1, Number(sessionId ?? '1') - 1));
  const [current, setCurrent] = useState(0);
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);
  const [showAuthor, setShowAuthor] = useState(false);
  const [showSessionMenu, setShowSessionMenu] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotesDrawer, setShowNotesDrawer] = useState(false);

  const session = sessions[sessionIdx];
  const slides = session.slides;
  const total = slides.length;
  const slide = slides[current];

  useEffect(() => {
    setCurrent(0);
  }, [sessionIdx]);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  const switchSession = useCallback(
    (idx: number) => {
      setShowSessionMenu(false);
      navigate(`/non-techies/${idx + 1}`);
    },
    [navigate]
  );

  const handleNext = useCallback(() => setCurrent((c) => Math.min(total - 1, c + 1)), [total]);
  const handlePrev = useCallback(() => setCurrent((c) => Math.max(0, c - 1)), []);
  const handleFirst = useCallback(() => setCurrent(0), []);
  const handleLast = useCallback(() => setCurrent(total - 1), [total]);
  const handleHelp = useCallback(() => setShowKeyboardHelp((v) => !v), []);
  const handleEscape = useCallback(() => {
    if (showKeyboardHelp) setShowKeyboardHelp(false);
    else if (showAuthor) setShowAuthor(false);
    else if (showSessionMenu) setShowSessionMenu(false);
    else if (showNotesDrawer) setShowNotesDrawer(false);
  }, [showKeyboardHelp, showAuthor, showSessionMenu, showNotesDrawer]);

  useKeyboardNavigation({
    onNext: handleNext,
    onPrev: handlePrev,
    onFirst: handleFirst,
    onLast: handleLast,
    onHelp: handleHelp,
    onEscape: handleEscape,
    disabled: showKeyboardHelp || showAuthor || showSessionMenu || showNotesDrawer,
  });

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: theme.bg,
        color: theme.text,
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        transition: 'background-color 0.3s, color 0.3s',
      }}
    >
      <div className="print-hide">
        <ParticleBackground />
      </div>
      <div className="print-hide">
        <ProgressBar current={current} total={total} />
      </div>

      {/* Top nav bar */}
      <div
        className="print-hide"
        style={{
          position: 'absolute',
          top: 14,
          right: 16,
          display: 'flex',
          gap: 6,
          zIndex: 20,
          alignItems: 'center',
        }}
      >
        {/* Session switcher */}
        <div style={{ position: 'relative' }}>
          <button
            className="ib"
            onClick={() => setShowSessionMenu((v) => !v)}
            style={{
              color: theme.textMuted,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '4px 8px',
            }}
            title="Switch session"
          >
            S{sessionIdx + 1}
            <ChevronDown size={13} />
          </button>
          {showSessionMenu && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: 6,
                backgroundColor: theme.surface,
                border: `1px solid ${theme.border}`,
                borderRadius: 10,
                overflow: 'hidden',
                minWidth: 260,
                boxShadow: `0 8px 24px rgba(0,0,0,0.3)`,
                zIndex: 30,
              }}
            >
              {sessions.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => switchSession(i)}
                  style={{
                    width: '100%',
                    display: 'block',
                    textAlign: 'left',
                    padding: '10px 16px',
                    background: i === sessionIdx ? theme.accentSoft : 'none',
                    border: 'none',
                    borderBottom: i < sessions.length - 1 ? `1px solid ${theme.border}` : 'none',
                    color: i === sessionIdx ? theme.accent : theme.text,
                    fontSize: '0.82rem',
                    fontWeight: i === sessionIdx ? 600 : 400,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    if (i !== sessionIdx) e.currentTarget.style.background = theme.surfaceHover;
                  }}
                  onMouseLeave={(e) => {
                    if (i !== sessionIdx) e.currentTarget.style.background = 'none';
                  }}
                >
                  {s.title}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          className="ib"
          onClick={() => navigate('/')}
          style={{ color: theme.textMuted }}
          title="Back to main slides"
        >
          <Home size={17} />
        </button>
        <button
          className="ib"
          onClick={() => setShowKeyboardHelp(true)}
          style={{ color: theme.textMuted }}
          title="Keyboard shortcuts (?)"
        >
          <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>?</span>
        </button>
        <button
          className="ib"
          onClick={() => setShowAuthor(true)}
          style={{ color: theme.textMuted }}
          title="About the author"
        >
          <User size={17} />
        </button>
        <button
          className="ib hide-mobile"
          onClick={() => window.print()}
          style={{ color: theme.textMuted }}
          title="Print to PDF"
        >
          <Printer size={17} />
        </button>
        <button
          className="ib hide-mobile"
          onClick={toggleFullscreen}
          style={{ color: theme.textMuted }}
          title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen (F)'}
        >
          {isFullscreen ? <Minimize size={17} /> : <Maximize size={17} />}
        </button>
        <ThemeToggle />
      </div>

      {/* Click-away to close session menu */}
      {showSessionMenu && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 19 }}
          onClick={() => setShowSessionMenu(false)}
        />
      )}

      {/* Slide */}
      <main
        key={`${sessionIdx}-${current}`}
        className="fi"
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '64px 40px 24px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Watermark slide number */}
        <div
          className="wm sc print-hide"
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
            zIndex: 0,
          }}
        >
          {formatSlideIndex(current)}
        </div>

        {slide.layout === 'cover' ? (
          <div style={{ width: '100%', maxWidth: 820, position: 'relative', zIndex: 1 }}>
            <CoverSlide data={slide as CoverSlideData} />
            <div
              style={{
                position: 'absolute',
                bottom: 12,
                right: 0,
                zIndex: 2,
              }}
            >
              <button
                className="ib print-hide"
                onClick={() => setShowNotesDrawer(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 14px',
                  borderRadius: 20,
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: theme.accent,
                  background: theme.accentSoft,
                  border: `1px solid ${theme.accentBorder}`,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
                title="Open session notes"
              >
                <FileText size={13} />
                Notes
              </button>
            </div>
          </div>
        ) : slide.layout === 'author' ? (
          <div style={{ width: '100%', maxWidth: 820, position: 'relative', zIndex: 1 }}>
            <AuthorSlide data={SLIDES.find((s) => s.layout === 'author') as AuthorSlideData} />
          </div>
        ) : (
          <div
            style={{
              width: '100%',
              maxWidth: 820,
              position: 'relative',
              zIndex: 1,
            }}
          >
            {/* Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {/* Header */}
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

              {/* Points */}
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

              {/* Tip callout */}
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

              {/* External link */}
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
        )}
      </main>

      {/* Bottom nav */}
      <div className="print-hide" style={{ display: 'flex', justifyContent: 'center' }}>
        <NavigationControls
          current={current}
          total={total}
          onPrev={handlePrev}
          onNext={handleNext}
          onShowOverview={() => {}}
        />
      </div>

      {/* Modals */}
      {showAuthor && <AuthorModal onClose={() => setShowAuthor(false)} />}
      {showKeyboardHelp && <KeyboardHelp onClose={() => setShowKeyboardHelp(false)} />}
      {showNotesDrawer && <MarkdownDrawer onClose={() => setShowNotesDrawer(false)} />}
    </div>
  );
}
