import { useState, useMemo, useCallback } from 'react';
import type { LayoutNode, MindMapRoot } from '../types/mindmap.types';
import { collectDescendants } from '../utils/mindmapTree';
import { EMPTY_COLLAPSED } from '../utils/mindmapLayout';

interface UseMindmapCollapseOptions {
  root: MindMapRoot;
  nodes: LayoutNode[];
  isSearchActive: boolean;
}

export function useMindmapCollapse({ root, nodes, isSearchActive }: UseMindmapCollapseOptions) {
  const [collapsed, setCollapsed] = useState<Set<string>>(() => new Set());
  const [activeTiers, setActiveTiers] = useState<Set<string>>(
    () => new Set(root.children.map((t) => t.id)),
  );

  const effectiveCollapsed = isSearchActive ? EMPTY_COLLAPSED : collapsed;

  const hiddenIds = useMemo(() => {
    const out = new Set<string>();
    effectiveCollapsed.forEach((id) => {
      collectDescendants(root, id).forEach((d) => out.add(d));
    });
    nodes.forEach((n) => {
      if (n.isTier && !activeTiers.has(n.id)) {
        out.add(n.id);
        collectDescendants(root, n.id).forEach((d) => out.add(d));
      }
    });
    return out;
  }, [effectiveCollapsed, activeTiers, nodes, root]);

  const toggleCollapse = useCallback((id: string) => {
    setCollapsed((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleTier = useCallback((id: string) => {
    setActiveTiers((s) => {
      const next = new Set(s);
      if (next.has(id) && next.size > 1) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const expandAll = useCallback(() => setCollapsed(new Set()), []);

  const collapseAll = useCallback(() => {
    const ids: string[] = [];
    (root.children || []).forEach((t) =>
      (t.children || []).forEach((s) => ids.push(s.id)),
    );
    setCollapsed(new Set(ids));
  }, [root]);

  return {
    collapsed,
    activeTiers,
    effectiveCollapsed,
    hiddenIds,
    toggleCollapse,
    toggleTier,
    expandAll,
    collapseAll,
  };
}
