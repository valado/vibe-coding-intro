export interface MindMapLeafNode {
  id: string;
  label: string;
  note: string;
}

export interface MindMapSubCategory {
  id: string;
  label: string;
  note: string;
  children: MindMapLeafNode[];
}

export interface MindMapTier {
  id: string;
  label: string;
  subtitle: string;
  color: string;
  complexity: number;
  note: string;
  children: MindMapSubCategory[];
}

export interface MindMapRoot {
  id: string;
  label: string;
  note: string;
  children: MindMapTier[];
}

export type MindMapNode = MindMapRoot | MindMapTier | MindMapSubCategory | MindMapLeafNode;

export type TierColorKey = 'solo' | 'team' | 'scaling' | 'enterprise';
export type TierColors = Record<TierColorKey, string>;

export interface LayoutNode {
  id: string;
  label: string;
  note?: string;
  subtitle?: string;
  color?: string;
  complexity?: number;
  x: number;
  y: number;
  depth: number;
  parent: string | null;
  boxWidth: number;
  boxHeight: number;
  tierIndex?: number;
  tierColor?: string;
  isTier?: boolean;
  sectionIndex?: number;
  headerHeight?: number;
  childCount?: number;
  children?: MindMapNode[];
}

export interface LayoutEdge {
  from: string;
  to: string;
  color: string;
  emphasize?: boolean;
  contained?: boolean;
  progression?: boolean;
}

export interface StageBound {
  id: string;
  x: number;
  color: string;
  top: number;
  bottom: number;
}

export interface LayoutResult {
  nodes: LayoutNode[];
  edges: LayoutEdge[];
  stageBounds: StageBound[];
}

export interface ViewState {
  x: number;
  y: number;
  k: number;
}
