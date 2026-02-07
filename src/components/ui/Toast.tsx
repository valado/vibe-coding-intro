import { useTheme } from '../../theme/useTheme';

interface ToastProps {
  message: string;
}

export function Toast({ message }: ToastProps) {
  const { theme } = useTheme();

  return (
    <div
      className="toast"
      style={{
        backgroundColor: theme.surface,
        color: theme.text,
        border: `1px solid ${theme.accentBorder}`,
        boxShadow: `0 4px 20px ${theme.accentGlow}`,
      }}
    >
      {message}
    </div>
  );
}
