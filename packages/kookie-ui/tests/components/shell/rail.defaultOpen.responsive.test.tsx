import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen } from '../../test-utils';
import { Shell } from '../../../src/components/index';

function App({ defaultOpen }: { defaultOpen?: boolean | { initial?: boolean; xs?: boolean; sm?: boolean; md?: boolean; lg?: boolean; xl?: boolean } }) {
  return (
    <Shell.Root>
      <Shell.Rail presentation="fixed" defaultOpen={defaultOpen} />
      <Shell.Panel>panel</Shell.Panel>
      <Shell.Content>content</Shell.Content>
    </Shell.Root>
  );
}

describe('Rail defaultOpen (responsive)', () => {
  it('defaults to true (open) when no defaultOpen is provided', () => {
    renderWithProviders(<App />);
    const left = screen.getByText('panel').closest('.rt-ShellLeft') as HTMLElement;
    expect(left).toHaveAttribute('data-mode', 'expanded');
  });

  it('respects defaultOpen={false} to start collapsed', () => {
    renderWithProviders(<App defaultOpen={false} />);
    const left = screen.getByText('panel').closest('.rt-ShellLeft') as HTMLElement;
    expect(left).toHaveAttribute('data-mode', 'collapsed');
  });

  it('respects defaultOpen={true} to start expanded', () => {
    renderWithProviders(<App defaultOpen={true} />);
    const left = screen.getByText('panel').closest('.rt-ShellLeft') as HTMLElement;
    expect(left).toHaveAttribute('data-mode', 'expanded');
  });

  it('resolves responsive map at initial breakpoint (initial: true → expanded)', () => {
    renderWithProviders(<App defaultOpen={{ initial: true, lg: false }} />);
    const left = screen.getByText('panel').closest('.rt-ShellLeft') as HTMLElement;
    expect(left).toHaveAttribute('data-mode', 'expanded');
  });

  it('resolves responsive map at initial breakpoint (initial: false → collapsed)', () => {
    renderWithProviders(<App defaultOpen={{ initial: false, lg: true }} />);
    const left = screen.getByText('panel').closest('.rt-ShellLeft') as HTMLElement;
    expect(left).toHaveAttribute('data-mode', 'collapsed');
  });
});
