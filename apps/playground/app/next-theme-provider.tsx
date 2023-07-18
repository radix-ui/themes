'use client';

import { ThemeProvider } from 'next-themes';

export function NextThemeProvider({ children }) {
  return (
    <ThemeProvider attribute="class" value={{ light: 'light-theme', dark: 'dark-theme' }}>
      {children}
    </ThemeProvider>
  );
}
