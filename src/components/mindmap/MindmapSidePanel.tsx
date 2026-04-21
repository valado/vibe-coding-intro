import { ChevronUp, ChevronDown, ArrowLeft, ArrowUp } from 'lucide-react';
import { useTheme } from '../../theme/useTheme';
import type { ViewState, MindMapNode } from '../../types/mindmap.types';

interface MindmapSidePanelProps {
  selected: { id: string; label: string; note?: string; subtitle?: string; children?: MindMapNode[] };
  selectedColor: string;
  selectedPath: string[];
  panelCollapsed: boolean;
  onTogglePanelCollapse: () => void;
  view: ViewState;
  visibleNodeCount: number;
  onFocusNode: (id: string) => void;
  parentNode: { id: string; label: string } | null;
  top?: number;
}

export function MindmapSidePanel({
  selected,
  selectedColor,
  selectedPath,
  panelCollapsed,
  onTogglePanelCollapse,
  view,
  visibleNodeCount,
  onFocusNode,
  parentNode,
  top = 92,
}: MindmapSidePanelProps) {
  const { theme } = useTheme();

  const panelStyle: React.CSSProperties = {
    position: 'absolute',
    top,
    right: 16,
    width: panelCollapsed ? 240 : 348,
    background: theme.overlayBg,
    borderRadius: 8,
    boxShadow: '0 18px 48px rgba(15,23,42,0.16)',
    padding: panelCollapsed ? '10px 14px' : 18,
    zIndex: 18,
    border: `1px solid ${theme.border}`,
    borderLeft: `5px solid ${selectedColor}`,
    backdropFilter: 'blur(10px)',
    maxHeight: `calc(100vh - ${top + 16}px)`,
    overflowY: 'auto',
    transition: 'width 160ms ease, padding 160ms ease',
  };

  const navBtnStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 12,
    fontWeight: 600,
    padding: '7px 10px',
    borderRadius: 8,
    border: `1px solid ${theme.border}`,
    background: theme.surface,
    color: theme.text,
    cursor: 'pointer',
  };

  return (
    <>
    <style>{`
      @media (max-width: 768px) {
        .mm-side-panel {
          top: auto !important;
          bottom: 16px !important;
          left: 16px !important;
          right: 16px !important;
          width: auto !important;
          max-height: 40vh !important;
        }
      }
    `}</style>
    <div className="mm-side-panel" style={panelStyle}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
          marginBottom: panelCollapsed ? 0 : 8,
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            color: selectedColor,
            fontSize: 12,
            fontWeight: 800,
            flex: 1,
            minWidth: 0,
          }}
        >
          <span
            style={{
              width: 9,
              height: 9,
              borderRadius: 4,
              background: selectedColor,
              display: 'inline-block',
              flexShrink: 0,
            }}
          />
          <span
            style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            title={selected.id === 'root' ? 'Overview' : selectedPath.join(' / ')}
          >
            {selected.id === 'root' ? 'Overview' : selectedPath.join(' / ')}
          </span>
        </div>
        <button
          type="button"
          onClick={onTogglePanelCollapse}
          aria-label={panelCollapsed ? 'Expand overview panel' : 'Collapse overview panel'}
          title={panelCollapsed ? 'Expand' : 'Collapse'}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 28,
            height: 28,
            borderRadius: 6,
            border: `1px solid ${theme.border}`,
            background: theme.surface,
            color: theme.text,
            cursor: 'pointer',
            padding: 0,
            flexShrink: 0,
          }}
        >
          {panelCollapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
        </button>
      </div>

      {!panelCollapsed && (
        <>
          <div style={{ fontSize: 21, fontWeight: 800, marginBottom: 6, lineHeight: 1.12, color: theme.text }}>
            {selected.label}
          </div>
          {selected.subtitle && (
            <div style={{ fontSize: 13, color: theme.textMuted, marginBottom: 10, fontWeight: 600 }}>
              {selected.subtitle}
            </div>
          )}
          <div style={{ fontSize: 14, lineHeight: 1.55, color: theme.text }}>
            {selected.note || 'No description yet.'}
          </div>

          {selected.children && selected.children.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: theme.textMuted, marginBottom: 8 }}>
                {selected.id === 'root' ? 'Maturity stages' : 'Includes'}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {selected.children.map((c) => (
                  <button
                    type="button"
                    key={c.id}
                    onClick={() => onFocusNode(c.id)}
                    style={{
                      ...navBtnStyle,
                      border: `1px solid ${selectedColor}40`,
                      background: `${selectedColor}10`,
                    }}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div
            style={{
              marginTop: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 8,
              color: theme.textMuted,
              fontSize: 12,
            }}
          >
            <span>{Math.round(view.k * 100)}% zoom</span>
            <span>{visibleNodeCount} visible nodes</span>
          </div>

          {selected.id !== 'root' && (
            <div style={{ marginTop: 14, display: 'flex', gap: 7, flexWrap: 'wrap' }}>
              <button type="button" onClick={() => onFocusNode('root')} style={navBtnStyle}>
                <ArrowLeft size={14} />
                Overview
              </button>
              {parentNode && (
                <button type="button" onClick={() => onFocusNode(parentNode.id)} style={navBtnStyle}>
                  <ArrowUp size={14} />
                  {parentNode.label}
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
    </>
  );
}
