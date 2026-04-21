import type { LayoutNode } from '../../types/mindmap.types';
import { useTheme } from '../../theme/useTheme';
import { STAGE_WIDTH, LEAF_WIDTH, SUBCAT_TITLE_HEIGHT } from '../../utils/mindmapLayout';

interface MindmapNodeRendererProps {
  node: LayoutNode;
  isSelected: boolean;
  directMatch: boolean;
  dimmed: boolean;
  isCollapsed: boolean;
  hasChildren: boolean;
  onFocus: (id: string) => void;
  onToggleCollapse: (id: string) => void;
}

export function MindmapNodeRenderer({
  node: n,
  isSelected,
  directMatch,
  dimmed,
  isCollapsed,
  hasChildren,
  onFocus,
  onToggleCollapse,
}: MindmapNodeRendererProps) {
  const { theme } = useTheme();
  const isRoot = n.depth === 0;
  const isTier = n.depth === 1;
  const isSubcat = n.depth === 2;
  const isLeaf = n.depth >= 3;

  const W_BOX = n.boxWidth || (isRoot ? 340 : isTier ? STAGE_WIDTH : isLeaf ? LEAF_WIDTH : STAGE_WIDTH);
  const H_BOX = n.boxHeight || (isRoot ? 118 : isTier ? 112 : isLeaf ? 38 : 90);
  const tierColor = n.color || n.tierColor || '#334155';

  const baseStroke = isSelected ? theme.text : directMatch ? theme.accent : isLeaf ? theme.border : `${tierColor}55`;
  const strokeWidth = isSelected ? 3 : directMatch ? 2.6 : isSubcat ? 1.4 : isLeaf ? 1 : 0;

  return (
    <g
      transform={`translate(${n.x} ${n.y})`}
      opacity={dimmed ? 0.2 : 1}
      style={{ cursor: 'pointer' }}
      onClick={(e) => {
        e.stopPropagation();
        onFocus(n.id);
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        if (hasChildren) onToggleCollapse(n.id);
      }}
    >
      {/* Glow behind root, tier, selected, or matched nodes */}
      {(isRoot || isTier || isSelected || directMatch) && (
        <ellipse
          cx={0}
          cy={5}
          rx={W_BOX / 2 + (isLeaf ? 8 : 18)}
          ry={H_BOX / 2 + (isLeaf ? 8 : 14)}
          fill={directMatch ? theme.accent : tierColor}
          opacity={directMatch ? 0.18 : 0.16}
          filter="url(#soft)"
        />
      )}

      {/* Subcategory container */}
      {isSubcat && (
        <>
          <rect
            x={-W_BOX / 2}
            y={-H_BOX / 2}
            width={W_BOX}
            height={H_BOX}
            rx={8}
            ry={8}
            fill={theme.surface}
            stroke={baseStroke}
            strokeWidth={strokeWidth}
            style={{ filter: 'drop-shadow(0 9px 22px rgba(0,0,0,0.10))' }}
          />
          <rect
            x={-W_BOX / 2}
            y={-H_BOX / 2}
            width={W_BOX}
            height={n.headerHeight || SUBCAT_TITLE_HEIGHT}
            rx={8}
            ry={8}
            fill={tierColor}
            opacity={0.09}
          />
          <rect
            x={-W_BOX / 2}
            y={-H_BOX / 2}
            width={6}
            height={H_BOX}
            rx={4}
            fill={tierColor}
          />
        </>
      )}

      {/* Root, tier, and leaf boxes */}
      {(isRoot || isTier || isLeaf) && (
        <rect
          x={-W_BOX / 2}
          y={-H_BOX / 2}
          width={W_BOX}
          height={H_BOX}
          rx={8}
          ry={8}
          fill={isRoot ? '#1A1410' : isTier ? tierColor : isSelected ? '#1A1410' : theme.surface}
          stroke={baseStroke}
          strokeWidth={strokeWidth}
          style={{
            filter: isRoot
              ? 'drop-shadow(0 16px 30px rgba(0,0,0,0.28))'
              : isTier
              ? `drop-shadow(0 14px 30px ${tierColor}36)`
              : 'drop-shadow(0 3px 8px rgba(0,0,0,0.08))',
          }}
        />
      )}

      {/* Leaf accent bar */}
      {isLeaf && (
        <rect
          x={-W_BOX / 2}
          y={-H_BOX / 2}
          width={5}
          height={H_BOX}
          rx={4}
          fill={isSelected ? '#ffffff' : tierColor}
          opacity={isSelected ? 0.92 : 0.82}
        />
      )}

      {/* Root label */}
      {isRoot && (
        <foreignObject
          x={-W_BOX / 2 + 22}
          y={-H_BOX / 2 + 17}
          width={W_BOX - 44}
          height={H_BOX - 34}
          style={{ pointerEvents: 'none' }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              color: '#ffffff',
              lineHeight: 1.18,
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 800 }}>{n.label}</div>
            <div style={{ marginTop: 7, fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
              A practical journey from prototype to governed agent fleet.
            </div>
          </div>
        </foreignObject>
      )}

      {/* Tier label with complexity badge */}
      {isTier && (
        <>
          <rect
            x={-W_BOX / 2 + 18}
            y={-H_BOX / 2 + 18}
            width={40}
            height={40}
            rx={8}
            fill="rgba(255,255,255,0.20)"
            stroke="rgba(255,255,255,0.55)"
          />
          <text
            x={-W_BOX / 2 + 38}
            y={-H_BOX / 2 + 45}
            textAnchor="middle"
            fontSize={20}
            fontWeight={800}
            fill="#ffffff"
          >
            {n.complexity}
          </text>
          <foreignObject
            x={-W_BOX / 2 + 72}
            y={-H_BOX / 2 + 18}
            width={W_BOX - 96}
            height={H_BOX - 36}
            style={{ pointerEvents: 'none' }}
          >
            <div
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                color: '#ffffff',
                lineHeight: 1.15,
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 800 }}>{n.label}</div>
              {n.subtitle && (
                <div style={{ marginTop: 5, fontSize: 12, fontWeight: 600, opacity: 0.92 }}>
                  {n.subtitle}
                </div>
              )}
            </div>
          </foreignObject>
        </>
      )}

      {/* Subcategory header + collapse pill */}
      {isSubcat && (
        <>
          <foreignObject
            x={-W_BOX / 2 + 22}
            y={-H_BOX / 2 + 10}
            width={W_BOX - 96}
            height={(n.headerHeight || SUBCAT_TITLE_HEIGHT) - 20}
            style={{ pointerEvents: 'none' }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                color: theme.text,
                lineHeight: 1.18,
              }}
            >
              <div style={{ fontSize: 15, fontWeight: 800 }}>{n.label}</div>
              <div
                style={{
                  marginTop: 3,
                  fontSize: 11,
                  color: theme.textMuted,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {n.note}
              </div>
            </div>
          </foreignObject>
          {renderCollapsePill(W_BOX, H_BOX, tierColor, n.childCount || 0, isCollapsed, hasChildren, (e) => {
            e.stopPropagation();
            if (hasChildren) onToggleCollapse(n.id);
          })}
        </>
      )}

      {/* Leaf label */}
      {isLeaf && (
        <foreignObject
          x={-W_BOX / 2 + 16}
          y={-H_BOX / 2 + 4}
          width={W_BOX - 28}
          height={H_BOX - 8}
          style={{ pointerEvents: 'none' }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              color: isSelected ? '#ffffff' : theme.text,
              fontSize: 12,
              fontWeight: isSelected ? 700 : 600,
              lineHeight: 1.15,
              overflow: 'hidden',
            }}
          >
            {n.label}
          </div>
        </foreignObject>
      )}
    </g>
  );
}

