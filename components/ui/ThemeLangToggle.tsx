'use client';

import { useTheme } from '@/context/ThemeContext';
import { useLang } from '@/context/LangContext';
import { Moon, Sun, Globe } from 'lucide-react';

export function ThemeLangToggle() {
  const { isDark, toggleTheme } = useTheme();
  const { lang, setLang } = useLang();

  return (
    <div className="flex items-center gap-2">
      {/* Language toggle */}
      <button
        onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
        className="flex items-center gap-1.5 h-9 px-3 rounded-xl text-sm font-medium border border-input bg-background hover:bg-accent transition-colors"
        title={lang === 'en' ? 'Cambiar a español' : 'Switch to English'}
      >
        <Globe className="h-4 w-4" />
        <span className="text-xs">{lang === 'en' ? 'ES' : 'EN'}</span>
      </button>

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className="flex items-center justify-center h-9 w-9 rounded-xl border border-input bg-background hover:bg-accent transition-colors"
        title={isDark ? 'Switch to light mode' : 'Cambiar a modo oscuro'}
      >
        {isDark ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
