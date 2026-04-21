import { useRef, useEffect, useCallback } from 'react';
import { Search, RotateCcw, Maximize2, List, ArrowLeft, Sun, Moon, Share2, Check, User, Gift, Maximize, Minimize, Home } from 'lucide-react';
import { useTheme } from '../../theme/useTheme';

interface MindmapHeaderProps {
  query: string;
  onQueryChange: (value: string) => void;
  matchedCount: number | null;
  onResetView: () => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onBackToSlides: () => void;
  onHeightChange?: (height: number) => void;
  onShare: () => void;
  copied: boolean;
  onShowAuthor: () => void;
  onShowDiscount: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export function MindmapHeader({
  query,
  onQueryChange,
  matchedCount,
  onResetView,
  isExpanded,
  onToggleExpand,
  onBackToSlides,
  onHeightChange,
  onShare,
  copied,
  onShowAuthor,
  onShowDiscount,
  isFullscreen,
  onToggleFullscreen,
}: MindmapHeaderProps) {
  const { theme, isDark, toggleTheme } = useTheme();
  const headerRef = useRef<HTMLDivElement>(null);

  const measureHeight = useCallback(() => {
    if (headerRef.current && onHeightChange) {
      onHeightChange(headerRef.current.offsetHeight);
    }
  }, [onHeightChange]);

  useEffect(() => {
    measureHeight();
    window.addEventListener('resize', measureHeight);
    return () => window.removeEventListener('resize', measureHeight);
  }, [measureHeight]);

  const headerStyle: React.CSSProperties = {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    display: 'flex',
    gap: 10,
    alignItems: 'center',
    zIndex: 20,
    flexWrap: 'wrap',
    padding: 10,
    background: theme.overlayBg,
    border: `1px solid ${theme.border}`,
    borderRadius: 8,
    boxShadow: '0 12px 34px rgba(0,0,0,0.10)',
    backdropFilter: 'blur(10px)',
  };

  const inputStyle: React.CSSProperties = {
    width: 290,
    height: 38,
    padding: '0 48px 0 36px',
    borderRadius: 8,
    border: `1px solid ${theme.border}`,
    background: theme.surface,
    color: theme.text,
    fontSize: 14,
    outline: 'none',
  };

  const btnStyle: React.CSSProperties = {
    height: 38,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: '0 12px',
    borderRadius: 8,
    border: `1px solid ${theme.border}`,
    background: theme.surface,
    color: theme.text,
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  };

  const iconBtnStyle: React.CSSProperties = {
    ...btnStyle,
    width: 38,
    padding: 0,
  };

  return (
    <>
      <style>{`
        .mm-header .mm-btn-label {
          display: inline;
        }
        .mm-header .mm-labeled-btn {
          width: auto !important;
          padding: 0 12px !important;
        }
        .mm-header .mm-search {
          width: 290px;
        }
        .mm-header .mm-title {
          min-width: 260px;
        }
        @media (max-width: 768px) {
          .mm-header .mm-btn-label {
            display: none !important;
          }
          .mm-header .mm-labeled-btn {
            width: 38px !important;
            padding: 0 !important;
          }
          .mm-header .mm-search {
            width: 140px !important;
          }
          .mm-header .mm-title {
            min-width: auto !important;
          }
          .mm-header .mm-title-sub {
            display: none !important;
          }
          .mm-header .mm-spacer {
            display: none !important;
          }
        }
      `}</style>
      <div ref={headerRef} className="mm-header" style={headerStyle}>
        <div className="mm-title" style={{ display: 'flex', flexDirection: 'column', gap: 2, marginRight: 4 }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: theme.text }}>
            Agentic Engineering Maturity Map
          </span>
          <span className="mm-title-sub" style={{ fontSize: 12, fontWeight: 500, color: theme.textMuted }}>
            Solo builder to regulated enterprise
          </span>
        </div>

        <label style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
          <span
            style={{
              position: 'absolute',
              left: 12,
              top: 11,
              color: theme.textMuted,
              pointerEvents: 'none',
            }}
          >
            <Search size={15} />
          </span>
          <input
            className="mm-search"
            aria-label="Search mind map"
            style={{ ...inputStyle, width: undefined }}
            placeholder="Search MCP, DSGVO, agents..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
          />
          {matchedCount !== null && (
            <span
              style={{
                position: 'absolute',
                right: 9,
                top: 8,
                minWidth: 28,
                height: 22,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
                background: matchedCount ? theme.accent : theme.surfaceHover,
                color: matchedCount ? '#ffffff' : theme.textMuted,
                fontSize: 12,
                fontWeight: 800,
              }}
            >
              {matchedCount}
            </span>
          )}
        </label>

        <button className="mm-labeled-btn" type="button" style={iconBtnStyle} onClick={onResetView} title="Reset view" aria-label="Reset view">
          <RotateCcw size={16} />
          <span className="mm-btn-label">Reset</span>
        </button>
        <button className="mm-labeled-btn" type="button" style={iconBtnStyle} onClick={onToggleExpand} title={isExpanded ? 'Compact' : 'Expand all'} aria-label={isExpanded ? 'Compact' : 'Expand all'}>
          {isExpanded ? <List size={16} /> : <Maximize2 size={16} />}
          <span className="mm-btn-label">{isExpanded ? 'Compact' : 'Expand'}</span>
        </button>

        <div className="mm-spacer" style={{ flex: 1 }} />

        <button type="button" style={iconBtnStyle} onClick={onBackToSlides} title="Home" aria-label="Home">
          <Home size={16} />
        </button>
        <button type="button" style={iconBtnStyle} onClick={onShowAuthor} title="About the author" aria-label="About the author">
          <User size={16} />
        </button>
        <button type="button" style={iconBtnStyle} onClick={onShowDiscount} title="Discount offer" aria-label="Discount offer">
          <Gift size={16} />
        </button>
        <button type="button" style={iconBtnStyle} onClick={onToggleFullscreen} title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'} aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}>
          {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
        </button>
        <button type="button" style={iconBtnStyle} onClick={toggleTheme} title={isDark ? 'Switch to light mode' : 'Switch to dark mode'} aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button type="button" style={iconBtnStyle} onClick={onShare} title="Share" aria-label="Share">
          {copied ? <Check size={16} /> : <Share2 size={16} />}
        </button>
        <button className="mm-labeled-btn" type="button" style={iconBtnStyle} onClick={onBackToSlides} title="Back to slides" aria-label="Back to slides">
          <ArrowLeft size={16} />
          <span className="mm-btn-label">Back to Slides</span>
        </button>
      </div>
    </>
  );
}
