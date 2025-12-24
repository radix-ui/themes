import * as React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Theme } from '../src/components/theme';

type ProvidersProps = { children: React.ReactNode };

function Providers({ children }: ProvidersProps) {
  // Wrap all tests in Theme to provide context for components that need it
  return <Theme>{children}</Theme>;
}

export function renderWithProviders(ui: React.ReactElement, options?: RenderOptions) {
  return render(ui, { wrapper: Providers, ...options });
}

export * from '@testing-library/react';
