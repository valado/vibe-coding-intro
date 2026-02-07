export interface Theme {
  bg: string;
  surface: string;
  surfaceHover: string;
  text: string;
  textMuted: string;
  border: string;
  accent: string;
  accentSoft: string;
  accentBorder: string;
  accentGlow: string;
  watermark: string;
  heroGrad: string;
  subtleGrad: string;
  overlayBg: string;
}

export interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}
