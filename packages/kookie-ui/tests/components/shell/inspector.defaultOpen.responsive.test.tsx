import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen } from '../../test-utils';
import { Shell } from '../../../src/components/index';

function App({ defaultOpen }: { defaultOpen: { initial?: boolean; xs?: boolean; sm?: boolean; md?: boolean; lg?: boolean; xl?: boolean } }) {
  return (
    <Shell.Root>
      <Shell.Content>content</Shell.Content>
      <Shell.Inspector presentation={{ initial: 'fixed' }} defaultOpen={defaultOpen}>
        inspector
      </Shell.Inspector>
    </Shell.Root>
  );
}

describe('Inspector defaultOpen (responsive initial-only)', () => {
  it('resolves responsive map at initial breakpoint (initial: true → expanded)', () => {
    renderWithProviders(<App defaultOpen={{ initial: true, lg: false }} />);
    const el = screen.getByText('inspector').closest('.rt-ShellInspector') as HTMLElement;
    expect(el).toHaveAttribute('data-mode', 'expanded');
  });

  it('resolves responsive map at initial breakpoint (initial: false → collapsed)', () => {
    renderWithProviders(<App defaultOpen={{ initial: false, lg: true }} />);
    const el = screen.getByText('inspector').closest('.rt-ShellInspector') as HTMLElement;
    expect(el).toHaveAttribute('data-mode', 'collapsed');
  });
});
