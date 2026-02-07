import { useState, useCallback } from 'react';
import { useTheme } from '../theme/useTheme';
import { SLIDES } from '../config/slides';
import { CUSTOM_CURSOR } from '../constants/cursor';
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
import { User, Gift } from 'lucide-react';

export function Presentation() {
  const [current, setCurrent] = useState(0);
  const [showOverview, setShowOverview] = useState(false);
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);
  const [showAuthor, setShowAuthor] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);
  const { theme } = useTheme();

  const total = SLIDES.length;
  const data = SLIDES[current];

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

  // Custom hooks
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

  // Render appropriate slide component based on layout
  const renderSlide = () => {
    switch (data.layout) {
      case 'cover':
        return <CoverSlide data={data} />;
      case 'intro':
        return <IntroSlide data={data} />;
      case 'rule':
        return <RuleSlide data={data} />;
      case 'summary':
        return <SummarySlide data={data} onGoTo={goTo} />;
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
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: theme.bg,
        color: theme.text,
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        cursor: CUSTOM_CURSOR,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'background-color 0.3s, color 0.3s',
        position: 'relative',
        userSelect: 'none',
      }}
    >
      <ParticleBackground />
      <ProgressBar current={current} total={total} />

      {/* Top controls */}
      <div
        style={{ position: 'absolute', top: 14, right: 16, display: 'flex', gap: 6, zIndex: 20 }}
      >
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
        <ThemeToggle />
        <ShareButton onShare={share} copied={copied} />
      </div>

      {/* Slide */}
      <main
        key={current}
        className="fi slide-main"
        style={{ flex: 1, display: 'flex', overflow: 'hidden' }}
      >
        {renderSlide()}
      </main>

      {/* Bottom navigation */}
      <NavigationControls
        current={current}
        total={total}
        onPrev={handlePrev}
        onNext={handleNext}
        onShowOverview={() => setShowOverview(true)}
      />

      {/* Toast */}
      {copied && <Toast message="Copied to clipboard" />}

      {/* Slide overview */}
      {showOverview && (
        <SlideOverview
          slides={SLIDES}
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
    </div>
  );
}
