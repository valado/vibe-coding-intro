import { useTheme } from '../../theme/useTheme';
import { TierSelectionSlideData, TierId } from '../../types';
import { MIND_MAP } from '../../config/mindmap';
import { getChapterStartIndex } from '../../config/slideAssembler';
import { ChevronRight } from 'lucide-react';

interface TierSelectionSlideProps {
  data: TierSelectionSlideData;
  onGoTo: (slideIndex: number) => void;
  enabledChapters: Set<TierId>;
  onToggleChapter: (tierId: TierId) => void;
}

const TIER_ID_MAP: Record<string, TierId> = {
  'tier-solo': 'solo',
  'tier-team': 'team',
  'tier-scaling': 'scaling',
  'tier-enterprise': 'enterprise',
};

interface ChapterCardData {
  id: TierId;
  label: string;
  subtitle: string;
  color: string;
  complexity: number;
  vision: string;
}

function getChapterCards(): ChapterCardData[] {
  const mindmapCards: ChapterCardData[] = MIND_MAP.children.map((tier) => ({
    id: TIER_ID_MAP[tier.id],
    label: tier.label,
    subtitle: tier.subtitle,
    color: tier.color,
    complexity: tier.complexity,
    vision: tier.note,
  }));

  mindmapCards.push({
    id: 'philosophical',
    label: 'Philosophical',
    subtitle: 'The bigger picture',
    color: '#B45309',
    complexity: 0,
    vision: 'Code has a new audience. What does that mean for how we write, structure, and think about software?',
  });

  return mindmapCards;
}

export function TierSelectionSlide({ data, onGoTo, enabledChapters, onToggleChapter }: TierSelectionSlideProps) {
  const { theme } = useTheme();
  const chapters = getChapterCards();

  return (
    <div
      className="r-pad slide-scroll"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        padding: '40px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: theme.subtleGrad,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{ position: 'relative', zIndex: 1, maxWidth: 960, margin: '0 auto', width: '100%' }}
      >
        <h2
          className="t-md s1"
          style={{ fontSize: '2.2rem', fontWeight: 800, color: theme.text, textAlign: 'center' }}
        >
          {data.title}
        </h2>
        <p
          className="s2"
          style={{
            fontSize: '1.05rem',
            lineHeight: 1.7,
            color: theme.textMuted,
            marginTop: 12,
            textAlign: 'center',
          }}
        >
          {data.subtitle}
        </p>

        <div
          className="s3"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 16,
            marginTop: 36,
          }}
        >
          {chapters.map((ch) => {
            const enabled = enabledChapters.has(ch.id);
            // Philosophical spans full width on its own row
            const isPhilosophical = ch.id === 'philosophical';
            return (
              <div
                key={ch.id}
                style={{
                  padding: '20px 20px',
                  borderRadius: 16,
                  background: theme.surface,
                  border: `2px solid ${enabled ? ch.color + '55' : theme.border}`,
                  opacity: enabled ? 1 : 0.5,
                  transition: 'border-color 0.2s, box-shadow 0.2s, opacity 0.2s',
                  display: 'flex',
                  flexDirection: isPhilosophical ? 'row' : 'column',
                  alignItems: isPhilosophical ? 'center' : 'stretch',
                  gap: isPhilosophical ? 16 : 8,
                  gridColumn: isPhilosophical ? '1 / -1' : undefined,
                }}
                onMouseEnter={(e) => {
                  if (enabled) {
                    e.currentTarget.style.borderColor = ch.color;
                    e.currentTarget.style.boxShadow = `0 4px 24px ${ch.color}22`;
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = enabled ? ch.color + '55' : theme.border;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Header: checkbox + label + complexity */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: isPhilosophical ? 'none' : undefined }}>
                  <button
                    onClick={(e) => { e.stopPropagation(); onToggleChapter(ch.id); }}
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 5,
                      border: `2px solid ${enabled ? ch.color : theme.border}`,
                      background: enabled ? ch.color : 'transparent',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 0.15s',
                      padding: 0,
                    }}
                    title={enabled ? `Disable ${ch.label} chapter` : `Enable ${ch.label} chapter`}
                  >
                    {enabled && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                  <span style={{ fontWeight: 700, fontSize: '1.1rem', color: theme.text }}>
                    {ch.label}
                  </span>
                  {ch.complexity > 0 && (
                    <div style={{ display: 'flex', gap: 3, marginLeft: 'auto' }}>
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div
                          key={i}
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            backgroundColor: i < ch.complexity ? ch.color : theme.border,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {!isPhilosophical && (
                  <>
                    <div style={{ fontSize: '0.78rem', fontWeight: 600, color: ch.color, letterSpacing: '0.03em' }}>
                      {ch.subtitle}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: theme.textMuted, lineHeight: 1.5 }}>
                      {ch.vision}
                    </div>
                  </>
                )}

                {isPhilosophical && (
                  <div style={{ fontSize: '0.85rem', color: theme.textMuted, lineHeight: 1.5, flex: 1 }}>
                    {ch.vision}
                  </div>
                )}

                {/* Jump button — always rendered to prevent layout shift */}
                <button
                  onClick={() => enabled && onGoTo(getChapterStartIndex(ch.id, enabledChapters))}
                  disabled={!enabled}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    alignSelf: isPhilosophical ? 'center' : 'flex-start',
                    gap: 4,
                    padding: '6px 14px',
                    borderRadius: 8,
                    background: enabled ? `${ch.color}15` : 'transparent',
                    border: `1px solid ${enabled ? ch.color + '33' : theme.border}`,
                    color: enabled ? ch.color : theme.textMuted,
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    cursor: enabled ? 'pointer' : 'default',
                    transition: 'background 0.15s, opacity 0.15s',
                    opacity: enabled ? 1 : 0.4,
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => { if (enabled) e.currentTarget.style.background = `${ch.color}25`; }}
                  onMouseLeave={(e) => { if (enabled) e.currentTarget.style.background = `${ch.color}15`; }}
                >
                  Go to chapter <ChevronRight size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
