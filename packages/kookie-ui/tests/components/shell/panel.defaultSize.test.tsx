import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen } from '../../test-utils';
import { Shell } from '../../../src/components/index';

function App({ defaultSize }: { defaultSize: string | number }) {
  return (
    <Shell.Root>
      <Shell.Rail presentation="fixed" />
      <Shell.Panel defaultOpen defaultSize={defaultSize}>
        panel
      </Shell.Panel>
      <Shell.Content>content</Shell.Content>
    </Shell.Root>
  );
}

function getPanelEl() {
  return screen.getByText('panel').closest('.rt-ShellPanel') as HTMLElement;
}

describe('Panel defaultSize normalization', () => {
  it('applies px size (number) directly', () => {
    renderWithProviders(<App defaultSize={300} />);
    const el = getPanelEl();
    expect(el.style.getPropertyValue('--panel-size')).toBe('300px');
  });

  it('normalizes rem to px', () => {
    renderWithProviders(<App defaultSize="24rem" />);
    const el = getPanelEl();
    const px = Number.parseFloat(getComputedStyle(document.documentElement).fontSize || '16') * 24;
    expect(Number.parseFloat(el.style.getPropertyValue('--panel-size'))).toBeCloseTo(px, 1);
  });

  it('normalizes % to px against viewport width', () => {
    renderWithProviders(<App defaultSize="50%" />);
    const el = getPanelEl();
    const expected = (document.documentElement.clientWidth || window.innerWidth) * 0.5;
    expect(Number.parseFloat(el.style.getPropertyValue('--panel-size'))).toBeCloseTo(expected, 0);
  });
});
