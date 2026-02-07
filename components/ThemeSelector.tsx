"use client"
import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check, X } from 'lucide-react';
import { useTheme, Theme, ThemeId } from '@/contexts/ThemeContext';

const ThemePreviewSwatch = ({ theme }: { theme: Theme }) => (
  <div className="flex items-center gap-1.5">
    <div
      className="w-3 h-3 rounded-sm border border-white/20"
      style={{ background: theme.colors.background }}
    />
    <div
      className="w-3 h-3 rounded-sm border border-white/20"
      style={{ background: theme.colors.accent }}
    />
  </div>
);

const ThemeOption = ({
  theme,
  isActive,
  onSelect,
  isHovered,
  onHover,
}: {
  theme: Theme;
  isActive: boolean;
  onSelect: () => void;
  isHovered: boolean;
  onHover: () => void;
}) => {
  return (
    <motion.button
      onClick={onSelect}
      onMouseEnter={onHover}
      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md transition-colors duration-150 ${
        isActive
          ? 'bg-primary/20 text-primary'
          : isHovered
          ? 'bg-muted/80'
          : 'hover:bg-muted/50'
      }`}
      whileHover={{ x: 2 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-3">
        <ThemePreviewSwatch theme={theme} />
        <span className="text-sm font-medium">{theme.name}</span>
        <span className="text-xs text-muted-foreground capitalize px-1.5 py-0.5 rounded bg-muted/50">
          {theme.type}
        </span>
      </div>
      {isActive && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-primary"
        >
          <Check className="w-4 h-4" />
        </motion.div>
      )}
    </motion.button>
  );
};

export const ThemeSelector = () => {
  const { currentTheme, setTheme, themes, isThemeSelectorOpen, closeThemeSelector } = useTheme();
  const [hoveredTheme, setHoveredTheme] = useState<ThemeId | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        closeThemeSelector();
      }
    };

    if (isThemeSelectorOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isThemeSelectorOpen, closeThemeSelector]);

  // Reset hover when closing
  useEffect(() => {
    if (!isThemeSelectorOpen) {
      setHoveredTheme(null);
    }
  }, [isThemeSelectorOpen]);

  const handleThemeSelect = (themeId: ThemeId) => {
    setTheme(themeId);
    closeThemeSelector();
  };

  return (
    <AnimatePresence>
      {isThemeSelectorOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
            onClick={closeThemeSelector}
          />

          {/* Command Palette Style Modal - positioned at top like VS Code */}
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            className="fixed top-[15%] left-1/2 -translate-x-1/2 z-[101] w-[90vw] max-w-lg"
          >
            <div 
              className="rounded-lg shadow-2xl overflow-hidden border"
              style={{
                backgroundColor: 'hsl(var(--popover))',
                borderColor: 'hsl(var(--border))',
              }}
            >
              {/* Header */}
              <div 
                className="flex items-center justify-between px-4 py-3 border-b"
                style={{
                  backgroundColor: 'hsl(var(--secondary) / 0.5)',
                  borderColor: 'hsl(var(--border))',
                }}
              >
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
                  <span className="text-sm font-medium" style={{ color: 'hsl(var(--foreground))' }}>
                    Color Theme
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span 
                    className="text-xs hidden sm:inline"
                    style={{ color: 'hsl(var(--muted-foreground))' }}
                  >
                    Ctrl+Shift+T
                  </span>
                  <button
                    onClick={closeThemeSelector}
                    className="p-1 rounded transition-colors hover:opacity-80"
                    style={{ color: 'hsl(var(--foreground))' }}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Theme List */}
              <div className="p-2 max-h-[50vh] overflow-y-auto">
                {themes.map((theme) => (
                  <ThemeOption
                    key={theme.id}
                    theme={theme}
                    isActive={currentTheme === theme.id}
                    isHovered={hoveredTheme === theme.id}
                    onSelect={() => handleThemeSelect(theme.id)}
                    onHover={() => setHoveredTheme(theme.id)}
                  />
                ))}
              </div>

              {/* Footer hint */}
              <div 
                className="px-4 py-2.5 border-t text-center"
                style={{
                  backgroundColor: 'hsl(var(--secondary) / 0.3)',
                  borderColor: 'hsl(var(--border))',
                }}
              >
                <p 
                  className="text-xs"
                  style={{ color: 'hsl(var(--muted-foreground))' }}
                >
                  Click to select • Theme persists across sessions
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Theme toggle button for the top bar
export const ThemeToggleButton = () => {
  const { currentTheme, themes, toggleThemeSelector } = useTheme();
  const activeTheme = themes.find((t) => t.id === currentTheme);

  return (
    <motion.button
      onClick={toggleThemeSelector}
      className="flex items-center gap-2 px-2 py-1 rounded transition-colors hover:opacity-80"
      style={{ backgroundColor: 'hsl(var(--muted) / 0.5)' }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      title="Change Color Theme (Ctrl+Shift+T)"
    >
      <Palette className="w-4 h-4" style={{ color: 'hsl(var(--muted-foreground))' }} />
      <span 
        className="text-xs hidden sm:inline"
        style={{ color: 'hsl(var(--muted-foreground))' }}
      >
        {activeTheme?.name || 'Theme'}
      </span>
      {activeTheme && (
        <div
          className="w-2.5 h-2.5 rounded-full border border-white/20"
          style={{ background: activeTheme.colors.accent }}
        />
      )}
    </motion.button>
  );
};
