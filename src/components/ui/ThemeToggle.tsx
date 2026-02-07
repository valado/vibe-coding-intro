import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../theme/useTheme';

export function ThemeToggle() {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <button
      className="ib"
      onClick={toggleTheme}
      style={{ color: theme.textMuted }}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}
