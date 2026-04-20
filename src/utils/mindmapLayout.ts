import type { MindMapRoot, LayoutNode, LayoutEdge, StageBound, LayoutResult, ViewState } from '../types/mindmap.types';

export const STAGE_WIDTH = 470;
export const STAGE_GAP = 140;
export const STAGE_STEP = STAGE_WIDTH + STAGE_GAP;
export const ROOT_X = -1390;
export const ROOT_Y = -620;
export const STAGE_START_X = -760;
export const STAGE_HEADER_Y = -620;
export const SUBCAT_START_Y = -430;
export const SUBCAT_GAP = 36;
export const SUBCAT_TITLE_HEIGHT = 64;
export const LEAF_HEIGHT = 38;
export const LEAF_GAP = 9;
export const LEAF_WIDTH = STAGE_WIDTH - 70;
export const SVG_WIDTH = 3600;
export const SVG_HEIGHT = 2000;

export const INITIAL_VIEW: ViewState = { x: 30, y: 52, k: 0.58 };
export const EMPTY_COLLAPSED = new Set<string>();

export function computeLayout(root: MindMapRoot, collapsed: Set<string> = new Set()): LayoutResult {
  const nodes: LayoutNode[] = [];
  const edges: LayoutEdge[] = [];
  const stageBounds: StageBound[] = [];
  const tiers = root.children || [];

  nodes.push({
    id: root.id,
    label: root.label,
    note: root.note,
    children: root.children,
    x: ROOT_X,
    y: ROOT_Y,
    depth: 0,
    parent: null,
    boxWidth: 340,
    boxHeight: 118,
  });

  tiers.forEach((tier, ti) => {
    const tierX = STAGE_START_X + ti * STAGE_STEP;
    const tierY = STAGE_HEADER_Y;
    let cursorY = SUBCAT_START_Y;
    let maxY = STAGE_HEADER_Y + 58;

    nodes.push({
      id: tier.id,
      label: tier.label,
      note: tier.note,
      subtitle: tier.subtitle,
      color: tier.color,
      complexity: tier.complexity,
      children: tier.children,
      x: tierX,
      y: tierY,
      depth: 1,
      parent: root.id,
      tierIndex: ti,
      isTier: true,
      boxWidth: STAGE_WIDTH,
      boxHeight: 112,
    });

    edges.push({
      from: ti === 0 ? root.id : tiers[ti - 1].id,
      to: tier.id,
      color: tier.color,
      emphasize: true,
      progression: true,
    });

    const subcats = tier.children || [];
    subcats.forEach((sub, si) => {
      const leaves = sub.children || [];
      const isCollapsed = collapsed.has(sub.id);
      const expandedContentHeight =
        leaves.length * LEAF_HEIGHT + Math.max(0, leaves.length - 1) * LEAF_GAP;
      const visibleContentHeight = isCollapsed ? 0 : expandedContentHeight;
      const subHeight = SUBCAT_TITLE_HEIGHT + (isCollapsed ? 18 : visibleContentHeight + 26);
      const subY = cursorY + subHeight / 2;

      nodes.push({
        id: sub.id,
        label: sub.label,
        note: sub.note,
        children: sub.children,
        x: tierX,
        y: subY,
        depth: 2,
        parent: tier.id,
        tierIndex: ti,
        tierColor: tier.color,
        sectionIndex: si,
        boxWidth: STAGE_WIDTH,
        boxHeight: subHeight,
        headerHeight: SUBCAT_TITLE_HEIGHT,
        childCount: leaves.length,
      });
      edges.push({ from: tier.id, to: sub.id, color: tier.color });

      if (!isCollapsed) {
        leaves.forEach((leaf, li) => {
          const leafY =
            cursorY +
            SUBCAT_TITLE_HEIGHT +
            13 +
            LEAF_HEIGHT / 2 +
            li * (LEAF_HEIGHT + LEAF_GAP);
          nodes.push({
            id: leaf.id,
            label: leaf.label,
            note: leaf.note,
            x: tierX,
            y: leafY,
            depth: 3,
            parent: sub.id,
            tierIndex: ti,
            tierColor: tier.color,
            boxWidth: LEAF_WIDTH,
            boxHeight: LEAF_HEIGHT,
          });
          edges.push({ from: sub.id, to: leaf.id, color: tier.color, contained: true });
        });
      }

      maxY = Math.max(maxY, cursorY + subHeight);
      cursorY += subHeight + SUBCAT_GAP;
    });

    stageBounds.push({
      id: tier.id,
      x: tierX,
      color: tier.color,
      top: STAGE_HEADER_Y - 84,
      bottom: maxY + 42,
    });
  });

  return { nodes, edges, stageBounds };
}
