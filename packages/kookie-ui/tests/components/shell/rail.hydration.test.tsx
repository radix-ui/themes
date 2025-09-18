import * as React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderWithProviders } from '../../test-utils';
import { waitFor } from '@testing-library/react';
import { Shell } from '../../../src/components/index';
import { usePeek } from '../../../src/components/shell.context';

// We simulate SSR-like first render by making useBreakpoint not ready initially,
// then ready on a subsequent microtask, similar to real behavior.

function setupImmediateReadyMatchMedia() {
  const original = window.matchMedia;
  (window as any).matchMedia = (query: string): MediaQueryList =>
    ({
      media: query,
      matches: false,
      onchange: null,
      addEventListener: undefined,
      removeEventListener: undefined,
      addListener: () => {},
      removeListener: () => {},
    }) as any;
  return () => {
    (window as any).matchMedia = original;
  };
}

describe('Shell.Rail hydration guards', () => {
  let cleanupMql: () => void;

  beforeEach(() => {
    cleanupMql = setupImmediateReadyMatchMedia();
  });

  afterEach(() => {
    cleanupMql();
  });

  it('does not set data-peek/data-visible on initial paint; after ready + peek, they appear', async () => {
    function PeekOnMount() {
      const { peekPane } = usePeek();
      React.useEffect(() => {
        const t = setTimeout(() => peekPane('rail'));
        return () => clearTimeout(t);
      }, [peekPane]);
      return null;
    }

    renderWithProviders(
      <Shell.Root>
        <Shell.Rail presentation="fixed" />
        <Shell.Panel>panel</Shell.Panel>
        <Shell.Content>
          <PeekOnMount />
          content
        </Shell.Content>
      </Shell.Root>,
    );

    const rail = document.querySelector('.rt-ShellRail') as HTMLElement;
    const content = document.querySelector('.rt-ShellRailContent') as HTMLElement;

    // Initial paint: attributes absent
    expect(rail?.hasAttribute('data-peek')).toBe(false);
    expect(content?.hasAttribute('data-visible')).toBe(false);

    // After effects: breakpoint becomes ready and we trigger peek
    await waitFor(() => expect(rail?.hasAttribute('data-peek')).toBe(true));
    await waitFor(() => expect(content?.hasAttribute('data-visible')).toBe(true));
  });
});
