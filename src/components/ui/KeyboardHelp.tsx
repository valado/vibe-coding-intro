import { X, Keyboard } from 'lucide-react';
import { useTheme } from '../../theme/useTheme';

interface KeyboardHelpProps {
  onClose: () => void;
}

export function KeyboardHelp({ onClose }: KeyboardHelpProps) {
  const { theme } = useTheme();

  const shortcuts = [
    { keys: ['→', '↓', 'Space', 'PgDn'], action: 'Next slide' },
    { keys: ['←', '↑', 'PgUp'], action: 'Previous slide' },
    { keys: ['Home'], action: 'First slide' },
    { keys: ['End'], action: 'Last slide' },
    { keys: ['?', '/'], action: 'Toggle keyboard help' },
    { keys: ['Esc'], action: 'Close overlay' },
  ];

  return (
    <div
      className="ov-overlay"
      onClick={onClose}
      style={{ backgroundColor: theme.overlayBg, backdropFilter: 'blur(8px)' }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '90%',
          maxWidth: 420,
          backgroundColor: theme.surface,
          borderRadius: 16,
          padding: 24,
          border: `1px solid ${theme.border}`,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Keyboard size={20} style={{ color: theme.accent }} />
            <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: theme.text }}>
              Keyboard Shortcuts
            </h3>
          </div>
          <button className="ib" onClick={onClose} style={{ color: theme.textMuted }}>
            <X size={18} />
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {shortcuts.map((shortcut, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 12px',
                backgroundColor: theme.bg,
                borderRadius: 8,
                border: `1px solid ${theme.border}`,
              }}
            >
              <span style={{ color: theme.text, fontSize: '0.9rem' }}>{shortcut.action}</span>
              <div style={{ display: 'flex', gap: 6 }}>
                {shortcut.keys.map((key, j) => (
                  <kbd
                    key={j}
                    style={{
                      padding: '4px 10px',
                      backgroundColor: theme.surface,
                      border: `1px solid ${theme.border}`,
                      borderRadius: 6,
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: theme.accent,
                      fontFamily: 'monospace',
                      minWidth: key.length === 1 ? 32 : 'auto',
                      textAlign: 'center',
                    }}
                  >
                    {key}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: 16,
            padding: 12,
            backgroundColor: theme.accentSoft,
            borderRadius: 8,
            fontSize: '0.85rem',
            color: theme.textMuted,
            lineHeight: 1.5,
          }}
        >
          💡 In slide overview mode, use arrow keys to navigate and <kbd style={{ padding: '2px 6px', backgroundColor: theme.surface, borderRadius: 4, fontWeight: 600 }}>Enter</kbd> or <kbd style={{ padding: '2px 6px', backgroundColor: theme.surface, borderRadius: 4, fontWeight: 600 }}>Space</kbd> to select
        </div>
      </div>
    </div>
  );
}
