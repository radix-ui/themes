import * as React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderWithProviders, screen } from '../../test-utils';
import { waitFor } from '@testing-library/react';
import { Shell } from '../../../src/components/index';
import { usePresentation } from '../../../src/components/shell.context';
import { _BREAKPOINTS as BREAKPOINTS } from '../../../src/components/shell.types';

type Listener = (e: MediaQueryListEvent) => void;

function setupMatchMediaFallbackMock() {
  const registry = new Map<string, { matches: boolean; listeners: Listener[] }>();

  function ensure(query: string) {
    if (!registry.has(query)) registry.set(query, { matches: false, listeners: [] });
    return registry.get(query)!;
  }

  const original = window.matchMedia;
  (window as any).matchMedia = (query: string): MediaQueryList => {
    const entry = ensure(query);
    const mql: any = {
      media: query,
      get matches() {
        return entry.matches;
      },
      onchange: null,
      addEventListener: undefined,
      removeEventListener: undefined,
      addListener: (cb: Listener) => entry.listeners.push(cb),
      removeListener: (cb: Listener) => {
        const i = entry.listeners.indexOf(cb);
        if (i >= 0) entry.listeners.splice(i, 1);
      },
      dispatch: () => {
        entry.listeners.forEach((cb) => cb({ matches: entry.matches } as MediaQueryListEvent));
      },
    };
    return mql as MediaQueryList;
  };

  function setMatches(label: keyof typeof BREAKPOINTS, value: boolean) {
    const query = BREAKPOINTS[label];
    const entry = ensure(query);
    entry.matches = value;
    // Trigger listeners
    const mql: any = window.matchMedia(query);
    if (typeof mql.dispatch === 'function') mql.dispatch();
  }

  function cleanup() {
    (window as any).matchMedia = original;
  }

  return { setMatches, cleanup };
}

function BreakpointProbe() {
  const { currentBreakpoint, currentBreakpointReady } = usePresentation();
  return (
    <div data-testid="bp" data-ready={currentBreakpointReady || undefined}>
      {currentBreakpoint}
    </div>
  );
}

function App() {
  return (
    <Shell.Root>
      <Shell.Content>
        <BreakpointProbe />
      </Shell.Content>
    </Shell.Root>
  );
}

describe('useBreakpoint fallback to addListener/removeListener', () => {
  let mock: ReturnType<typeof setupMatchMediaFallbackMock>;

  beforeEach(() => {
    mock = setupMatchMediaFallbackMock();
  });

  afterEach(() => {
    mock.cleanup();
  });

  it('updates to the highest matched breakpoint when only addListener is available', async () => {
    renderWithProviders(<App />);

    // Initially nothing matches → 'initial'
    const el = await screen.findByTestId('bp');
    expect(el.textContent).toBe('initial');

    // Set md true and wait for update
    mock.setMatches('md', true);
    await waitFor(() => expect(el.textContent).toBe('md'));

    // Set lg true as well (higher)
    mock.setMatches('lg', true);
    await waitFor(() => expect(el.textContent).toBe('lg'));

    // Turn off lg, keep md
    mock.setMatches('lg', false);
    await waitFor(() => expect(el.textContent).toBe('md'));
  });
});
