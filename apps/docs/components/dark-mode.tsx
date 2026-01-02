'use client';

import React from 'react';
import { IconButton, useThemeContext } from '@kushagradhawan/kookie-ui';
import { Moon, Sun } from 'lucide-react';

export function DarkModeToggle() {
  const { appearance, onAppearanceChange } = useThemeContext();
  const [mounted, setMounted] = React.useState(false);

  // Only render after mounting to avoid hydration issues
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newAppearance = appearance === 'dark' ? 'light' : 'dark';
    onAppearanceChange(newAppearance);
    localStorage.setItem('kookie-theme', newAppearance);
  };

  // Initialize theme from localStorage or system preference
  React.useEffect(() => {
    if (!mounted) return;

    const savedTheme = localStorage.getItem('kookie-theme') as 'light' | 'dark' | null;
    if (savedTheme && savedTheme !== appearance) {
      onAppearanceChange(savedTheme);
    } else if (!savedTheme && appearance === 'inherit') {
      // Set initial theme based on system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = prefersDark ? 'dark' : 'light';
      onAppearanceChange(initialTheme);
      localStorage.setItem('kookie-theme', initialTheme);
    }
  }, [mounted, appearance, onAppearanceChange]);

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <IconButton variant="ghost" size="2" aria-label="Loading theme toggle">
        <div style={{ width: 16, height: 16 }} />
      </IconButton>
    );
  }

  const isDark = appearance === 'dark';

  return (
    <IconButton variant="ghost" size="2" highContrast color="gray" onClick={toggleTheme} aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
      {isDark ? <Sun /> : <Moon />}
    </IconButton>
  );
}
