import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen } from '../../test-utils';
import { Shell } from '../../../src/components/index';

function App({ defaultSize }: { defaultSize: string | number }) {
  return (
    <Shell.Root>
      <Shell.Rail presentation="fixed" />
      <Shell.Panel>panel</Shell.Panel>
      <Shell.Content>content</Shell.Content>
      <Shell.Inspector presentation={{ initial: 'fixed' }} defaultOpen defaultSize={defaultSize}>
        inspector
      </Shell.Inspector>
    </Shell.Root>
  );
}

function getEl() {
  return screen.getByText('inspector').closest('.rt-ShellInspector') as HTMLElement;
}

describe('Inspector defaultSize normalization', () => {
  it('applies px size (number) directly', () => {
    renderWithProviders(<App defaultSize={300} />);
    const el = getEl();
    expect(el.style.getPropertyValue('--inspector-size')).toBe('300px');
  });

  it('normalizes rem to px', () => {
    renderWithProviders(<App defaultSize="24rem" />);
    const el = getEl();
    const px = Number.parseFloat(getComputedStyle(document.documentElement).fontSize || '16') * 24;
    expect(Number.parseFloat(el.style.getPropertyValue('--inspector-size'))).toBeCloseTo(px, 1);
  });

  it('normalizes % to px against viewport width', () => {
    renderWithProviders(<App defaultSize="50%" />);
    const el = getEl();
    const viewport = document.documentElement.clientWidth || window.innerWidth;
    const expected = viewport * 0.5;
    const clamped = Math.min(500, expected); // Inspector default maxSize=500
    expect(Number.parseFloat(el.style.getPropertyValue('--inspector-size'))).toBeCloseTo(clamped, 0);
  });
});
