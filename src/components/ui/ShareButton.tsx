import { Share2, Check } from 'lucide-react';
import { useTheme } from '../../theme/useTheme';

interface ShareButtonProps {
  onShare: () => void;
  copied: boolean;
}

export function ShareButton({ onShare, copied }: ShareButtonProps) {
  const { theme } = useTheme();

  return (
    <button
      className="ib"
      onClick={onShare}
      style={{ color: copied ? theme.accent : theme.textMuted }}
      title="Share this slide"
    >
      {copied ? <Check size={17} /> : <Share2 size={17} />}
    </button>
  );
}
