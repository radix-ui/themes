'use client';

import * as React from 'react';
import { Theme, Flex, ThemePanel, IconButton } from '@radix-ui/themes';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '@radix-ui/react-icons';
import { NextThemeProvider } from '../next-theme-provider';

export default function Test() {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextThemeProvider>
          <Theme asChild>
            <div id="root">
              <ThemeTogglePanel />
              <Flex height="100vh" width="100vw" align="center" justify="center">
                <ThemeToggle />
              </Flex>
            </div>
          </Theme>
        </NextThemeProvider>
      </body>
    </html>
  );
}

function ThemeTogglePanel() {
  const { systemTheme, setTheme } = useTheme();
  return (
    <ThemePanel
      onAppearanceChange={(newTheme) => {
        const newThemeMatchesSystem = newTheme === systemTheme;
        setTheme(newThemeMatchesSystem ? 'system' : (newTheme as 'light' | 'dark'));
      }}
    />
  );
}

function ThemeToggle({ children, ...props }: React.ComponentPropsWithoutRef<typeof IconButton>) {
  const { theme, systemTheme, setTheme } = useTheme();

  return (
    <>
      <style>{`
        :root, .light, .light-theme {
          --theme-toggle-sun-icon-display: block;
          --theme-toggle-moon-icon-display: none;
        }
        .dark, .dark-theme {
          --theme-toggle-sun-icon-display: none;
          --theme-toggle-moon-icon-display: block;
        }
      `}</style>

      <IconButton
        size="3"
        variant="ghost"
        color="gray"
        onClick={() => {
          // Set 'system' theme if the next theme matches the system theme
          const resolvedTheme = theme === 'system' ? systemTheme : theme;
          const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
          const newThemeMatchesSystem = newTheme === systemTheme;
          setTheme(newThemeMatchesSystem ? 'system' : newTheme);
        }}
        {...props}
      >
        <SunIcon
          width="16"
          height="16"
          style={{ display: 'var(--theme-toggle-sun-icon-display)' }}
        />
        <MoonIcon
          width="16"
          height="16"
          style={{ display: 'var(--theme-toggle-moon-icon-display)' }}
        />
      </IconButton>
    </>
  );
}
