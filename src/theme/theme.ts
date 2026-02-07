import { Theme } from '../types';

export const darkTheme: Theme = {
  bg: '#09090F',
  surface: '#13131F',
  surfaceHover: '#1C1C2E',
  text: '#EDEDF5',
  textMuted: '#7E7E9A',
  border: '#2A2A40',
  accent: '#8B5CF6',
  accentSoft: 'rgba(139,92,246,0.12)',
  accentBorder: 'rgba(139,92,246,0.25)',
  accentGlow: 'rgba(139,92,246,0.3)',
  watermark: 'rgba(139,92,246,0.18  )',
  heroGrad: 'radial-gradient(ellipse at 55% 40%, rgba(139,92,246,0.18) 0%, transparent 60%)',
  subtleGrad: 'radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.06) 0%, transparent 50%)',
  overlayBg: 'rgba(0,0,0,0.85)',
};

export const lightTheme: Theme = {
  bg: '#FAFAFF',
  surface: '#FFFFFF',
  surfaceHover: '#F3F0FF',
  text: '#141425',
  textMuted: '#6B6B88',
  border: '#E2E0EE',
  accent: '#7C3AED',
  accentSoft: 'rgba(124,58,237,0.07)',
  accentBorder: 'rgba(124,58,237,0.18)',
  accentGlow: 'rgba(124,58,237,0.2)',
  watermark: 'rgba(124,58,237,0.04)',
  heroGrad: 'radial-gradient(ellipse at 55% 40%, rgba(124,58,237,0.1) 0%, transparent 60%)',
  subtleGrad: 'radial-gradient(ellipse at 80% 20%, rgba(124,58,237,0.04) 0%, transparent 50%)',
  overlayBg: 'rgba(255,255,255,0.92)',
};

export const getTheme = (isDark: boolean): Theme => (isDark ? darkTheme : lightTheme);
