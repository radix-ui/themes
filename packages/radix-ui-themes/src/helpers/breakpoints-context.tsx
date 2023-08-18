'use client';

import * as React from 'react';
import { Breakpoints } from './breakpoints';

type BreakpointsContextType = { [bp in Breakpoints]: boolean };
const BreakpointsContext = React.createContext<BreakpointsContextType | undefined>(undefined);

type BreakpointsProviderProps = React.PropsWithChildren<{ breakpoints: Record<Breakpoints, number> }>;
const BreakpointsProvider: React.FC<BreakpointsProviderProps> = ({children, breakpoints}) => {
  const initalState = Object.entries(breakpoints)
    .map(([bp, size]) => ({ [bp]: size === 0 }))
    .reduce((acc, value) => ({ ...acc, ...value }), {}) as BreakpointsContextType;
  const [queryMatch, setQueryMatch] = React.useState<BreakpointsContextType>(initalState);

  React.useEffect(() => {
    if (!window || !window.matchMedia) return;

    const keys = Object.keys(breakpoints) as Breakpoints[];
    const mediaQueryLists = {} as Record<Breakpoints, MediaQueryList | undefined>;

    const handleQueryListener = () => {
      const updatedMatches = keys.reduce((acc, media) => {
        acc[media] = !!(mediaQueryLists[media] && mediaQueryLists[media]?.matches);
        return acc;
      }, {} as Record<Breakpoints, boolean>);
      setQueryMatch(updatedMatches)
    }

    const matches = keys.reduce((acc, bp) => {
      const size = breakpoints[bp];
      if (typeof size === 'number') {
        const query = window.matchMedia(`(min-width: ${size}px)`);
        query.addEventListener('change', handleQueryListener);

        mediaQueryLists[bp] = query;
        acc[bp] = query.matches;
      } else {
        acc[bp] = false;
      }
      return acc;
    }, {} as BreakpointsContextType);

    setQueryMatch(matches);

    return () => {
      keys.forEach(bp => {
        const query = mediaQueryLists[bp];
        if (query) {
          query.removeEventListener('change', handleQueryListener)
        }
      });
    }
  }, [breakpoints]);

  return (
    <BreakpointsContext.Provider value={queryMatch}>
      {children}
    </BreakpointsContext.Provider>
  );
}

function useBreakpoints(): BreakpointsContextType {
  const context = React.useContext(BreakpointsContext);
  if (!context) {
    return {} as BreakpointsContextType;
  }
  return context;
}

export { BreakpointsContextType, BreakpointsProvider, useBreakpoints };
