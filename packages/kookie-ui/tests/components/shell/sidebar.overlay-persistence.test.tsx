import * as React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderWithProviders } from '../../test-utils';
import { Shell } from '../../../src/components/index';

describe('Sidebar overlay: no persistence load/save', () => {
  const originalGet = window.localStorage.getItem;
  const originalSet = window.localStorage.setItem;
  const getSpy = vi.fn();
  const setSpy = vi.fn();

  beforeEach(() => {
    vi.spyOn(window.localStorage.__proto__, 'getItem' as any).mockImplementation(getSpy as any);
    vi.spyOn(window.localStorage.__proto__, 'setItem' as any).mockImplementation(setSpy as any);
  });

  afterEach(() => {
    (window.localStorage.getItem as any).mockRestore?.();
    (window.localStorage.setItem as any).mockRestore?.();
    window.localStorage.getItem = originalGet;
    window.localStorage.setItem = originalSet;
    getSpy.mockReset();
    setSpy.mockReset();
  });

  it('does not call localStorage in overlay presentation', async () => {
    renderWithProviders(
      <Shell.Root>
        <Shell.Sidebar presentation={{ initial: 'overlay' }} paneId="sidebar-ovl" resizable defaultSize={300}>
          sb
        </Shell.Sidebar>
        <Shell.Content>content</Shell.Content>
      </Shell.Root>,
    );

    // Allow effects to flush
    await Promise.resolve();
    await Promise.resolve();

    expect(getSpy).not.toHaveBeenCalled();
    expect(setSpy).not.toHaveBeenCalled();
  });
});
