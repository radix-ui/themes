'use client';

import { ThemeProvider } from 'next-themes';

export function NextThemeProvider({ children }) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
