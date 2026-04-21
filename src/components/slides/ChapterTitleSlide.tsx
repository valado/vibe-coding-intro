import { useTheme } from '../../theme/useTheme';
import { ChapterTitleSlideData } from '../../types';
import { ChevronRight, List } from 'lucide-react';

interface ChapterTitleSlideProps {
  data: ChapterTitleSlideData;
  onSkipToNextChapter?: () => void;
  nextChapterLabel?: string;
  onGoToChapterSelect?: () => void;
}

export function ChapterTitleSlide({ data, onSkipToNextChapter, nextChapterLabel, onGoToChapterSelect }: ChapterTitleSlideProps) {
  const { theme } = useTheme();

  return (
    <div
      className="r-pad slide-scroll"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        height: '100%',
        width: '100%',
        position: 'relative',
        padding: '40px 32px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: theme.heroGrad,
          pointerEvents: 'none',
        }}
      />
      {/* Decorative circle */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 320,
          height: 320,
          borderRadius: '50%',
          border: `2px solid ${data.color}22`,
          backgroundColor: `${data.color}08`,
          pointerEvents: 'none',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Complexity dots */}
        <div className="s1" style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 20 }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: i < data.complexity ? data.color : theme.border,
                transition: 'background-color 0.3s',
              }}
            />
          ))}
        </div>
        <h1
          className="t-lg s2"
          style={{
            fontSize: '3.2rem',
            fontWeight: 900,
            lineHeight: 1.1,
            color: data.color,
          }}
        >
          {data.title}
        </h1>
        <p
          className="s3"
          style={{
            fontSize: '1.1rem',
            fontWeight: 600,
            color: theme.textMuted,
            marginTop: 10,
            letterSpacing: '0.02em',
          }}
        >
          {data.subtitle}
        </p>
        <p
          className="s4"
          style={{
            fontSize: '1rem',
            color: theme.textMuted,
            marginTop: 20,
            lineHeight: 1.6,
            maxWidth: 520,
            opacity: 0.8,
          }}
        >
          {data.vision}
        </p>

        {/* Navigation buttons */}
        <div className="s5" style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 32 }}>
          {onGoToChapterSelect && (
            <button
              onClick={onGoToChapterSelect}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 16px',
                borderRadius: 10,
                background: theme.surface,
                border: `1px solid ${theme.border}`,
                color: theme.textMuted,
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'border-color 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = data.color; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme.border; }}
            >
              <List size={15} />
              All chapters
            </button>
          )}
          {onSkipToNextChapter && nextChapterLabel && (
            <button
              onClick={onSkipToNextChapter}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 16px',
                borderRadius: 10,
                background: `${data.color}15`,
                border: `1px solid ${data.color}33`,
                color: data.color,
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = `${data.color}25`; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = `${data.color}15`; }}
            >
              Skip to {nextChapterLabel} <ChevronRight size={15} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