function renderCollapsePill(
  boxWidth: number,
  boxHeight: number,
  tierColor: string,
  childCount: number,
  isCollapsed: boolean,
  hasChildren: boolean,
  onClick: (e: React.MouseEvent) => void,
) {
  const PILL_W = 52;
  const PILL_H = 22;
  const pillX = boxWidth / 2 - PILL_W - 14;
  const pillY = -boxHeight / 2 + 14;

  return (
    <g
      transform={`translate(${pillX} ${pillY})`}
      onClick={onClick}
      style={{ cursor: hasChildren ? 'pointer' : 'default' }}
    >
      <rect
        width={PILL_W}
        height={PILL_H}
        rx={PILL_H / 2}
        fill={`${tierColor}14`}
        stroke={`${tierColor}55`}
        strokeWidth={1}
      />
      <text
        x={PILL_W / 2 - 8}
        y={PILL_H / 2 + 4}
        textAnchor="middle"
        fontSize={11}
        fontWeight={800}
        fill={tierColor}
      >
        {childCount}
      </text>
      {hasChildren && (
        <path
          d={
            isCollapsed
              ? `M ${PILL_W - 14} ${PILL_H / 2 - 3} l 4 4 l 4 -4`
              : `M ${PILL_W - 14} ${PILL_H / 2 + 1} l 4 -4 l 4 4`
          }
          fill="none"
          stroke={tierColor}
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </g>
  );
}
