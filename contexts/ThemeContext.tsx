"use client"
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export type ThemeId = 'dark-plus' | 'light-plus' | 'github-dark' | 'monokai-pro' | 'tokyo-night' | 'dracula' | 'solarized-dark';

export interface Theme {
  id: ThemeId;
  name: string;
  type: 'dark' | 'light';
  colors: {
    accent: string;
    background: string;
    foreground: string;
  };
}

// Theme CSS variables for each theme
const themeVariables: Record<ThemeId, Record<string, string>> = {
  'dark-plus': {
    '--background': '0 0% 11.8%',
    '--foreground': '0 0% 80%',
    '--card': '0 0% 11.8%',
    '--card-foreground': '0 0% 80%',
    '--popover': '0 0% 14.5%',
    '--popover-foreground': '0 0% 80%',
    '--primary': '207 100% 40%',
    '--primary-foreground': '0 0% 100%',
    '--secondary': '0 0% 17.6%',
    '--secondary-foreground': '0 0% 80%',
    '--muted': '0 0% 14.5%',
    '--muted-foreground': '0 0% 53%',
    '--accent': '207 100% 40%',
    '--accent-foreground': '0 0% 100%',
    '--destructive': '0 60% 50%',
    '--destructive-foreground': '0 0% 100%',
    '--border': '0 0% 24%',
    '--input': '0 0% 24%',
    '--ring': '207 100% 40%',
    '--syntax-keyword': '290 80% 75%',
    '--syntax-string': '100 80% 70%',
    '--syntax-number': '30 90% 70%',
    '--syntax-function': '45 90% 70%',
    '--syntax-comment': '120 15% 55%',
    '--syntax-operator': '0 0% 80%',
    '--syntax-property': '200 80% 70%',
    '--syntax-variable': '187 80% 78%',
    '--editor-bg': '0 0% 11.8%',
    '--sidebar-bg': '0 0% 14.5%',
    '--tab-active': '0 0% 11.8%',
    '--tab-inactive': '0 0% 17.6%',
    '--line-number': '0 0% 35%',
    '--terminal-bg': '0 0% 9%',
    '--terminal-text': '120 100% 60%',
  },
  'light-plus': {
    '--background': '0 0% 100%',
    '--foreground': '0 0% 10%',
    '--card': '0 0% 98%',
    '--card-foreground': '0 0% 10%',
    '--popover': '0 0% 100%',
    '--popover-foreground': '0 0% 10%',
    '--primary': '207 100% 40%',
    '--primary-foreground': '0 0% 100%',
    '--secondary': '0 0% 96%',
    '--secondary-foreground': '0 0% 10%',
    '--muted': '0 0% 94%',
    '--muted-foreground': '0 0% 45%',
    '--accent': '207 100% 40%',
    '--accent-foreground': '0 0% 100%',
    '--destructive': '0 80% 50%',
    '--destructive-foreground': '0 0% 100%',
    '--border': '0 0% 85%',
    '--input': '0 0% 85%',
    '--ring': '207 100% 40%',
    '--syntax-keyword': '290 70% 45%',
    '--syntax-string': '100 60% 35%',
    '--syntax-number': '30 90% 45%',
    '--syntax-function': '45 80% 35%',
    '--syntax-comment': '120 15% 45%',
    '--syntax-operator': '0 0% 30%',
    '--syntax-property': '200 70% 40%',
    '--syntax-variable': '187 70% 40%',
    '--editor-bg': '0 0% 100%',
    '--sidebar-bg': '0 0% 96%',
    '--tab-active': '0 0% 100%',
    '--tab-inactive': '0 0% 94%',
    '--line-number': '0 0% 60%',
    '--terminal-bg': '0 0% 15%',
    '--terminal-text': '120 100% 40%',
  },
  'github-dark': {
    '--background': '215 21% 11%',
    '--foreground': '210 17% 82%',
    '--card': '215 19% 13%',
    '--card-foreground': '210 17% 82%',
    '--popover': '215 19% 15%',
    '--popover-foreground': '210 17% 82%',
    '--primary': '212 92% 45%',
    '--primary-foreground': '0 0% 100%',
    '--secondary': '215 17% 18%',
    '--secondary-foreground': '210 17% 82%',
    '--muted': '215 17% 16%',
    '--muted-foreground': '215 10% 50%',
    '--accent': '212 92% 45%',
    '--accent-foreground': '0 0% 100%',
    '--destructive': '0 72% 51%',
    '--destructive-foreground': '0 0% 100%',
    '--border': '215 14% 20%',
    '--input': '215 14% 20%',
    '--ring': '212 92% 45%',
    '--syntax-keyword': '340 82% 72%',
    '--syntax-string': '162 73% 54%',
    '--syntax-number': '212 92% 65%',
    '--syntax-function': '285 60% 72%',
    '--syntax-comment': '215 10% 45%',
    '--syntax-operator': '210 17% 82%',
    '--syntax-property': '212 92% 65%',
    '--syntax-variable': '29 54% 61%',
    '--editor-bg': '215 21% 11%',
    '--sidebar-bg': '215 19% 13%',
    '--tab-active': '215 21% 11%',
    '--tab-inactive': '215 17% 16%',
    '--line-number': '215 10% 40%',
    '--terminal-bg': '215 21% 8%',
    '--terminal-text': '162 73% 54%',
  },
  'monokai-pro': {
    '--background': '70 8% 15%',
    '--foreground': '60 30% 88%',
    '--card': '70 8% 17%',
    '--card-foreground': '60 30% 88%',
    '--popover': '70 8% 19%',
    '--popover-foreground': '60 30% 88%',
    '--primary': '50 100% 60%',
    '--primary-foreground': '0 0% 10%',
    '--secondary': '70 8% 20%',
    '--secondary-foreground': '60 30% 88%',
    '--muted': '70 8% 18%',
    '--muted-foreground': '60 10% 55%',
    '--accent': '50 100% 60%',
    '--accent-foreground': '0 0% 10%',
    '--destructive': '0 72% 55%',
    '--destructive-foreground': '0 0% 100%',
    '--border': '70 6% 25%',
    '--input': '70 6% 25%',
    '--ring': '50 100% 60%',
    '--syntax-keyword': '340 82% 65%',
    '--syntax-string': '80 75% 55%',
    '--syntax-number': '265 85% 75%',
    '--syntax-function': '190 80% 55%',
    '--syntax-comment': '55 10% 45%',
    '--syntax-operator': '340 82% 65%',
    '--syntax-property': '50 100% 60%',
    '--syntax-variable': '60 30% 88%',
    '--editor-bg': '70 8% 15%',
    '--sidebar-bg': '70 8% 12%',
    '--tab-active': '70 8% 15%',
    '--tab-inactive': '70 8% 18%',
    '--line-number': '60 5% 40%',
    '--terminal-bg': '70 8% 10%',
    '--terminal-text': '80 75% 55%',
  },
  'tokyo-night': {
    '--background': '235 23% 15%',
    '--foreground': '225 27% 78%',
    '--card': '235 21% 17%',
    '--card-foreground': '225 27% 78%',
    '--popover': '235 21% 19%',
    '--popover-foreground': '225 27% 78%',
    '--primary': '267 83% 70%',
    '--primary-foreground': '0 0% 100%',
    '--secondary': '235 21% 20%',
    '--secondary-foreground': '225 27% 78%',
    '--muted': '235 21% 18%',
    '--muted-foreground': '225 15% 50%',
    '--accent': '192 95% 60%',
    '--accent-foreground': '0 0% 10%',
    '--destructive': '355 78% 56%',
    '--destructive-foreground': '0 0% 100%',
    '--border': '235 18% 25%',
    '--input': '235 18% 25%',
    '--ring': '267 83% 70%',
    '--syntax-keyword': '267 83% 70%',
    '--syntax-string': '152 76% 55%',
    '--syntax-number': '28 100% 68%',
    '--syntax-function': '192 95% 60%',
    '--syntax-comment': '225 15% 45%',
    '--syntax-operator': '267 83% 70%',
    '--syntax-property': '215 82% 65%',
    '--syntax-variable': '225 27% 78%',
    '--editor-bg': '235 23% 15%',
    '--sidebar-bg': '235 23% 12%',
    '--tab-active': '235 23% 15%',
    '--tab-inactive': '235 21% 18%',
    '--line-number': '225 15% 40%',
    '--terminal-bg': '235 23% 10%',
    '--terminal-text': '192 95% 60%',
  },
  'dracula': {
    '--background': '231 15% 18%',
    '--foreground': '60 30% 96%',
    '--card': '231 15% 20%',
    '--card-foreground': '60 30% 96%',
    '--popover': '231 15% 22%',
    '--popover-foreground': '60 30% 96%',
    '--primary': '265 89% 78%',
    '--primary-foreground': '0 0% 10%',
    '--secondary': '231 15% 23%',
    '--secondary-foreground': '60 30% 96%',
    '--muted': '231 15% 21%',
    '--muted-foreground': '225 15% 55%',
    '--accent': '135 94% 65%',
    '--accent-foreground': '0 0% 10%',
    '--destructive': '0 100% 67%',
    '--destructive-foreground': '0 0% 100%',
    '--border': '231 12% 28%',
    '--input': '231 12% 28%',
    '--ring': '265 89% 78%',
    '--syntax-keyword': '326 100% 74%',
    '--syntax-string': '65 92% 76%',
    '--syntax-number': '265 89% 78%',
    '--syntax-function': '135 94% 65%',
    '--syntax-comment': '225 15% 50%',
    '--syntax-operator': '326 100% 74%',
    '--syntax-property': '191 97% 77%',
    '--syntax-variable': '60 30% 96%',
    '--editor-bg': '231 15% 18%',
    '--sidebar-bg': '231 15% 15%',
    '--tab-active': '231 15% 18%',
    '--tab-inactive': '231 15% 21%',
    '--line-number': '225 15% 40%',
    '--terminal-bg': '231 15% 12%',
    '--terminal-text': '135 94% 65%',
  },
  'solarized-dark': {
    '--background': '192 100% 6%',
    '--foreground': '186 8% 55%',
    '--card': '192 81% 9%',
    '--card-foreground': '186 8% 55%',
    '--popover': '192 81% 11%',
    '--popover-foreground': '186 8% 55%',
    '--primary': '175 59% 40%',
    '--primary-foreground': '0 0% 100%',
    '--secondary': '192 81% 12%',
    '--secondary-foreground': '186 8% 55%',
    '--muted': '192 81% 10%',
    '--muted-foreground': '186 6% 45%',
    '--accent': '175 59% 40%',
    '--accent-foreground': '0 0% 100%',
    '--destructive': '1 71% 52%',
    '--destructive-foreground': '0 0% 100%',
    '--border': '192 50% 15%',
    '--input': '192 50% 15%',
    '--ring': '175 59% 40%',
    '--syntax-keyword': '18 80% 44%',
    '--syntax-string': '175 59% 40%',
    '--syntax-number': '265 60% 60%',
    '--syntax-function': '68 100% 30%',
    '--syntax-comment': '186 6% 40%',
    '--syntax-operator': '186 8% 55%',
    '--syntax-property': '205 69% 49%',
    '--syntax-variable': '45 100% 35%',
    '--editor-bg': '192 100% 6%',
    '--sidebar-bg': '192 100% 5%',
    '--tab-active': '192 100% 6%',
    '--tab-inactive': '192 81% 9%',
    '--line-number': '186 6% 35%',
    '--terminal-bg': '192 100% 4%',
    '--terminal-text': '175 59% 40%',
  },
};

