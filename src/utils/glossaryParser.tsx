import type { ReactNode } from 'react';
import { GlossaryTooltip } from '../components/ui/GlossaryTooltip';
import { GLOSSARY } from '../config/glossary';

interface PatternEntry {
  pattern: string;
  patternLower: string;
  term: string;
  definition: string;
}

// Build a sorted list of all patterns (longest first for greedy matching)
const allPatterns: PatternEntry[] = GLOSSARY.flatMap((entry) =>
  entry.matchPatterns.map((p) => ({
    pattern: p,
    patternLower: p.toLowerCase(),
    term: entry.term,
    definition: entry.definition,
  })),
).sort((a, b) => b.pattern.length - a.pattern.length);

const wordBoundaryBefore = (text: string, index: number): boolean => {
  if (index === 0) return true;
  const ch = text[index - 1];
  // Allow matching after hyphens, dots, and common punctuation
  return /[\s(["'\-/]/.test(ch);
};

const wordBoundaryAfter = (text: string, index: number, len: number): boolean => {
  const end = index + len;
  if (end >= text.length) return true;
  const ch = text[end];
  return /[\s).,;:!?"'\-/]/.test(ch);
};

export function parseGlossaryTerms(text: string): ReactNode {
  if (!text) return text;

  const textLower = text.toLowerCase();
  // Collect all non-overlapping matches
  const matches: { start: number; end: number; entry: PatternEntry }[] = [];
  const used = new Uint8Array(text.length);

  for (const entry of allPatterns) {
    let searchFrom = 0;
    while (searchFrom < text.length) {
      const idx = textLower.indexOf(entry.patternLower, searchFrom);
      if (idx === -1) break;

      const end = idx + entry.pattern.length;

      // Check word boundaries
      if (wordBoundaryBefore(text, idx) && wordBoundaryAfter(text, idx, entry.pattern.length)) {
        // Check no overlap with already-matched regions
        let overlap = false;
        for (let i = idx; i < end; i++) {
          if (used[i]) {
            overlap = true;
            break;
          }
        }
        if (!overlap) {
          matches.push({ start: idx, end, entry });
          for (let i = idx; i < end; i++) used[i] = 1;
        }
      }
      searchFrom = idx + 1;
    }
  }

  if (matches.length === 0) return text;

  // Sort matches by position
  matches.sort((a, b) => a.start - b.start);

  const parts: ReactNode[] = [];
  let cursor = 0;

  for (const match of matches) {
    if (match.start > cursor) {
      parts.push(text.slice(cursor, match.start));
    }
    const originalText = text.slice(match.start, match.end);
    parts.push(
      <GlossaryTooltip key={match.start} term={match.entry.term} definition={match.entry.definition}>
        {originalText}
      </GlossaryTooltip>,
    );
    cursor = match.end;
  }

  if (cursor < text.length) {
    parts.push(text.slice(cursor));
  }

  return <>{parts}</>;
}
