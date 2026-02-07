import { useTheme } from '../../theme/useTheme';

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const { theme } = useTheme();

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        backgroundColor: theme.border,
        zIndex: 20,
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${((current + 1) / total) * 100}%`,
          backgroundColor: theme.accent,
          transition: 'width 0.35s ease',
          borderRadius: '0 2px 2px 0',
        }}
      />
    </div>
  );
}
