import { SlideData, TierId, ChapterTitleSlideData } from '../types';
import { SLIDES, TIER_SLIDES, CLOSING_SLIDE } from './slides';
import { MIND_MAP } from './mindmap';

export const TIER_ORDER: TierId[] = ['solo', 'team', 'scaling', 'enterprise', 'philosophical'];

const TIER_ID_MAP: Record<string, TierId> = {
  'tier-solo': 'solo',
  'tier-team': 'team',
  'tier-scaling': 'scaling',
  'tier-enterprise': 'enterprise',
};

const PHILOSOPHICAL_CHAPTER: ChapterTitleSlideData = {
  layout: 'chapter-title',
  title: 'Philosophical',
  subtitle: 'The bigger picture',
  color: '#B45309',
  complexity: 0,
  vision: 'Code has a new audience. What does that mean for how we write, structure, and think about software?',
  tierId: 'philosophical',
};

function buildChapterTitle(tierId: TierId): ChapterTitleSlideData {
  if (tierId === 'philosophical') return PHILOSOPHICAL_CHAPTER;
  const tier = MIND_MAP.children.find((t) => TIER_ID_MAP[t.id] === tierId)!;
  return {
    layout: 'chapter-title',
    title: tier.label,
    subtitle: tier.subtitle,
    color: tier.color,
    complexity: tier.complexity,
    vision: tier.note,
    tierId,
  };
}

/** Returns the linear slide deck, only including enabled chapters. */
export function assembleSlides(enabledChapters: Set<TierId>): SlideData[] {
  const chapters: SlideData[] = [];

  for (const tierId of TIER_ORDER) {
    if (enabledChapters.has(tierId)) {
      chapters.push(buildChapterTitle(tierId));
      chapters.push(...TIER_SLIDES[tierId]);
    }
  }

  return [...SLIDES, ...chapters, CLOSING_SLIDE];
}

/** Returns the slide index of the first slide in a given chapter. */
export function getChapterStartIndex(tierId: TierId, enabledChapters: Set<TierId>): number {
  const allSlides = assembleSlides(enabledChapters);
  return allSlides.findIndex(
    (s) => s.layout === 'chapter-title' && (s as ChapterTitleSlideData).tierId === tierId
  );
}

/** Returns the tierId of the next enabled chapter after the given one, or null. */
export function getNextChapterId(currentTierId: TierId, enabledChapters: Set<TierId>): TierId | null {
  const enabledOrder = TIER_ORDER.filter((t) => enabledChapters.has(t));
  const idx = enabledOrder.indexOf(currentTierId);
  return idx >= 0 && idx < enabledOrder.length - 1 ? enabledOrder[idx + 1] : null;
}
