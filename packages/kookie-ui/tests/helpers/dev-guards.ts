import { expect, vi } from 'vitest';

/**
 * Dev guard utilities for testing runtime warnings
 */

/**
 * Spy on console.error for dev guard assertions
 */
export function spyConsoleError() {
  return vi.spyOn(console, 'error').mockImplementation(() => {});
}

/**
 * Spy on console.warn for dev guard assertions
 */
export function spyConsoleWarn() {
  return vi.spyOn(console, 'warn').mockImplementation(() => {});
}

/**
 * Assert that a dev guard was triggered
 */
export function expectDevGuard(spy: ReturnType<typeof spyConsoleError>, message: string) {
  expect(spy).toHaveBeenCalledWith(expect.stringContaining(message));
}

/**
 * Assert that no dev guards were triggered
 */
export function expectNoDevGuards(spy: ReturnType<typeof spyConsoleError>) {
  expect(spy).not.toHaveBeenCalled();
}

/**
 * Restore console mocks
 */
export function restoreConsole() {
  vi.restoreAllMocks();
}
