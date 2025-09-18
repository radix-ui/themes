import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Ensure a clean DOM between tests
afterEach(() => {
  cleanup();
});

// jsdom: add matchMedia polyfill used by Shell's breakpoint logic
if (typeof window !== 'undefined' && !window.matchMedia) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).matchMedia = (query: string) => {
    let listeners: Array<(e: MediaQueryListEvent) => void> = [];
    const mql: MediaQueryList = {
      media: query,
      matches: false,
      onchange: null,
      addEventListener: (_type: 'change', cb: (e: MediaQueryListEvent) => void) => {
        listeners.push(cb);
      },
      removeEventListener: (_type: 'change', cb: (e: MediaQueryListEvent) => void) => {
        listeners = listeners.filter((l) => l !== cb);
      },
      addListener: (cb: (e: MediaQueryListEvent) => void) => {
        listeners.push(cb);
      },
      removeListener: (cb: (e: MediaQueryListEvent) => void) => {
        listeners = listeners.filter((l) => l !== cb);
      },
      dispatchEvent: () => false,
    } as unknown as MediaQueryList;
    return mql;
  };
}
