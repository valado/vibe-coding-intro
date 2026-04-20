import { useState, useMemo } from 'react';
import type { LayoutNode, MindMapRoot } from '../types/mindmap.types';
import { collectSearchContext } from '../utils/mindmapTree';

interface UseMindmapSearchOptions {
  nodes: LayoutNode[];
  root: MindMapRoot;
}

export function useMindmapSearch({ nodes, root }: UseMindmapSearchOptions) {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();

  const matchedIds = useMemo(() => {
    if (!q) return null;
    const out = new Set<string>();
    nodes.forEach((n) => {
      const label = (n.label || '').toLowerCase();
      const note = (n.note || '').toLowerCase();
      const subtitle = (n.subtitle || '').toLowerCase();
      if (label.includes(q) || note.includes(q) || subtitle.includes(q)) out.add(n.id);
    });
    return out;
  }, [q, nodes]);

  const highlightedIds = useMemo(
    () => collectSearchContext(root, matchedIds),
    [root, matchedIds],
  );

  const matchedCount = matchedIds ? matchedIds.size : null;

  return { query, setQuery, matchedIds, highlightedIds, matchedCount, isSearchActive: !!q };
}
