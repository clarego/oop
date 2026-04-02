import { createContext, useContext, useState, useEffect } from 'react';

export type ColorScheme = 'dark' | 'clear' | 'hacker';
export type FontSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ThemeContextType {
  colorScheme: ColorScheme;
  fontSize: FontSize;
  setColorScheme: (s: ColorScheme) => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  colorScheme: 'dark',
  fontSize: 'md',
  setColorScheme: () => {},
  increaseFontSize: () => {},
  decreaseFontSize: () => {},
});

const FONT_SIZES: FontSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
const FONT_SIZE_PX: Record<FontSize, string> = { xs: '11px', sm: '13px', md: '15px', lg: '20px', xl: '27px' };

function buildThemeCSS(scheme: ColorScheme): string {
  if (scheme === 'dark') return '';

  const sel = (cls: string) => `[data-theme="${scheme}"] .${cls.replace(/\[/g, '\\[').replace(/\]/g, '\\]').replace(/#/g, '\\#').replace(/\//g, '\\/')}`;

  const bg = (cls: string, val: string) => `${sel(cls)}{background-color:${val}!important}`;
  const bdr = (cls: string, val: string) => `${sel(cls)}{border-color:${val}!important}`;
  const txt = (cls: string, val: string) => `${sel(cls)}{color:${val}!important}`;
  const hover = (cls: string, val: string, prop: string) => `${sel(cls)}:hover{${prop}:${val}!important}`;

  if (scheme === 'clear') {
    return [
      `[data-theme="clear"] body{background-color:#f3f4f6;color:#111111}`,
      `[data-theme="clear"] body::before{filter:invert(1);mix-blend-mode:multiply;opacity:0.04}`,
      bg('bg-[#0a0a0a]', '#f3f4f6'), bg('bg-[#0d0d0d]', '#e8e9eb'), bg('bg-[#0d1117]', '#f6f8fa'),
      bg('bg-[#111]', '#ffffff'), bg('bg-[#111111]', '#ffffff'),
      bg('bg-[#161616]', '#f0f1f3'), bg('bg-[#1a1a1a]', '#eaebee'),
      bg('bg-[#2a2a2a]', '#d8d9dc'), bg('bg-[#2d2d2d]', '#d0d1d4'),
      bg('bg-[#1E1E1E]', '#f5f5f5'), bg('bg-[#252526]', '#e8e8e8'),
      `[data-theme="clear"] .bg-\\[\\#0a0a0a\\]\\/95{background-color:rgba(243,244,246,0.95)!important}`,
      `[data-theme="clear"] .bg-black\\/60{background-color:rgba(200,200,210,0.6)!important}`,
      `[data-theme="clear"] .bg-black\\/50{background-color:rgba(180,180,190,0.5)!important}`,
      bdr('border-[#1a1a1a]', '#d8d9dc'), bdr('border-[#222]', '#ccced2'), bdr('border-[#222222]', '#ccced2'),
      bdr('border-[#2a2a2a]', '#c4c5c8'), bdr('border-[#333]', '#b8babe'), bdr('border-[#333333]', '#b8babe'),
      txt('text-[#E0E0E0]', '#111111'), txt('text-[#b0b0b0]', '#505560'),
      txt('text-[#888]', '#6b6e75'), txt('text-[#888888]', '#6b6e75'),
      txt('text-[#666]', '#888'), txt('text-[#636363]', '#999'), txt('text-[#858585]', '#777'),
      txt('text-[#D4D4D4]', '#333333'),
      hover('hover:bg-[#1a1a1a]', '#eaebee', 'background-color'),
      hover('hover:text-[#E0E0E0]', '#111111', 'color'),
      hover('hover:text-[#b0b0b0]', '#505560', 'color'),
      hover('hover:text-[#D4D4D4]', '#333333', 'color'),
      hover('hover:border-[#333]', '#aab0b8', 'border-color'),
      `[data-theme="clear"] [class*="text-[#FFB800"]{color:#92400e!important}`,
      `[data-theme="clear"] [class*="border-[#FFB800"]{border-color:#92400e!important}`,
      `[data-theme="clear"] [class*="bg-[#FFB800"]{background-color:rgba(146,64,14,0.1)!important}`,
      `[data-theme="clear"] [class*="text-[#00FF41"]{color:#166534!important}`,
      `[data-theme="clear"] [class*="border-[#00FF41"]{border-color:#166534!important}`,
      `[data-theme="clear"] .bg-\\[\\#00FF41\\]{background-color:#166534!important}`,
      `[data-theme="clear"] .bg-\\[\\#00FF41\\]\\/5{background-color:rgba(22,101,52,0.08)!important}`,
      `[data-theme="clear"] .bg-\\[\\#00FF41\\]\\/10{background-color:rgba(22,101,52,0.1)!important}`,
      `[data-theme="clear"] .bg-\\[\\#00FF41\\]\\/15{background-color:rgba(22,101,52,0.12)!important}`,
      `[data-theme="clear"] .bg-\\[\\#00FF41\\]\\/20{background-color:rgba(22,101,52,0.15)!important}`,
      `[data-theme="clear"] .bg-\\[\\#00FF41\\]\\/30{background-color:rgba(22,101,52,0.2)!important}`,
      `[data-theme="clear"] .bg-\\[\\#00FF41\\]\\/40{background-color:rgba(22,101,52,0.25)!important}`,
      `[data-theme="clear"] .from-\\[\\#00FF41\\]\\/10{--tw-gradient-from:rgba(22,101,52,0.1)!important}`,
      `[data-theme="clear"] .hover\\:bg-\\[\\#00cc33\\]:hover{background-color:#145a2c!important}`,
      `[data-theme="clear"] .card{background-color:#fff;border-color:#d8d9dc}`,
      `[data-theme="clear"] .card:hover{background-color:#f5f6f8;border-color:#b8babe}`,
      `[data-theme="clear"] .module-card{background-color:#fff;border-color:#d8d9dc}`,
      `[data-theme="clear"] .module-card:hover{background-color:#f5f6f8;border-color:#b8babe;box-shadow:0 8px 30px rgba(0,0,0,0.1)}`,
      `[data-theme="clear"] .xp-bar{background:linear-gradient(90deg,#0066cc,#00aadd);box-shadow:0 0 10px rgba(0,102,204,0.3)}`,
    ].join('\n');
  }

  if (scheme === 'hacker') {
    return [
      `[data-theme="hacker"] body{background-color:#000000;color:#00FF41}`,
      `[data-theme="hacker"] body::before{mix-blend-mode:screen;opacity:0.07}`,
      bg('bg-[#0a0a0a]', '#000000'), bg('bg-[#0d0d0d]', '#000000'), bg('bg-[#0d1117]', '#000800'),
      bg('bg-[#111]', '#020502'), bg('bg-[#111111]', '#020502'),
      bg('bg-[#161616]', '#030d03'), bg('bg-[#1a1a1a]', '#001200'),
      bg('bg-[#2a2a2a]', '#001a00'), bg('bg-[#2d2d2d]', '#001c00'),
      bg('bg-[#1E1E1E]', '#001000'), bg('bg-[#252526]', '#001400'),
      `[data-theme="hacker"] .bg-\\[\\#0a0a0a\\]\\/95{background-color:rgba(0,4,0,0.95)!important}`,
      `[data-theme="hacker"] .bg-black\\/60{background-color:rgba(0,10,0,0.6)!important}`,
      `[data-theme="hacker"] .bg-black\\/50{background-color:rgba(0,8,0,0.5)!important}`,
      bdr('border-[#1a1a1a]', '#003300'), bdr('border-[#222]', '#002800'), bdr('border-[#222222]', '#002800'),
      bdr('border-[#2a2a2a]', '#003a00'), bdr('border-[#333]', '#004400'), bdr('border-[#333333]', '#004400'),
      txt('text-[#E0E0E0]', '#00FF41'), txt('text-[#b0b0b0]', '#00cc33'),
      txt('text-[#888]', '#007722'), txt('text-[#888888]', '#007722'),
      txt('text-[#666]', '#005a1a'), txt('text-[#636363]', '#005a1a'), txt('text-[#858585]', '#007722'),
      txt('text-[#D4D4D4]', '#00FF41'),
      hover('hover:bg-[#1a1a1a]', '#001800', 'background-color'),
      hover('hover:text-[#E0E0E0]', '#33ff66', 'color'),
      hover('hover:text-[#b0b0b0]', '#00cc33', 'color'),
      hover('hover:text-[#D4D4D4]', '#33ff66', 'color'),
      hover('hover:border-[#333]', '#005500', 'border-color'),
      `[data-theme="hacker"] .card{background-color:#020502;border-color:#003300}`,
      `[data-theme="hacker"] .card:hover{background-color:#031003;border-color:#004400}`,
      `[data-theme="hacker"] .module-card{background-color:#020502;border-color:#003300}`,
      `[data-theme="hacker"] .module-card:hover{background-color:#031003;border-color:#005500;box-shadow:0 8px 30px rgba(0,255,65,0.08)}`,
      `[data-theme="hacker"] *{scrollbar-color:#003300 #000000}`,
      `[data-theme="hacker"] *::-webkit-scrollbar-track{background:#000000}`,
      `[data-theme="hacker"] *::-webkit-scrollbar-thumb{background:#003300}`,
    ].join('\n');
  }

  return '';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [colorScheme, setColorSchemeState] = useState<ColorScheme>(() => {
    return (localStorage.getItem('oop-color-scheme') as ColorScheme) || 'dark';
  });
  const [fontSize, setFontSizeState] = useState<FontSize>(() => {
    return (localStorage.getItem('oop-font-size') as FontSize) || 'md';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', colorScheme);
    localStorage.setItem('oop-color-scheme', colorScheme);

    let el = document.getElementById('oop-theme-overrides');
    if (!el) {
      el = document.createElement('style');
      el.id = 'oop-theme-overrides';
      document.head.appendChild(el);
    }
    el.textContent = buildThemeCSS(colorScheme);
  }, [colorScheme]);

  useEffect(() => {
    document.documentElement.style.fontSize = FONT_SIZE_PX[fontSize];
    localStorage.setItem('oop-font-size', fontSize);
  }, [fontSize]);

  function setColorScheme(s: ColorScheme) {
    setColorSchemeState(s);
  }

  function increaseFontSize() {
    setFontSizeState(cur => {
      const idx = FONT_SIZES.indexOf(cur);
      return idx < FONT_SIZES.length - 1 ? FONT_SIZES[idx + 1] : cur;
    });
  }

  function decreaseFontSize() {
    setFontSizeState(cur => {
      const idx = FONT_SIZES.indexOf(cur);
      return idx > 0 ? FONT_SIZES[idx - 1] : cur;
    });
  }

  return (
    <ThemeContext.Provider value={{ colorScheme, fontSize, setColorScheme, increaseFontSize, decreaseFontSize }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