export const themes: Theme[] = [
  {
    id: 'dark-plus',
    name: 'Dark+ (Default)',
    type: 'dark',
    colors: {
      accent: 'hsl(207, 100%, 40%)',
      background: 'hsl(0, 0%, 12%)',
      foreground: 'hsl(0, 0%, 80%)',
    },
  },
  {
    id: 'light-plus',
    name: 'Light+',
    type: 'light',
    colors: {
      accent: 'hsl(207, 100%, 40%)',
      background: 'hsl(0, 0%, 100%)',
      foreground: 'hsl(0, 0%, 10%)',
    },
  },
  {
    id: 'github-dark',
    name: 'GitHub Dark',
    type: 'dark',
    colors: {
      accent: 'hsl(212, 92%, 45%)',
      background: 'hsl(215, 21%, 11%)',
      foreground: 'hsl(210, 17%, 82%)',
    },
  },
  {
    id: 'monokai-pro',
    name: 'Monokai Pro',
    type: 'dark',
    colors: {
      accent: 'hsl(50, 100%, 60%)',
      background: 'hsl(70, 8%, 15%)',
      foreground: 'hsl(60, 30%, 88%)',
    },
  },
  {
    id: 'tokyo-night',
    name: 'Tokyo Night',
    type: 'dark',
    colors: {
      accent: 'hsl(267, 83%, 70%)',
      background: 'hsl(235, 23%, 15%)',
      foreground: 'hsl(225, 27%, 78%)',
    },
  },
  {
    id: 'dracula',
    name: 'Dracula',
    type: 'dark',
    colors: {
      accent: 'hsl(265, 89%, 78%)',
      background: 'hsl(231, 15%, 18%)',
      foreground: 'hsl(60, 30%, 96%)',
    },
  },
  {
    id: 'solarized-dark',
    name: 'Solarized Dark',
    type: 'dark',
    colors: {
      accent: 'hsl(175, 59%, 40%)',
      background: 'hsl(192, 100%, 6%)',
      foreground: 'hsl(186, 8%, 55%)',
    },
  },
];

