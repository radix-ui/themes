import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { renderWithProviders } from '../../test-utils';
import { Shell } from '../../../src/components/index';

describe('Inspector (stacked) data-open', () => {
  it('has data-open when stacked and expanded', async () => {
    renderWithProviders(
      <Shell.Root>
        <Shell.Content>content</Shell.Content>
        <Shell.Inspector presentation={{ initial: 'stacked' }} defaultOpen>
          insp
        </Shell.Inspector>
      </Shell.Root>,
    );

    const insp = document.querySelector('.rt-ShellInspector') as HTMLElement;
    expect(insp).toBeTruthy();
    expect(insp.hasAttribute('data-open')).toBe(true);
  });

  it('does not have data-open when stacked and collapsed', async () => {
    renderWithProviders(
      <Shell.Root>
        <Shell.Content>content</Shell.Content>
        <Shell.Inspector presentation={{ initial: 'stacked' }}>insp</Shell.Inspector>
      </Shell.Root>,
    );

    const insp = document.querySelector('.rt-ShellInspector') as HTMLElement;
    expect(insp).toBeTruthy();
    expect(insp.hasAttribute('data-open')).toBe(false);
  });
});
