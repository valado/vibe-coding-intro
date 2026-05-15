import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../theme/useTheme';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import { useTouchNavigation } from '../hooks/useTouchNavigation';
import { ThemeToggle } from './ui/ThemeToggle';
import { NavigationControls } from './ui/NavigationControls';
import { AuthorModal } from './ui/AuthorModal';
import { KeyboardHelp } from './ui/KeyboardHelp';
import { ProgressBar } from './ui/ProgressBar';
import { ParticleBackground } from './ui/ParticleBackground';
import { Home, Printer, Maximize, Minimize, User, FileText } from 'lucide-react';
import contributingToProduction from '../config/contributing-to-production.json';
import analyticsAndTracking from '../config/analytics-and-tracking.json';
import agenticBusiness from '../config/agentic-business.json';
import { MarkdownDrawer } from './ui/MarkdownDrawer';
import { NonTechiesSlideContent } from './ui/NonTechiesSlideContent';
import { NonTechiesPrintAllSlides } from './ui/NonTechiesPrintAllSlides';

export interface SessionSlide {
  id: string;
  layout?: string;
  title: string;
  subtitle?: string;
  badge?: string;
  points?: string[];
  ascii?: string;
  tip?: string;
  externalLink?: { label: string; url: string };
}

export interface Session {
  id: string;
  title: string;
  subtitle: string;
  slides: SessionSlide[];
  notes?: string;
}

const SESSION_MAP: { path: string; content: Session }[] = [
  { path: '/contributing-to-production', content: contributingToProduction as Session },
  { path: '/analytics-and-tracking', content: analyticsAndTracking as Session },
  { path: '/agentic-business', content: agenticBusiness as Session },
];

const formatSlideIndex = (index: number) => String(index).padStart(2, '0');

export function NonTechiesPage({ sessionIndex }: { sessionIndex: number }) {
  const navigate = useNavigate();
  const { slideIndex } = useParams<{ slideIndex: string }>();
  const { theme } = useTheme();
  const sessionIdx = Math.max(0, Math.min(SESSION_MAP.length - 1, sessionIndex));
  const basePath = SESSION_MAP[sessionIdx].path;
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);
  const [showAuthor, setShowAuthor] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotesDrawer, setShowNotesDrawer] = useState(false);

  const session = SESSION_MAP[sessionIdx].content;
  const slides = session.slides;
  const total = slides.length;
  const current = Math.max(0, Math.min(total - 1, Number(slideIndex ?? '0')));
  const slide = slides[current];

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

  const handleNext = useCallback(
    () => navigate(`${basePath}/${Math.min(total - 1, current + 1)}`),
    [navigate, basePath, total, current]
  );
  const handlePrev = useCallback(
    () => navigate(`${basePath}/${Math.max(0, current - 1)}`),
    [navigate, basePath, current]
  );
  const handleFirst = useCallback(
    () => navigate(`${basePath}/0`),
    [navigate, basePath]
  );
  const handleLast = useCallback(
    () => navigate(`${basePath}/${total - 1}`),
    [navigate, basePath, total]
  );
  const handleHelp = useCallback(() => setShowKeyboardHelp((v) => !v), []);
  const handleEscape = useCallback(() => {
    if (showKeyboardHelp) setShowKeyboardHelp(false);
    else if (showAuthor) setShowAuthor(false);
    else if (showNotesDrawer) setShowNotesDrawer(false);
  }, [showKeyboardHelp, showAuthor, showNotesDrawer]);

  useKeyboardNavigation({
    onNext: handleNext,
    onPrev: handlePrev,
    onFirst: handleFirst,
    onLast: handleLast,
    onHelp: handleHelp,
    onEscape: handleEscape,
    disabled: showKeyboardHelp || showAuthor || showNotesDrawer,
  });

  const { handleTouchStart, handleTouchEnd } = useTouchNavigation({ onNext: handleNext, onPrev: handlePrev });

  return (
    <div
      className="presentation-root"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
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

      {/* Slide */}
      <main
        key={`${sessionIdx}-${current}`}
        className="fi print-hide"
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          padding: '64px 40px 24px',
          overflow: 'auto',
          position: 'relative',
        }}
      >
        {/* Watermark slide number */}
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
            zIndex: 0,
          }}
        >
          {formatSlideIndex(current)}
        </div>

        <div style={{ margin: 'auto', width: '100%', maxWidth: 820 }}>
          {slide.layout === 'cover' ? (
            <div style={{ width: '100%', maxWidth: 820, position: 'relative', zIndex: 1 }}>
              <NonTechiesSlideContent slide={slide} session={session} index={current} />
              <div
                style={{
                  position: 'absolute',
                  bottom: 12,
                  right: 0,
                  zIndex: 2,
                }}
              >
                <button
                  className="ib"
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
          ) : slide.layout === 'mindmap-link' ? (
            <div style={{ width: '100%', maxWidth: 820, position: 'relative', zIndex: 1 }}>
              <NonTechiesSlideContent slide={slide} session={session} index={current} />
              <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'center', marginTop: 12 }}>
                <button
                  onClick={() => navigate('/mindmap')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '16px 36px',
                    borderRadius: 14,
                    background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent}cc)`,
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '1.05rem',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    boxShadow: `0 4px 24px ${theme.accentGlow}`,
                    transition: 'all 0.2s',
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
                  Open Mind Map
                </button>
              </div>
            </div>
          ) : (
            <NonTechiesSlideContent slide={slide} session={session} index={current} />
          )}
        </div>
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
      {showNotesDrawer && <MarkdownDrawer content={session.notes} onClose={() => setShowNotesDrawer(false)} />}

      <NonTechiesPrintAllSlides session={session} />
    </div>
  );
}
