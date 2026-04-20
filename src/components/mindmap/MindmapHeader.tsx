import { Search, RotateCcw, ZoomIn, ZoomOut, Maximize2, List } from 'lucide-react';
import { useTheme } from '../../theme/useTheme';

interface MindmapHeaderProps {
  query: string;
  onQueryChange: (value: string) => void;
  matchedCount: number | null;
  onResetView: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onExpandAll: () => void;
  onCollapseAll: () => void;
}

export function MindmapHeader({
  query,
  onQueryChange,
  matchedCount,
  onResetView,
  onZoomIn,
  onZoomOut,
  onExpandAll,
  onCollapseAll,
}: MindmapHeaderProps) {
  const { theme } = useTheme();

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
    boxShadow: '0 12px 34px rgba(15,23,42,0.10)',
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
    <div style={headerStyle}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 260, marginRight: 4 }}>
        <span style={{ fontSize: 18, fontWeight: 800, color: theme.text }}>
          Agentic Engineering Maturity Map
        </span>
        <span style={{ fontSize: 12, fontWeight: 500, color: theme.textMuted }}>
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
          aria-label="Search mind map"
          style={inputStyle}
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
              background: matchedCount ? '#f59e0b' : theme.surfaceHover,
              color: matchedCount ? '#ffffff' : theme.textMuted,
              fontSize: 12,
              fontWeight: 800,
            }}
          >
            {matchedCount}
          </span>
        )}
      </label>

      <button type="button" style={btnStyle} onClick={onResetView} title="Reset view">
        <RotateCcw size={16} />
        Reset
      </button>
      <button type="button" style={iconBtnStyle} onClick={onZoomIn} title="Zoom in" aria-label="Zoom in">
        <ZoomIn size={16} />
      </button>
      <button type="button" style={iconBtnStyle} onClick={onZoomOut} title="Zoom out" aria-label="Zoom out">
        <ZoomOut size={16} />
      </button>
      <button type="button" style={btnStyle} onClick={onExpandAll}>
        <Maximize2 size={16} />
        Expand
      </button>
      <button type="button" style={btnStyle} onClick={onCollapseAll}>
        <List size={16} />
        Compact
      </button>
    </div>
  );
}
