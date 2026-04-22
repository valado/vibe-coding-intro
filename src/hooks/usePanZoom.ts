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
  const pinchRef = useRef({ initialDistance: 0, initialK: 0 });
  const svgRef = useRef<SVGSVGElement>(null);
  const viewRef = useRef(view);
  viewRef.current = view;

  const getUnitsPerPx = useCallback(() => {
    const svg = svgRef.current;
    const rect = svg ? svg.getBoundingClientRect() : { width: svgWidth, height: svgHeight };
    return Math.max(svgWidth / rect.width, svgHeight / rect.height) || 1;
  }, [svgWidth, svgHeight]);

  // --- Mouse ---
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    setDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: view.x,
      origY: view.y,
      unitsPerPx: getUnitsPerPx(),
    };
  }, [view.x, view.y, getUnitsPerPx]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging) return;
    const upp = dragRef.current.unitsPerPx || 1;
    const dx = (e.clientX - dragRef.current.startX) * upp;
    const dy = (e.clientY - dragRef.current.startY) * upp;
    setView((v) => ({ ...v, x: dragRef.current.origX + dx, y: dragRef.current.origY + dy }));
  }, [dragging]);

  const onMouseUp = useCallback(() => setDragging(false), []);

  // --- Touch (drag + pinch-to-zoom) ---
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;

    let activeTouches = 0;

    const handleTouchStart = (e: TouchEvent) => {
      activeTouches = e.touches.length;
      if (e.touches.length === 1) {
        e.preventDefault();
        const t = e.touches[0];
        setDragging(true);
        dragRef.current = {
          startX: t.clientX,
          startY: t.clientY,
          origX: viewRef.current.x,
          origY: viewRef.current.y,
          unitsPerPx: getUnitsPerPx(),
        };
      } else if (e.touches.length === 2) {
        e.preventDefault();
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        pinchRef.current = {
          initialDistance: Math.hypot(dx, dy),
          initialK: viewRef.current.k,
        };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && activeTouches === 1) {
        e.preventDefault();
        const t = e.touches[0];
        const upp = dragRef.current.unitsPerPx || 1;
        const dx = (t.clientX - dragRef.current.startX) * upp;
        const dy = (t.clientY - dragRef.current.startY) * upp;
        setView((v) => ({ ...v, x: dragRef.current.origX + dx, y: dragRef.current.origY + dy }));
      } else if (e.touches.length === 2) {
        e.preventDefault();
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.hypot(dx, dy);
        const scale = dist / (pinchRef.current.initialDistance || 1);
        const nextK = Math.min(2.5, Math.max(0.25, pinchRef.current.initialK * scale));
        setView((v) => ({ ...v, k: nextK }));
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      activeTouches = e.touches.length;
      if (e.touches.length === 0) {
        setDragging(false);
      }
    };

    el.addEventListener('touchstart', handleTouchStart, { passive: false });
    el.addEventListener('touchmove', handleTouchMove, { passive: false });
    el.addEventListener('touchend', handleTouchEnd);
    el.addEventListener('touchcancel', handleTouchEnd);

    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchend', handleTouchEnd);
      el.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [getUnitsPerPx]);

  // --- Wheel zoom ---
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
