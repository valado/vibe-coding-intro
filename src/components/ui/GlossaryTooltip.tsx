import { useState, useRef, useEffect, useCallback, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from '../../theme/useTheme';

interface GlossaryTooltipProps {
  term: string;
  definition: string;
  children: ReactNode;
}

let activeCloseCallback: (() => void) | null = null;

const isHoverDevice = () =>
  window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export function GlossaryTooltip({ term, definition, children }: GlossaryTooltipProps) {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number; flip: boolean }>({
    x: 0,
    y: 0,
    flip: false,
  });
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout>>();
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();

  const calcPosition = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const spaceAbove = rect.top;
    const flip = spaceAbove < 120;
    const y = flip ? rect.bottom + 8 : rect.top - 8;
    setPos({ x, y, flip });
  }, []);

  const doOpen = useCallback(() => {
    if (activeCloseCallback && activeCloseCallback !== doClose) {
      activeCloseCallback();
    }
    activeCloseCallback = doClose;
    calcPosition();
    setOpen(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calcPosition]);

  const doClose = useCallback(() => {
    setOpen(false);
    if (activeCloseCallback === doClose) {
      activeCloseCallback = null;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearTimers = useCallback(() => {
    clearTimeout(openTimer.current);
    clearTimeout(closeTimer.current);
  }, []);

  // Desktop hover handlers
  const handleMouseEnter = useCallback(() => {
    if (!isHoverDevice()) return;
    clearTimers();
    openTimer.current = setTimeout(doOpen, 200);
  }, [clearTimers, doOpen]);

  const handleMouseLeave = useCallback(() => {
    if (!isHoverDevice()) return;
    clearTimers();
    closeTimer.current = setTimeout(doClose, 150);
  }, [clearTimers, doClose]);

  const handleBubbleEnter = useCallback(() => {
    if (!isHoverDevice()) return;
    clearTimers();
  }, [clearTimers]);

  const handleBubbleLeave = useCallback(() => {
    if (!isHoverDevice()) return;
    clearTimers();
    closeTimer.current = setTimeout(doClose, 150);
  }, [clearTimers, doClose]);

  // Mobile tap handler
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (isHoverDevice()) return;
      e.preventDefault();
      e.stopPropagation();
      if (open) {
        doClose();
      } else {
        doOpen();
      }
    },
    [open, doOpen, doClose],
  );

  // Close on tap outside or Escape (mobile)
  useEffect(() => {
    if (!open) return;

    const handleOutside = (e: MouseEvent) => {
      if (
        triggerRef.current?.contains(e.target as Node) ||
        tooltipRef.current?.contains(e.target as Node)
      )
        return;
      doClose();
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') doClose();
    };

    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, doClose]);

  // Clean up timers
  useEffect(() => clearTimers, [clearTimers]);

  const tooltip = open
    ? createPortal(
        <div
          ref={tooltipRef}
          className="glossary-tooltip"
          role="tooltip"
          style={{
            '--arrow-color': theme.surface,
            position: 'fixed',
            left: pos.x,
            top: pos.y,
            transform: pos.flip ? 'translateX(-50%)' : 'translate(-50%, -100%)',
            zIndex: 10000,
            maxWidth: 320,
            padding: '12px 16px',
            borderRadius: 12,
            background: theme.surface,
            border: `1px solid ${theme.accentBorder}`,
            boxShadow: `0 8px 32px rgba(0,0,0,0.25), 0 0 0 1px ${theme.accentBorder}`,
            color: theme.text,
            fontSize: '0.82rem',
            lineHeight: 1.55,
            pointerEvents: 'auto',
          } as React.CSSProperties}
          onMouseEnter={handleBubbleEnter}
          onMouseLeave={handleBubbleLeave}
        >
          <div
            className={`glossary-arrow ${pos.flip ? 'glossary-arrow-top' : 'glossary-arrow-bottom'}`}
          />
          <strong
            style={{
              display: 'block',
              fontSize: '0.78rem',
              color: theme.accent,
              marginBottom: 4,
              fontWeight: 700,
              letterSpacing: '0.02em',
            }}
          >
            {term}
          </strong>
          {definition}
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      <span
        ref={triggerRef}
        className="glossary-term"
        style={{
          textDecorationColor: `${theme.accent}80`,
          backgroundColor: theme.accentSoft,
          color: 'inherit',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {children}
      </span>
      {tooltip}
    </>
  );
}
