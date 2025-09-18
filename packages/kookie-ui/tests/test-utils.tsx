import * as React from 'react';
import { render, RenderOptions } from '@testing-library/react';

type ProvidersProps = { children: React.ReactNode };

function Providers({ children }: ProvidersProps) {
  // Add any library-wide providers if needed later
  return <>{children}</>;
}

export function renderWithProviders(ui: React.ReactElement, options?: RenderOptions) {
  return render(ui, { wrapper: Providers, ...options });
}

export * from '@testing-library/react';
