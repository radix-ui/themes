import * as React from 'react';
import type { Breakpoint, PresentationValue, ResponsivePresentation } from './shell.types.js';
import { _BREAKPOINTS } from './shell.types.js';
import { useShell } from './shell.context.js';

export function useResponsivePresentation(presentation: ResponsivePresentation): PresentationValue {
  const { currentBreakpoint } = useShell();

  return React.useMemo(() => {
    if (typeof presentation === 'string') {
      return presentation;
    }

    if (presentation[currentBreakpoint]) {
      return presentation[currentBreakpoint]!;
    }

    const bpKeys = Object.keys(_BREAKPOINTS) as Array<keyof typeof _BREAKPOINTS>;
    const order: Breakpoint[] = ([...bpKeys].reverse() as Breakpoint[]).concat('initial' as Breakpoint);
    const startIdx = order.indexOf(currentBreakpoint as Breakpoint);

    for (let i = startIdx + 1; i < order.length; i++) {
      const bp = order[i];
      if (presentation[bp]) {
        return presentation[bp]!;
      }
    }

    return 'fixed';
  }, [presentation, currentBreakpoint]);
}

/**
 * Resolve a responsive value (T or responsive map keyed by breakpoints) against the current Shell breakpoint.
 * If no value is defined for the current breakpoint, search smaller breakpoints down to 'initial'.
 * Returns undefined when passed a responsive map with no matching key across the chain.
 */
export function useResponsiveValue<T>(value: T | Partial<Record<Breakpoint, T>> | undefined): T | undefined {
  const { currentBreakpoint } = useShell();

  return React.useMemo(() => {
    if (value == null) return undefined;
    // Primitive value
    if (typeof value !== 'object') {
      return value as T;
    }

    const map = value as Partial<Record<Breakpoint, T>>;
    if (map[currentBreakpoint as Breakpoint] !== undefined) {
      return map[currentBreakpoint as Breakpoint] as T;
    }

    const bpKeys = Object.keys(_BREAKPOINTS) as Array<keyof typeof _BREAKPOINTS>;
    const order: Breakpoint[] = ([...bpKeys].reverse() as Breakpoint[]).concat('initial' as Breakpoint);
    const startIdx = order.indexOf(currentBreakpoint as Breakpoint);

    for (let i = startIdx + 1; i < order.length; i++) {
      const bp = order[i];
      if (map[bp] !== undefined) {
        return map[bp] as T;
      }
    }

    return undefined;
  }, [value, currentBreakpoint]);
}
