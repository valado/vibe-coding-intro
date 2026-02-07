import { X } from 'lucide-react';
import { useTheme } from '../../theme/useTheme';
import { SLIDES } from '../../config/slides';
import { ClosingSlideData } from '../../types';

interface DiscountModalProps {
  onClose: () => void;
}

export function DiscountModal({ onClose }: DiscountModalProps) {
  const { theme } = useTheme();

  const closingData = SLIDES.find((s) => s.layout === 'closing') as ClosingSlideData;

  if (!closingData) return null;

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
          maxWidth: 650,
          backgroundColor: theme.surface,
          borderRadius: 16,
          padding: 28,
          border: `1px solid ${theme.border}`,
          position: 'relative',
        }}
      >
        <button
          className="ib"
          onClick={onClose}
          style={{
            color: theme.textMuted,
            position: 'absolute',
            top: 12,
            right: 12,
            zIndex: 10,
          }}
        >
          <X size={18} />
        </button>

        <div
          style={{
            textAlign: 'center',
            padding: '28px 36px',
            borderRadius: 16,
            border: `1px solid ${theme.accentBorder}`,
            background: theme.accentSoft,
            margin: '3em 0',
          }}
        >
          <p
            style={{
              fontSize: '0.95rem',
              color: theme.textMuted,
              lineHeight: 1.6,
            }}
          >
            {closingData.surveyLabel}
          </p>

          <div style={{ marginTop: 20 }}>
            <a
              href={closingData.surveyUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                padding: '16px 32px',
                borderRadius: 12,
                background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent}cc)`,
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '1rem',
                transition: 'all 0.2s',
                cursor: 'pointer',
                boxShadow: `0 4px 24px ${theme.accentGlow}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                e.currentTarget.style.boxShadow = `0 8px 32px ${theme.accentGlow}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = `0 4px 24px ${theme.accentGlow}`;
              }}
            >
              <span style={{ fontSize: '1.3rem' }}>🎁</span>
              <span>{closingData.surveyDetail}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
