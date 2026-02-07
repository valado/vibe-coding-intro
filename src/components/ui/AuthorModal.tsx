import { X } from 'lucide-react';
import { useTheme } from '../../theme/useTheme';
import { AuthorSlide } from '../slides/AuthorSlide';
import { SLIDES } from '../../config/slides';
import { AuthorSlideData } from '../../types';

interface AuthorModalProps {
  onClose: () => void;
}

export function AuthorModal({ onClose }: AuthorModalProps) {
  const { theme } = useTheme();

  const authorData = SLIDES.find((s) => s.layout === 'author') as AuthorSlideData;

  if (!authorData) return null;

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
          maxWidth: 600,
          maxHeight: '85vh',
          overflow: 'auto',
          backgroundColor: theme.surface,
          borderRadius: 16,
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
        <AuthorSlide data={authorData} />
      </div>
    </div>
  );
}
