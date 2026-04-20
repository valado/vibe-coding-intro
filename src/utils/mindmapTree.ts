import type { MindMapRoot } from '../types/mindmap.types';

interface NodeWithChildren {
  id: string;
  label: string;
  children?: NodeWithChildren[];
}

export function findNode(root: NodeWithChildren, id: string): NodeWithChildren | null {
  if (root.id === id) return root;
  for (const c of root.children ?? []) {
    const hit = findNode(c, id);
    if (hit) return hit;
  }
  return null;
}

export function collectDescendants(root: NodeWithChildren, id: string): Set<string> {
  const target = findNode(root, id);
  const out = new Set<string>();
  if (!target) return out;
  (function walk(n: NodeWithChildren) {
    for (const c of n.children ?? []) {
      out.add(c.id);
      walk(c);
    }
  })(target);
  return out;
}

export function breadcrumb(root: NodeWithChildren, id: string): string[] {
  function path(node: NodeWithChildren, trail: string[] = []): string[] | null {
    if (node.id === id) return [...trail, node.label];
    for (const c of node.children ?? []) {
      const hit = path(c, [...trail, node.label]);
      if (hit) return hit;
    }
    return null;
  }
  return path(root) || [];
}

export function ancestorChain(root: NodeWithChildren, id: string): NodeWithChildren[] {
  function walk(node: NodeWithChildren, trail: NodeWithChildren[] = []): NodeWithChildren[] | null {
    if (node.id === id) return [...trail, node];
    for (const c of node.children ?? []) {
      const hit = walk(c, [...trail, node]);
      if (hit) return hit;
    }
    return null;
  }
  return walk(root) || [];
}

export function collectSearchContext(root: MindMapRoot, matchedIds: Set<string> | null): Set<string> | null {
  if (!matchedIds) return null;
  const out = new Set<string>(['root']);
  matchedIds.forEach((id) => {
    ancestorChain(root, id).forEach((n) => out.add(n.id));
    collectDescendants(root, id).forEach((descendantId) => out.add(descendantId));
  });
  return out;
}