interface ThemeContextType {
  currentTheme: ThemeId;
  setTheme: (theme: ThemeId) => void;
  themes: Theme[];
  isThemeSelectorOpen: boolean;
  openThemeSelector: () => void;
  closeThemeSelector: () => void;
  toggleThemeSelector: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'portfolio-theme';

// Get initial theme before React mounts to prevent flash
const getInitialTheme = (): ThemeId => {
  if (typeof window === 'undefined') return 'dark-plus';
  
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored && themes.find(t => t.id === stored)) {
      return stored as ThemeId;
    }
  } catch (e) {
    // localStorage might be unavailable
  }
  
  return 'dark-plus';
};

// Apply theme by setting CSS variables directly on :root
const applyThemeToDocument = (themeId: ThemeId) => {
  const root = document.documentElement;
  const variables = themeVariables[themeId];
  
  if (variables) {
    Object.entries(variables).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
  }
  
  // Update data attribute for potential CSS selectors
  root.setAttribute('data-theme', themeId);
  
  // Add class for potential additional styling
  themes.forEach(t => root.classList.remove(`theme-${t.id}`));
  root.classList.add(`theme-${themeId}`);
};

// Initialize theme immediately to prevent flash
if (typeof window !== 'undefined') {
  const initialTheme = getInitialTheme();
  applyThemeToDocument(initialTheme);
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeId>(getInitialTheme);
  const [isThemeSelectorOpen, setIsThemeSelectorOpen] = useState(false);

  const setTheme = useCallback((themeId: ThemeId) => {
    setCurrentTheme(themeId);
    applyThemeToDocument(themeId);
    
    try {
      localStorage.setItem(THEME_STORAGE_KEY, themeId);
    } catch (e) {
      // localStorage might be unavailable
    }
  }, []);

  const openThemeSelector = useCallback(() => setIsThemeSelectorOpen(true), []);
  const closeThemeSelector = useCallback(() => setIsThemeSelectorOpen(false), []);
  const toggleThemeSelector = useCallback(() => setIsThemeSelectorOpen(prev => !prev), []);

  // Keyboard shortcut: Ctrl/Cmd + Shift + T
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 't') {
        e.preventDefault();
        toggleThemeSelector();
      }
      
      // Escape to close
      if (e.key === 'Escape' && isThemeSelectorOpen) {
        closeThemeSelector();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isThemeSelectorOpen, toggleThemeSelector, closeThemeSelector]);

  // Ensure theme is applied on mount
  useEffect(() => {
    applyThemeToDocument(currentTheme);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setTheme,
        themes,
        isThemeSelectorOpen,
        openThemeSelector,
        closeThemeSelector,
        toggleThemeSelector,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
