import { useState, useRef, useEffect, useCallback } from 'react';
import type { ViewState } from '../types/mindmap.types';

interface UsePanZoomOptions {
  svgWidth: number;
  svgHeight: number;
  initialView: ViewState;
}

export function usePanZoom({ svgWidth, svgHeight, initialView }: UsePanZoomOptions) {
  const [view, setView] = useState<ViewState>(initialView);
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startY: 0, origX: 0, origY: 0, unitsPerPx: 1 });
  const svgRef = useRef<SVGSVGElement>(null);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    setDragging(true);
    const svg = svgRef.current;
    const rect = svg ? svg.getBoundingClientRect() : { width: svgWidth, height: svgHeight };
    const unitsPerPx = Math.max(svgWidth / rect.width, svgHeight / rect.height) || 1;
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: view.x,
      origY: view.y,
      unitsPerPx,
    };
  }, [view.x, view.y, svgWidth, svgHeight]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging) return;
    const upp = dragRef.current.unitsPerPx || 1;
    const dx = (e.clientX - dragRef.current.startX) * upp;
    const dy = (e.clientY - dragRef.current.startY) * upp;
    setView((v) => ({ ...v, x: dragRef.current.origX + dx, y: dragRef.current.origY + dy }));
  }, [dragging]);

  const onMouseUp = useCallback(() => setDragging(false), []);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = -e.deltaY * 0.0015;
      setView((v) => {
        const nextK = Math.min(2.5, Math.max(0.25, v.k * (1 + delta)));
        return { ...v, k: nextK };
      });
    };
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  const resetView = useCallback(() => setView(initialView), [initialView]);

  const zoomIn = useCallback(() => {
    setView((v) => ({ ...v, k: Math.min(2.4, v.k + 0.1) }));
  }, []);

  const zoomOut = useCallback(() => {
    setView((v) => ({ ...v, k: Math.max(0.28, v.k - 0.1) }));
  }, []);

  const focusPosition = useCallback((x: number, y: number) => {
    setView((v) => ({ ...v, x: -x * v.k, y: -y * v.k }));
  }, []);

  return {
    view,
    dragging,
    svgRef,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    resetView,
    zoomIn,
    zoomOut,
    focusPosition,
  };
}
