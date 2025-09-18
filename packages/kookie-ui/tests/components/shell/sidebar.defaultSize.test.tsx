import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen } from '../../test-utils';
import { Shell } from '../../../src/components/index';

function App({ defaultSize }: { defaultSize: string | number }) {
  return (
    <Shell.Root>
      <Shell.Header></Shell.Header>
      <Shell.Sidebar presentation={{ initial: 'fixed' }} defaultState="expanded" defaultSize={defaultSize}>
        sidebar
      </Shell.Sidebar>
      <Shell.Content>content</Shell.Content>
    </Shell.Root>
  );
}

function getEl() {
  return screen.getByText('sidebar').closest('.rt-ShellSidebar') as HTMLElement;
}

describe('Sidebar defaultSize normalization', () => {
  it('applies px size (number) directly', () => {
    renderWithProviders(<App defaultSize={300} />);
    const el = getEl();
    expect(el.style.getPropertyValue('--sidebar-size')).toBe('300px');
  });

  it('normalizes rem to px', () => {
    renderWithProviders(<App defaultSize="24rem" />);
    const el = getEl();
    const px = Number.parseFloat(getComputedStyle(document.documentElement).fontSize || '16') * 24;
    expect(Number.parseFloat(el.style.getPropertyValue('--sidebar-size'))).toBeCloseTo(px, 1);
  });

  it('normalizes % to px against viewport width', () => {
    renderWithProviders(<App defaultSize="50%" />);
    const el = getEl();
    const viewport = document.documentElement.clientWidth || window.innerWidth;
    const expected = viewport * 0.5;
    const clamped = Math.min(400, expected); // Sidebar default maxSize=400
    expect(Number.parseFloat(el.style.getPropertyValue('--sidebar-size'))).toBeCloseTo(clamped, 0);
  });
});
