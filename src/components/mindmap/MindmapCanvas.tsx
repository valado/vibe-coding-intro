import type { LayoutNode, LayoutEdge, StageBound, ViewState } from '../../types/mindmap.types';
import type { MindMapRoot } from '../../types/mindmap.types';
import { useTheme } from '../../theme/useTheme';
import { MindmapNodeRenderer } from './MindmapNodeRenderer';
import { findNode } from '../../utils/mindmapTree';
import { TIER_COLORS } from '../../config/mindmap';
import {
  STAGE_WIDTH,
  STAGE_HEADER_Y,
  ROOT_X,
  STAGE_START_X,
  STAGE_STEP,
  SVG_WIDTH,
  SVG_HEIGHT,
  SUBCAT_TITLE_HEIGHT,
  LEAF_WIDTH,
} from '../../utils/mindmapLayout';

interface MindmapCanvasProps {
  visibleNodes: LayoutNode[];
  visibleEdges: LayoutEdge[];
  allNodes: LayoutNode[];
  stageBounds: StageBound[];
  view: ViewState;
  dragging: boolean;
  svgRef: React.RefObject<SVGSVGElement | null>;
  onMouseDown: (e: React.MouseEvent) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseUp: () => void;
  selectedId: string;
  matchedIds: Set<string> | null;
  highlightedIds: Set<string> | null;
  effectiveCollapsed: Set<string>;
  activeTiers: Set<string>;
  root: MindMapRoot;
  onFocusNode: (id: string) => void;
  onToggleCollapse: (id: string) => void;
}

export function MindmapCanvas({
  visibleNodes,
  visibleEdges,
  allNodes,
  stageBounds,
  view,
  dragging,
  svgRef,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  selectedId,
  matchedIds,
  highlightedIds,
  effectiveCollapsed,
  activeTiers,
  root,
  onFocusNode,
  onToggleCollapse,
}: MindmapCanvasProps) {
  const { theme } = useTheme();

  const progressY = STAGE_HEADER_Y - 134;
  const progressStart = ROOT_X - 86;
  const progressEnd =
    STAGE_START_X + STAGE_STEP * (root.children.length - 1) + STAGE_WIDTH / 2 + 96;

  const SHAFT_HALF = 3;
  const HEAD_HALF = 11;
  const HEAD_LEN = 22;
  const shaftEnd = progressEnd - HEAD_LEN;
  const arrowD = [
    `M ${progressStart} ${progressY - SHAFT_HALF}`,
    `L ${shaftEnd} ${progressY - SHAFT_HALF}`,
    `L ${shaftEnd} ${progressY - HEAD_HALF}`,
    `L ${progressEnd} ${progressY}`,
    `L ${shaftEnd} ${progressY + HEAD_HALF}`,
    `L ${shaftEnd} ${progressY + SHAFT_HALF}`,
    `L ${progressStart} ${progressY + SHAFT_HALF}`,
    'Z',
  ].join(' ');

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox={`${-SVG_WIDTH / 2} ${-SVG_HEIGHT / 2} ${SVG_WIDTH} ${SVG_HEIGHT}`}
      preserveAspectRatio="xMidYMid meet"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      style={{ cursor: dragging ? 'grabbing' : 'grab', userSelect: 'none', display: 'block' }}
    >
      <defs>
        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
        <linearGradient id="complexity-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={TIER_COLORS.solo} stopOpacity={0.95} />
          <stop offset="33%" stopColor={TIER_COLORS.team} stopOpacity={0.95} />
          <stop offset="66%" stopColor={TIER_COLORS.scaling} stopOpacity={0.95} />
          <stop offset="100%" stopColor={TIER_COLORS.enterprise} stopOpacity={0.95} />
        </linearGradient>
      </defs>

      <g transform={`translate(${view.x} ${view.y}) scale(${view.k})`}>
        {/* Progress arrow */}
        <path d={arrowD} fill="url(#complexity-grad)" opacity={0.85} />
        <text x={progressStart} y={progressY - 18} fontSize={15} fontWeight={800} fill={theme.textMuted}>
          maturity increases left to right
        </text>

        {/* Stage backgrounds */}
        {stageBounds.map((stage) => {
          if (!activeTiers.has(stage.id)) return null;
          return (
            <g key={`stage-bg-${stage.id}`}>
              <rect
                x={stage.x - STAGE_WIDTH / 2 - 20}
                y={stage.top}
                width={STAGE_WIDTH + 40}
                height={stage.bottom - stage.top}
                rx={8}
                ry={8}
                fill={theme.surface}
                stroke={stage.color}
                strokeOpacity={0.26}
                strokeWidth={1.5}
                opacity={0.86}
                style={{ filter: 'drop-shadow(0 18px 36px rgba(15,23,42,0.09))' }}
              />
              <rect
                x={stage.x - STAGE_WIDTH / 2 - 20}
                y={stage.top}
                width={STAGE_WIDTH + 40}
                height={5}
                rx={4}
                fill={stage.color}
                opacity={0.88}
              />
            </g>
          );
        })}

        {/* Edges */}
        {visibleEdges.map((e, i) => {
          const a = allNodes.find((n) => n.id === e.from);
          const b = allNodes.find((n) => n.id === e.to);
          if (!a || !b) return null;
          const dim = highlightedIds && !(highlightedIds.has(a.id) && highlightedIds.has(b.id));
          let d: string;
          if (e.contained) {
            const gutterX = a.x - (a.boxWidth || STAGE_WIDTH) / 2 + 28;
            const startY = a.y - (a.boxHeight || 0) / 2 + SUBCAT_TITLE_HEIGHT - 6;
            const leafLeft = b.x - (b.boxWidth || LEAF_WIDTH) / 2;
            d = `M ${gutterX} ${startY} L ${gutterX} ${b.y} L ${leafLeft - 10} ${b.y}`;
          } else if (e.progression) {
            const startX = a.x + (a.boxWidth || 0) / 2;
            const endX = b.x - (b.boxWidth || 0) / 2;
            const dx = Math.max(80, Math.abs(endX - startX) * 0.45);
            d = `M ${startX} ${a.y} C ${startX + dx} ${a.y} ${endX - dx} ${b.y} ${endX} ${b.y}`;
          } else {
            const startY = a.y + (a.boxHeight || 0) / 2;
            const endY = b.y - (b.boxHeight || 0) / 2;
            d = `M ${a.x} ${startY} C ${a.x} ${startY + 48} ${b.x} ${endY - 48} ${b.x} ${endY}`;
          }
          return (
            <path
              key={i}
              d={d}
              fill="none"
              stroke={e.color || theme.border}
              strokeWidth={e.contained ? 1.4 : e.emphasize ? 3.2 : 2}
              strokeOpacity={dim ? 0.08 : e.contained ? 0.24 : e.emphasize ? 0.56 : 0.34}
              strokeLinecap="round"
            />
          );
        })}

        {/* Nodes */}
        {visibleNodes.map((n) => {
          const directMatch = !!matchedIds?.has(n.id);
          const dimmed = !!highlightedIds && !highlightedIds.has(n.id);
          const hasChildren = !!(findNode(root, n.id) as { children?: unknown[] })?.children?.length;
          const isCollapsed = effectiveCollapsed.has(n.id);

          return (
            <MindmapNodeRenderer
              key={n.id}
              node={n}
              isSelected={n.id === selectedId}
              directMatch={directMatch}
              dimmed={dimmed}
              isCollapsed={isCollapsed}
              hasChildren={hasChildren}
              onFocus={onFocusNode}
              onToggleCollapse={onToggleCollapse}
            />
          );
        })}
      </g>
    </svg>
  );
}
