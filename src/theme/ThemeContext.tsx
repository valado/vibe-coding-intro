import { createContext, useState, useEffect, ReactNode } from 'react';
import { ThemeContextType } from '../types';
import { getTheme } from './theme';

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'vibe-coding-theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      return stored ? JSON.parse(stored) : true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(isDark));
    } catch {
      // Silently fail if localStorage is not available
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev: boolean) => !prev);

  const value: ThemeContextType = {
    theme: getTheme(isDark),
    isDark,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
