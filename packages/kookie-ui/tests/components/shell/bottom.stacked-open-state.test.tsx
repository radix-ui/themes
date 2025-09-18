import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { renderWithProviders } from '../../test-utils';
import { Shell } from '../../../src/components/index';

describe('Bottom (stacked) data-open', () => {
  it('has data-open when stacked and expanded', async () => {
    renderWithProviders(
      <Shell.Root>
        <Shell.Content>content</Shell.Content>
        <Shell.Bottom presentation={{ initial: 'stacked' }} defaultOpen>
          bottom
        </Shell.Bottom>
      </Shell.Root>,
    );

    const bottom = document.querySelector('.rt-ShellBottom') as HTMLElement;
    expect(bottom).toBeTruthy();
    expect(bottom.hasAttribute('data-open')).toBe(true);
  });

  it('does not have data-open when stacked and collapsed', async () => {
    renderWithProviders(
      <Shell.Root>
        <Shell.Content>content</Shell.Content>
        <Shell.Bottom presentation={{ initial: 'stacked' }}>bottom</Shell.Bottom>
      </Shell.Root>,
    );

    const bottom = document.querySelector('.rt-ShellBottom') as HTMLElement;
    expect(bottom).toBeTruthy();
    expect(bottom.hasAttribute('data-open')).toBe(false);
  });
});
