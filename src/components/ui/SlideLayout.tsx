interface SlideLayoutProps {
  children: React.ReactNode;
  /** 'hero' = centered. 'content' = left-aligned. */
  variant?: 'hero' | 'content';
  /** Max width of the inner content wrapper. Hero: unconstrained by default. Content: 800 by default. */
  maxWidth?: number;
  /** Extra styles merged into the outer slide div. */
  style?: React.CSSProperties;
  /** Extra styles merged into the inner content wrapper. */
  innerStyle?: React.CSSProperties;
  /** Absolutely-positioned elements rendered between the gradient and the content (decorative shapes, watermarks). */
  decorations?: React.ReactNode;
}

export function SlideLayout({
  children,
  variant = 'hero',
  maxWidth,
  style,
  innerStyle,
  decorations,
}: SlideLayoutProps) {
  const isHero = variant === 'hero';

  return (
    <div
      className="r-pad slide-scroll"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        ...(isHero && { alignItems: 'center', textAlign: 'center' }),
        height: '100%',
        width: '100%',
        position: 'relative',
        padding: '40px 32px',
        ...(!isHero && { overflow: 'hidden' }),
        ...style,
      }}
    >
      {decorations}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          ...(isHero
            ? { ...(maxWidth != null && { maxWidth }) }
            : { maxWidth: maxWidth ?? 800, margin: '0 auto', width: '100%' }),
          ...innerStyle,
        }}
      >
        {children}
      </div>
    </div>
  );
}
