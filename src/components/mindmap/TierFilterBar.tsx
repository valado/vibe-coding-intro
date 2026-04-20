import type { MindMapTier } from '../../types/mindmap.types';
import { useTheme } from '../../theme/useTheme';

interface TierFilterBarProps {
  tiers: MindMapTier[];
  activeTiers: Set<string>;
  onToggleTier: (id: string) => void;
}

export function TierFilterBar({ tiers, activeTiers, onToggleTier }: TierFilterBarProps) {
  const { theme } = useTheme();

  return (
    <div
      style={{
        position: 'absolute',
        top: 92,
        left: 16,
        display: 'flex',
        gap: 8,
        zIndex: 14,
        flexWrap: 'wrap',
        maxWidth: 'calc(100% - 32px)',
      }}
    >
      {tiers.map((t) => {
        const active = activeTiers.has(t.id);
        return (
          <button
            type="button"
            key={t.id}
            aria-pressed={active}
            onClick={() => onToggleTier(t.id)}
            title={active ? 'Hide this stage' : 'Show this stage'}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 11px',
              borderRadius: 8,
              border: `1px solid ${active ? t.color : theme.border}`,
              background: active ? t.color : theme.surface,
              color: active ? '#ffffff' : theme.text,
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 700,
              boxShadow: active
                ? `0 8px 20px ${t.color}33`
                : '0 2px 8px rgba(15,23,42,0.07)',
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 20,
                height: 20,
                borderRadius: 6,
                background: active ? 'rgba(255,255,255,0.20)' : `${t.color}16`,
                color: active ? '#ffffff' : t.color,
                fontWeight: 800,
              }}
            >
              {t.complexity}
            </span>
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
