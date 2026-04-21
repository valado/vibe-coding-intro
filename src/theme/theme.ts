import { Theme } from '../types';

export const darkTheme: Theme = {
  bg: '#0D0A08',
  surface: '#1A1510',
  surfaceHover: '#242019',
  text: '#EEEBE8',
  textMuted: '#8C847A',
  border: '#332D25',
  accent: '#F97316',
  accentSoft: 'rgba(249,115,22,0.12)',
  accentBorder: 'rgba(249,115,22,0.25)',
  accentGlow: 'rgba(249,115,22,0.3)',
  watermark: 'rgba(249,115,22,0.18)',
  heroGrad: 'radial-gradient(ellipse at 55% 40%, rgba(249,115,22,0.18) 0%, transparent 60%)',
  subtleGrad: 'radial-gradient(ellipse at 80% 20%, rgba(249,115,22,0.06) 0%, transparent 50%)',
  overlayBg: 'rgba(0,0,0,0.85)',
};

export const lightTheme: Theme = {
  bg: '#FCFAF8',
  surface: '#FFFFFF',
  surfaceHover: '#FFF5EE',
  text: '#1A1410',
  textMuted: '#75685F',
  border: '#E4DCD4',
  accent: '#EA580C',
  accentSoft: 'rgba(234,88,12,0.07)',
  accentBorder: 'rgba(234,88,12,0.18)',
  accentGlow: 'rgba(234,88,12,0.2)',
  watermark: 'rgba(234,88,12,0.04)',
  heroGrad: 'radial-gradient(ellipse at 55% 40%, rgba(234,88,12,0.1) 0%, transparent 60%)',
  subtleGrad: 'radial-gradient(ellipse at 80% 20%, rgba(234,88,12,0.04) 0%, transparent 50%)',
  overlayBg: 'rgba(255,255,255,0.92)',
};

export const getTheme = (isDark: boolean): Theme => (isDark ? darkTheme : lightTheme);
