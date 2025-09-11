import * as React from 'react';
import type { Breakpoint, PresentationValue, ResponsivePresentation } from './shell.types.js';
import { BREAKPOINTS } from './shell.types.js';
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

    const bpKeys = Object.keys(BREAKPOINTS) as Array<keyof typeof BREAKPOINTS>;
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
