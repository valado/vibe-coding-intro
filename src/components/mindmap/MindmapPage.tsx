import { useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../theme/useTheme';
import { useShare } from '../../hooks/useShare';
import { MIND_MAP } from '../../config/mindmap';
import { computeLayout, INITIAL_VIEW, SVG_WIDTH, SVG_HEIGHT } from '../../utils/mindmapLayout';
import { findNode, breadcrumb, ancestorChain } from '../../utils/mindmapTree';
import { usePanZoom } from '../../hooks/usePanZoom';
import { useMindmapSearch } from '../../hooks/useMindmapSearch';
import { useMindmapCollapse } from '../../hooks/useMindmapCollapse';
import { MindmapHeader } from './MindmapHeader';
import { TierFilterBar } from './TierFilterBar';
import { MindmapCanvas } from './MindmapCanvas';
import { MindmapSidePanel } from './MindmapSidePanel';
import { AuthorModal } from '../ui/AuthorModal';
import { DiscountModal } from '../ui/DiscountModal';
import type { MindMapNode } from '../../types/mindmap.types';

export function MindmapPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { share, copied } = useShare();
  const [selectedId, setSelectedId] = useState('root');
  const [panelCollapsed, setPanelCollapsed] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(60);
  const [showAuthor, setShowAuthor] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

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
  const contentTop = 16 + headerHeight + 12; // header top + height + gap

  const panZoom = usePanZoom({ svgWidth: SVG_WIDTH, svgHeight: SVG_HEIGHT, initialView: INITIAL_VIEW });

  // Layout needs to be computed before search/collapse hooks can use nodes
  // We'll compute an initial layout, then the collapse hook refines it
  const initialLayout = useMemo(() => computeLayout(MIND_MAP), []);

  const search = useMindmapSearch({ nodes: initialLayout.nodes, root: MIND_MAP });

  const collapse = useMindmapCollapse({
    root: MIND_MAP,
    nodes: initialLayout.nodes,
    isSearchActive: search.isSearchActive,
  });

  // Recompute layout with effective collapsed state
  const { nodes, edges, stageBounds } = useMemo(
    () => computeLayout(MIND_MAP, collapse.effectiveCollapsed),
    [collapse.effectiveCollapsed],
  );

  const visibleNodes = useMemo(
    () => nodes.filter((n) => !collapse.hiddenIds.has(n.id)),
    [nodes, collapse.hiddenIds],
  );
  const visibleEdges = useMemo(
    () => edges.filter((e) => !collapse.hiddenIds.has(e.from) && !collapse.hiddenIds.has(e.to)),
    [edges, collapse.hiddenIds],
  );

  const selected = findNode(MIND_MAP, selectedId) || MIND_MAP;
  const selectedColor = (() => {
    const chain = ancestorChain(MIND_MAP, selectedId);
    for (let i = chain.length - 1; i >= 0; i--) {
      const node = chain[i] as unknown as { color?: string };
      if (node.color) return node.color;
    }
    return theme.text;
  })();
  const selectedPath = breadcrumb(MIND_MAP, selected.id);

  const parentNode = useMemo(() => {
    const chain = ancestorChain(MIND_MAP, selectedId);
    if (chain.length >= 2) {
      const parent = chain[chain.length - 2];
      return { id: parent.id, label: parent.label };
    }
    return null;
  }, [selectedId]);

  const focusNode = useCallback(
    (id: string) => {
      setSelectedId(id);
      if (id !== 'root') setPanelCollapsed(false);
      const n = nodes.find((n) => n.id === id);
      if (n) panZoom.focusPosition(n.x, n.y);
    },
    [nodes, panZoom],
  );

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100vh',
    backgroundColor: theme.bg,
    backgroundImage: `linear-gradient(${theme.border}44 1px, transparent 1px), linear-gradient(90deg, ${theme.border}44 1px, transparent 1px)`,
    backgroundSize: '36px 36px',
    fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    color: theme.text,
    overflow: 'hidden',
  };

  return (
    <div style={containerStyle}>
      <MindmapHeader
        query={search.query}
        onQueryChange={search.setQuery}
        matchedCount={search.matchedCount}
        onResetView={panZoom.resetView}
        isExpanded={collapse.collapsed.size === 0}
        onToggleExpand={() => (collapse.collapsed.size === 0 ? collapse.collapseAll() : collapse.expandAll())}
        onBackToSlides={() => navigate('/')}
        onHeightChange={setHeaderHeight}
        onShare={share}
        copied={copied}
        onShowAuthor={() => setShowAuthor(true)}
        onShowDiscount={() => setShowDiscount(true)}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
      />

      <TierFilterBar
        tiers={MIND_MAP.children}
        activeTiers={collapse.activeTiers}
        onToggleTier={collapse.toggleTier}
        top={contentTop}
      />

      <MindmapCanvas
        visibleNodes={visibleNodes}
        visibleEdges={visibleEdges}
        allNodes={nodes}
        stageBounds={stageBounds}
        view={panZoom.view}
        dragging={panZoom.dragging}
        svgRef={panZoom.svgRef}
        onMouseDown={panZoom.onMouseDown}
        onMouseMove={panZoom.onMouseMove}
        onMouseUp={panZoom.onMouseUp}
        selectedId={selectedId}
        matchedIds={search.matchedIds}
        highlightedIds={search.highlightedIds}
        effectiveCollapsed={collapse.effectiveCollapsed}
        activeTiers={collapse.activeTiers}
        root={MIND_MAP}
        onFocusNode={focusNode}
        onToggleCollapse={collapse.toggleCollapse}
      />

      <MindmapSidePanel
        selected={selected as { id: string; label: string; note?: string; subtitle?: string; children?: MindMapNode[] }}
        selectedColor={selectedColor}
        selectedPath={selectedPath}
        panelCollapsed={panelCollapsed}
        onTogglePanelCollapse={() => setPanelCollapsed((v) => !v)}
        view={panZoom.view}
        visibleNodeCount={visibleNodes.length}
        onFocusNode={focusNode}
        parentNode={parentNode}
        top={contentTop}
      />

      {showAuthor && <AuthorModal onClose={() => setShowAuthor(false)} />}
      {showDiscount && <DiscountModal onClose={() => setShowDiscount(false)} />}
    </div>
  );
}
