import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen } from '../../test-utils';
import { Shell } from '../../../src/components/index';

function App({ defaultSize }: { defaultSize: string | number }) {
  return (
    <Shell.Root>
      <Shell.Content>content</Shell.Content>
      <Shell.Bottom presentation={{ initial: 'fixed' }} defaultOpen defaultSize={defaultSize}>
        bottom
      </Shell.Bottom>
    </Shell.Root>
  );
}

function getEl() {
  return screen.getByText('bottom').closest('.rt-ShellBottom') as HTMLElement;
}

describe('Bottom defaultSize normalization', () => {
  it('applies px size (number) directly', () => {
    renderWithProviders(<App defaultSize={120} />);
    const el = getEl();
    expect(el.style.getPropertyValue('--bottom-size')).toBe('120px');
  });

  it('normalizes rem to px', () => {
    renderWithProviders(<App defaultSize="10rem" />);
    const el = getEl();
    const px = Number.parseFloat(getComputedStyle(document.documentElement).fontSize || '16') * 10;
    expect(Number.parseFloat(el.style.getPropertyValue('--bottom-size'))).toBeCloseTo(px, 1);
  });

  it('normalizes % to px against viewport height (clamped by max)', () => {
    renderWithProviders(<App defaultSize="50%" />);
    const el = getEl();
    const viewport = document.documentElement.clientHeight || window.innerHeight;
    const expected = viewport * 0.5;
    const clamped = Math.min(400, expected); // Bottom default maxSize=400
    expect(Number.parseFloat(el.style.getPropertyValue('--bottom-size'))).toBeCloseTo(clamped, 0);
  });
});
