import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils';
import { Shell } from '../../../src/components/index';

describe('Sidebar (stacked) data-open', () => {
  it('has data-open when stacked and expanded', async () => {
    renderWithProviders(
      <Shell.Root>
        <Shell.Sidebar presentation={{ initial: 'stacked' }} defaultState="expanded">
          sb
        </Shell.Sidebar>
        <Shell.Content>content</Shell.Content>
      </Shell.Root>,
    );

    const sb = document.querySelector('.rt-ShellSidebar') as HTMLElement;
    expect(sb).toBeTruthy();
    expect(sb.hasAttribute('data-open')).toBe(true);
  });

  it('does not have data-open when stacked and collapsed', async () => {
    renderWithProviders(
      <Shell.Root>
        <Shell.Sidebar presentation={{ initial: 'stacked' }} defaultState="collapsed">
          sb
        </Shell.Sidebar>
        <Shell.Content>content</Shell.Content>
      </Shell.Root>,
    );

    const sb = document.querySelector('.rt-ShellSidebar') as HTMLElement;
    expect(sb).toBeTruthy();

    await waitFor(
      () => {
        expect(sb.getAttribute('data-mode')).toBe('collapsed');
      },
      { timeout: 1000 },
    );

    await waitFor(
      () => {
        expect(sb.hasAttribute('data-open')).toBe(false);
      },
      { timeout: 1000 },
    );
  });
});
