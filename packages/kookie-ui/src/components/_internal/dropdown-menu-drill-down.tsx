'use client';

import * as React from 'react';
import { breakpoints } from '../../props/prop-def.js';
import type { Breakpoint, Responsive } from '../../props/prop-def.js';
import type { submenuBehaviors } from './base-menu.props.js';

type SubmenuBehavior = (typeof submenuBehaviors)[number];

// Breakpoint min-widths matching breakpoints.css
const BREAKPOINT_VALUES: Record<Exclude<Breakpoint, 'initial'>, number> = {
  xs: 520,
  sm: 768,
  md: 1024,
  lg: 1280,
  xl: 1640,
};

/**
 * Hook to get the current breakpoint based on window width.
 * Returns 'initial' on the server and during initial hydration.
 */
function useBreakpoint(): { breakpoint: Breakpoint; ready: boolean } {
  const [currentBp, setCurrentBp] = React.useState<Breakpoint>('initial');
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const bpKeys = breakpoints.filter((bp) => bp !== 'initial') as Exclude<Breakpoint, 'initial'>[];
    const queries = bpKeys.map((k) => [k, `(min-width: ${BREAKPOINT_VALUES[k]}px)`] as const);
    const mqls = queries.map(([k, q]) => [k, window.matchMedia(q)] as const);

    const compute = () => {
      // Highest matched breakpoint wins
      const matched = mqls.filter(([, m]) => m.matches).map(([k]) => k);
      const next = (matched[matched.length - 1] as Breakpoint | undefined) ?? 'initial';
      setCurrentBp(next);
      setReady(true);
    };

    compute();

    const cleanups: Array<() => void> = [];
    mqls.forEach(([, m]) => {
      const mm = m as MediaQueryList & {
        addEventListener?: (type: 'change', listener: () => void) => void;
        removeEventListener?: (type: 'change', listener: () => void) => void;
        addListener?: (listener: () => void) => void;
        removeListener?: (listener: () => void) => void;
      };
      if (typeof mm.addEventListener === 'function') {
        mm.addEventListener('change', compute);
        cleanups.push(() => mm.removeEventListener?.('change', compute));
      } else if (typeof mm.addListener === 'function') {
        mm.addListener(compute);
        cleanups.push(() => mm.removeListener?.(compute));
      }
    });

    return () => {
      cleanups.forEach((fn) => {
        try {
          fn();
        } catch {}
      });
    };
  }, []);

  return { breakpoint: currentBp, ready };
}

/**
 * Resolves a responsive value to its current value based on the breakpoint.
 * Falls back through smaller breakpoints if the current one isn't defined.
 */
function resolveResponsiveValue<T>(
  value: T | Partial<Record<Breakpoint, T>> | undefined,
  currentBreakpoint: Breakpoint,
  defaultValue: T
): T {
  if (value === undefined || value === null) {
    return defaultValue;
  }

  // Non-object values are returned directly
  if (typeof value !== 'object') {
    return value;
  }

  const map = value as Partial<Record<Breakpoint, T>>;

  // Check if current breakpoint has a value
  if (map[currentBreakpoint] !== undefined) {
    return map[currentBreakpoint] as T;
  }

  // Fall back through smaller breakpoints
  const bpOrder: Breakpoint[] = ['xl', 'lg', 'md', 'sm', 'xs', 'initial'];
  const startIdx = bpOrder.indexOf(currentBreakpoint);

  for (let i = startIdx + 1; i < bpOrder.length; i++) {
    const bp = bpOrder[i];
    if (map[bp] !== undefined) {
      return map[bp] as T;
    }
  }

  return defaultValue;
}

// ============================================================================
// DrillDown Context
// ============================================================================

interface DrillDownContextValue {
  /** Current submenu behavior mode */
  behavior: SubmenuBehavior;
  /** Whether the breakpoint has been resolved (client-side only) */
  ready: boolean;
  /** Stack of active submenu IDs. Empty means root menu is shown. */
  stack: string[];
  /** Navigate into a submenu */
  push: (id: string) => void;
  /** Navigate back to parent menu */
  pop: () => void;
  /** Reset to root menu */
  reset: () => void;
  /** Check if a specific submenu is the currently active one */
  isActive: (id: string) => boolean;
  /** Check if we're at root level (no submenus open) */
  isRoot: boolean;
  /** The currently active submenu ID (or null if at root) */
  currentId: string | null;
}

const DrillDownContext = React.createContext<DrillDownContextValue | null>(null);

interface DrillDownProviderProps {
  children: React.ReactNode;
  submenuBehavior: Responsive<SubmenuBehavior> | undefined;
}

function DrillDownProvider({ children, submenuBehavior }: DrillDownProviderProps) {
  const { breakpoint, ready } = useBreakpoint();
  const [stack, setStack] = React.useState<string[]>([]);

  // Resolve the current behavior based on breakpoint
  const behavior = React.useMemo(
    () => resolveResponsiveValue(submenuBehavior, breakpoint, 'cascade'),
    [submenuBehavior, breakpoint]
  );

  // Reset stack when behavior changes from drill-down to cascade
  const prevBehaviorRef = React.useRef(behavior);
  React.useEffect(() => {
    if (prevBehaviorRef.current === 'drill-down' && behavior === 'cascade') {
      setStack([]);
    }
    prevBehaviorRef.current = behavior;
  }, [behavior]);

  const push = React.useCallback((id: string) => {
    setStack((prev) => [...prev, id]);
  }, []);

  const pop = React.useCallback(() => {
    setStack((prev) => prev.slice(0, -1));
  }, []);

  const reset = React.useCallback(() => {
    setStack([]);
  }, []);

  const isActive = React.useCallback(
    (id: string) => {
      if (stack.length === 0) return false;
      return stack[stack.length - 1] === id;
    },
    [stack]
  );

  const value = React.useMemo(
    (): DrillDownContextValue => ({
      behavior,
      ready,
      stack,
      push,
      pop,
      reset,
      isActive,
      isRoot: stack.length === 0,
      currentId: stack.length > 0 ? stack[stack.length - 1] : null,
    }),
    [behavior, ready, stack, push, pop, reset, isActive]
  );

  return <DrillDownContext.Provider value={value}>{children}</DrillDownContext.Provider>;
}

function useDrillDown() {
  const ctx = React.useContext(DrillDownContext);
  if (!ctx) {
    throw new Error('useDrillDown must be used within a DropdownMenu.Content');
  }
  return ctx;
}

/**
 * Hook to check if drill-down context is available (i.e., we're inside Content)
 */
function useDrillDownOptional() {
  return React.useContext(DrillDownContext);
}

// ============================================================================
// Sub Context (for individual submenu instances)
// ============================================================================

interface SubContextValue {
  /** Unique ID for this submenu */
  id: string;
  /** Label for the back button */
  label: React.ReactNode;
}

const SubContext = React.createContext<SubContextValue | null>(null);

function useSubContext() {
  return React.useContext(SubContext);
}

export {
  DrillDownProvider,
  DrillDownContext,
  SubContext,
  useDrillDown,
  useDrillDownOptional,
  useSubContext,
  useBreakpoint,
  resolveResponsiveValue,
};

export type { SubmenuBehavior, DrillDownContextValue, SubContextValue };
