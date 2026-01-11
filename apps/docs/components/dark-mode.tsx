'use client';

import React from 'react';
import { IconButton, useThemeContext } from '@kushagradhawan/kookie-ui';
import { HugeiconsIcon } from '@hugeicons/react';
import { Moon02Icon, Sun03Icon } from '@hugeicons/core-free-icons';

/**
 * Dark mode toggle that works both inside and outside Theme context.
 * When rendered in a portal (e.g., Sheet overlay), context may not be available,
 * so we also directly manipulate the DOM and use localStorage as source of truth.
 */
export function DarkModeToggle() {
  const { appearance, onAppearanceChange } = useThemeContext();
  const [mounted, setMounted] = React.useState(false);
  const [localAppearance, setLocalAppearance] = React.useState<'light' | 'dark'>('light');

  // Only render after mounting to avoid hydration issues
  React.useEffect(() => {
    setMounted(true);
    // Initialize from localStorage or system preference
    const savedTheme = localStorage.getItem('kookie-theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setLocalAppearance(savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setLocalAppearance(prefersDark ? 'dark' : 'light');
    }
  }, []);

  // Sync local state when context changes (when inside Theme provider)
  React.useEffect(() => {
    if (mounted && (appearance === 'light' || appearance === 'dark')) {
      setLocalAppearance(appearance);
    }
  }, [mounted, appearance]);

  const toggleTheme = () => {
    const newAppearance = localAppearance === 'dark' ? 'light' : 'dark';

    // Update localStorage (source of truth)
    localStorage.setItem('kookie-theme', newAppearance);

    // Update local state for immediate UI feedback
    setLocalAppearance(newAppearance);

    // Try to update via context (works when inside Theme provider)
    onAppearanceChange(newAppearance);

    // Also directly update ALL theme elements (including portaled ones like Sheet overlays)
    // This ensures the theme changes even when context is unavailable
    const themeElements = document.querySelectorAll('.radix-themes');
    themeElements.forEach((el) => {
      el.classList.remove('light', 'dark');
      el.classList.add(newAppearance);
    });
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

  const isDark = localAppearance === 'dark';

  return (
    <IconButton
      variant="ghost"
      size="2"
      highContrast
      color="gray"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <HugeiconsIcon icon={Sun03Icon} strokeWidth={1.75} />
      ) : (
        <HugeiconsIcon icon={Moon02Icon} strokeWidth={1.75} />
      )}
    </IconButton>
  );
}
