import { useTheme } from '../contexts/ThemeContext';

export const DARK_GREEN = '#166534';
export const NEON_GREEN = '#00FF41';

export function useAccentGreen(): string {
  const { colorScheme } = useTheme();
  return colorScheme === 'clear' ? DARK_GREEN : NEON_GREEN;
}

export function useGreenAlpha(opacity: number): string {
  const { colorScheme } = useTheme();
  if (colorScheme === 'clear') {
    return `rgba(22,101,52,${opacity})`;
  }
  const r = 0, g = 255, b = 65;
  return `rgba(${r},${g},${b},${opacity})`;
}
