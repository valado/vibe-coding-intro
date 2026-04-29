import { useState, useCallback, useMemo, useEffect } from 'react';
import { useTheme } from '../theme/useTheme';
import { assembleSlides, getChapterStartIndex, getNextChapterId, TIER_ORDER } from '../config/slideAssembler';
import { getCustomCursor } from '../constants/cursor';
import { TierId, ChapterTitleSlideData } from '../types';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import { useTouchNavigation } from '../hooks/useTouchNavigation';
import { useUrlSync } from '../hooks/useUrlSync';
import { useShare } from '../hooks/useShare';
import { ProgressBar } from './ui/ProgressBar';
import { ThemeToggle } from './ui/ThemeToggle';
import { ShareButton } from './ui/ShareButton';
import { NavigationControls } from './ui/NavigationControls';
import { Toast } from './ui/Toast';
import { SlideOverview } from './ui/SlideOverview';
import { KeyboardHelp } from './ui/KeyboardHelp';
import { AuthorModal } from './ui/AuthorModal';
import { DiscountModal } from './ui/DiscountModal';
import { ParticleBackground } from './ui/ParticleBackground';
import { CoverSlide } from './slides/CoverSlide';
import { IntroSlide } from './slides/IntroSlide';
import { RuleSlide } from './slides/RuleSlide';
import { SummarySlide } from './slides/SummarySlide';
import { ClosingSlide } from './slides/ClosingSlide';
import { AuthorSlide } from './slides/AuthorSlide';
import { TierSelectionSlide } from './slides/TierSelectionSlide';
import { ChapterTitleSlide } from './slides/ChapterTitleSlide';
import { PrintAllSlides } from './ui/PrintAllSlides';
import { User, Gift, Printer, Maximize, Minimize, Map, Footprints, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Presentation() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [showOverview, setShowOverview] = useState(false);
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);
  const [showAuthor, setShowAuthor] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [enabledChapters, setEnabledChapters] = useState<Set<TierId>>(
    () => new Set(TIER_ORDER)
  );
  const { theme } = useTheme();

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  const activeSlides = useMemo(() => assembleSlides(enabledChapters), [enabledChapters]);

  const handleToggleChapter = useCallback((tierId: TierId) => {
    setEnabledChapters((prev) => {
      const next = new Set(prev);
      if (next.has(tierId)) {
        if (next.size <= 1) return prev; // keep at least one
        next.delete(tierId);
      } else {
        next.add(tierId);
      }
      return next;
    });
  }, []);

  const total = activeSlides.length;
  const clamped = Math.min(current, total - 1);
  if (clamped !== current) setCurrent(clamped);
  const data = activeSlides[clamped];

  const goTo = useCallback(
    (i: number) => {
      setCurrent(Math.max(0, Math.min(total - 1, i)));
      setShowOverview(false);
    },
    [total]
  );

  const go = useCallback(
    (dir: number) => setCurrent((c) => Math.max(0, Math.min(total - 1, c + dir))),
    [total]
  );

  const handleNext = useCallback(() => go(1), [go]);
  const handlePrev = useCallback(() => go(-1), [go]);
  const handleFirst = useCallback(() => goTo(0), [goTo]);
  const handleLast = useCallback(() => goTo(total - 1), [goTo, total]);
  const handleHelp = useCallback(() => {
    setShowKeyboardHelp((prev) => !prev);
  }, []);
  const handleEscape = useCallback(() => {
    if (showKeyboardHelp) {
      setShowKeyboardHelp(false);
    } else if (showAuthor) {
      setShowAuthor(false);
    } else if (showDiscount) {
      setShowDiscount(false);
    } else if (showOverview) {
      setShowOverview(false);
    }
  }, [showKeyboardHelp, showAuthor, showDiscount, showOverview]);

  useKeyboardNavigation({
    onNext: handleNext,
    onPrev: handlePrev,
    onFirst: handleFirst,
    onLast: handleLast,
    onHelp: handleHelp,
    onEscape: handleEscape,
    disabled: showOverview || showKeyboardHelp || showAuthor || showDiscount,
  });

  const { handleTouchStart, handleTouchEnd } = useTouchNavigation({
    onNext: handleNext,
    onPrev: handlePrev,
  });

  useUrlSync({
    currentSlide: current,
    totalSlides: total,
    onSlideChange: setCurrent,
  });

  const { share, copied } = useShare();

  const renderSlide = () => {
    switch (data.layout) {
      case 'cover':
        return <CoverSlide data={data} />;
      case 'intro':
        return <IntroSlide data={data} />;
      case 'rule':
        return <RuleSlide data={data} />;
      case 'tier-selection':
        return (
          <TierSelectionSlide
            data={data}
            onGoTo={goTo}
            enabledChapters={enabledChapters}
            onToggleChapter={handleToggleChapter}
          />
        );
      case 'chapter-title': {
        const chapterData = data as ChapterTitleSlideData;
        const nextId = getNextChapterId(chapterData.tierId, enabledChapters);
        return (
          <ChapterTitleSlide
            data={chapterData}
            onGoToChapterSelect={() => goTo(3)}
            onSkipToNextChapter={
              nextId ? () => goTo(getChapterStartIndex(nextId, enabledChapters)) : undefined
            }
            nextChapterLabel={
              nextId
                ? activeSlides.find(
                    (s) => s.layout === 'chapter-title' && (s as ChapterTitleSlideData).tierId === nextId
                  )?.title
                : undefined
            }
          />
        );
      }
      case 'summary':
        return (
          <SummarySlide
            data={data}
            onGoTo={goTo}
            ruleStartIndex={4}
          />
        );
      case 'closing':
        return <ClosingSlide data={data} />;
      case 'author':
        return <AuthorSlide data={data} />;
      default:
        return null;
    }
  };

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
        cursor: getCustomCursor(theme.accent),
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'background-color 0.3s, color 0.3s',
        position: 'relative',
        userSelect: 'none',
      }}
    >
      <div className="print-hide">
        <ParticleBackground />
      </div>
      <div className="print-hide">
        <ProgressBar current={current} total={total} />
      </div>

      {/* Top controls */}
      <div
        className="print-hide"
        style={{ position: 'absolute', top: 14, right: 16, display: 'flex', gap: 6, zIndex: 20 }}
      >
        <button
          className="ib"
          onClick={() => { setCurrent(0); navigate('/'); }}
          style={{ color: theme.textMuted }}
          title="Home"
        >
          <Home size={17} />
        </button>
        <button
          className="ib"
          onClick={() => navigate('/initial-steps')}
          style={{ color: theme.textMuted }}
          title="Initial Steps — From Idea to App"
        >
          <Footprints size={17} />
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
          className="ib"
          onClick={() => setShowDiscount(true)}
          style={{ color: theme.textMuted }}
          title="Discount offer"
        >
          <Gift size={17} />
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
        <button
          className="ib"
          onClick={() => navigate('/mindmap')}
          style={{ color: theme.textMuted }}
          title="Agentic Engineering Mindmap"
        >
          <Map size={17} />
        </button>
        <ThemeToggle />
        <ShareButton onShare={share} copied={copied} />
      </div>

      <a
        href="https://posterus.ventures/imprint"
        target="_blank"
        rel="noopener noreferrer"
        className="print-hide"
        style={{
          position: 'fixed',
          bottom: 10,
          right: 14,
          fontSize: '0.7rem',
          color: theme.textMuted,
          opacity: 0.5,
          textDecoration: 'none',
          zIndex: 20,
        }}
      >
        Impressum
      </a>

      {/* Slide */}
      <main
        key={current}
        className="fi slide-main print-hide"
        style={{ flex: 1, display: 'flex', overflow: 'hidden' }}
      >
        {renderSlide()}
      </main>

      {/* Initial Steps banner — only on cover slide */}
      {data.layout === 'cover' && (
        <div
          className="print-hide"
          onClick={() => navigate('/initial-steps')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            padding: '6px 16px',
            cursor: 'pointer',
            backgroundColor: theme.accentSoft,
            borderTop: `1px solid ${theme.accentBorder}`,
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = theme.accentBorder)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = theme.accentSoft)}
        >
          <Footprints size={14} style={{ color: theme.accent }} />
          <span style={{ fontSize: '0.78rem', fontWeight: 600, color: theme.accent }}>
            New here? Follow the Initial Steps — your guide from idea to app, no coding needed
          </span>
        </div>
      )}

      {/* Navigation */}
      <div className="print-hide" style={{ display: 'flex', justifyContent: 'center' }}>
        <NavigationControls
          current={current}
          total={total}
          onPrev={handlePrev}
          onNext={handleNext}
          onShowOverview={() => setShowOverview(true)}
        />
      </div>

      {/* Toast */}
      {copied && <Toast message="Copied to clipboard" />}

      {/* Slide overview */}
      {showOverview && (
        <SlideOverview
          slides={activeSlides}
          currentSlide={current}
          onClose={() => setShowOverview(false)}
          onSelectSlide={goTo}
        />
      )}

      {/* Author info */}
      {showAuthor && <AuthorModal onClose={() => setShowAuthor(false)} />}

      {/* Discount offer */}
      {showDiscount && <DiscountModal onClose={() => setShowDiscount(false)} />}

      {/* Keyboard help */}
      {showKeyboardHelp && <KeyboardHelp onClose={() => setShowKeyboardHelp(false)} />}

      {/* Print-only: all slides rendered statically */}
      <PrintAllSlides slides={activeSlides} />
    </div>
  );
}
