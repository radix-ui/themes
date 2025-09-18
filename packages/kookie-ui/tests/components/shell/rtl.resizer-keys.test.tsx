import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen } from '../../test-utils';
import { fireEvent } from '@testing-library/react';
import { Shell } from '../../../src/components/index';

function AppPanelRTL({ dir = 'rtl' as 'rtl' | 'ltr' }) {
  return (
    <div dir={dir}>
      <Shell.Root>
        <Shell.Rail presentation="fixed" />
        <Shell.Panel defaultOpen resizable expandedSize={200} minSize={120} maxSize={400}>
          panel
          <Shell.Panel.Handle />
        </Shell.Panel>
        <Shell.Content>content</Shell.Content>
      </Shell.Root>
    </div>
  );
}

function AppInspectorRTL({ dir = 'rtl' as 'rtl' | 'ltr' }) {
  return (
    <div dir={dir}>
      <Shell.Root>
        <Shell.Rail presentation="fixed" />
        <Shell.Panel>panel</Shell.Panel>
        <Shell.Content>content</Shell.Content>
        <Shell.Inspector presentation={{ initial: 'fixed' }} defaultOpen resizable expandedSize={320} minSize={200} maxSize={500}>
          inspector
          <Shell.Inspector.Handle />
        </Shell.Inspector>
      </Shell.Root>
    </div>
  );
}

describe('RTL logical resizer keys', () => {
  it('Panel vertical resizer: ArrowLeft grows, ArrowRight shrinks in RTL', () => {
    renderWithProviders(<AppPanelRTL dir="rtl" />);
    const slider = screen.getByRole('slider');
    const style = getComputedStyle(slider.parentElement as HTMLElement);
    const before = parseFloat(style.getPropertyValue('--panel-size')) || 200;
    fireEvent.keyDown(slider, { key: 'ArrowLeft' });
    const afterLeft = parseFloat(getComputedStyle(slider.parentElement as HTMLElement).getPropertyValue('--panel-size')) || before;
    expect(afterLeft).toBeGreaterThan(before);
    fireEvent.keyDown(slider, { key: 'ArrowRight' });
    const afterRight = parseFloat(getComputedStyle(slider.parentElement as HTMLElement).getPropertyValue('--panel-size')) || afterLeft;
    expect(afterRight).toBeLessThanOrEqual(afterLeft);
  });

  it('Inspector vertical resizer: ArrowLeft shrinks, ArrowRight grows in RTL (edge=start)', () => {
    renderWithProviders(<AppInspectorRTL dir="rtl" />);
    const inspectorSlider = screen.getByRole('slider');
    const style = getComputedStyle(inspectorSlider.parentElement as HTMLElement);
    const before = parseFloat(style.getPropertyValue('--inspector-size')) || 320;
    fireEvent.keyDown(inspectorSlider, { key: 'ArrowLeft' });
    const afterLeft = parseFloat(getComputedStyle(inspectorSlider.parentElement as HTMLElement).getPropertyValue('--inspector-size')) || before;
    expect(afterLeft).toBeLessThan(before);
    fireEvent.keyDown(inspectorSlider, { key: 'ArrowRight' });
    const afterRight = parseFloat(getComputedStyle(inspectorSlider.parentElement as HTMLElement).getPropertyValue('--inspector-size')) || afterLeft;
    expect(afterRight).toBeGreaterThanOrEqual(afterLeft);
  });
});
