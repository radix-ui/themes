import * as React from 'react';
import type { Breakpoint, PresentationValue, ResponsivePresentation } from './shell.types.js';
import { _BREAKPOINTS } from './shell.types.js';
import { useShell } from './shell.context.js';

function useResponsivePresentation(presentation: ResponsivePresentation): PresentationValue {
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
function useResponsiveValue<T>(value: T | Partial<Record<Breakpoint, T>> | undefined): T | undefined {
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

type ResponsiveStateValue<T> = T | Partial<Record<Breakpoint, T>>;

interface UseResponsiveInitialStateOptions<T> {
  controlledValue?: ResponsiveStateValue<T>;
  defaultValue?: ResponsiveStateValue<T>;
  currentValue: T;
  setValue: (value: T) => void;
  breakpointReady: boolean;
  onInit?: (value: T) => void;
  onResponsiveChange?: (value: T) => void;
  controlledIsResponsive?: boolean;
}

interface UseResponsiveInitialStateResult<T> {
  resolvedControlled?: T;
  resolvedDefault?: T;
}

function useResponsiveInitialState<T>({
  controlledValue,
  defaultValue,
  currentValue,
  setValue,
  breakpointReady,
  onInit,
  onResponsiveChange,
  controlledIsResponsive = false,
}: UseResponsiveInitialStateOptions<T>): UseResponsiveInitialStateResult<T> {
  const resolvedControlled = useResponsiveValue(controlledValue);
  const resolvedDefault = useResponsiveValue(defaultValue);

  const lastControlledRef = React.useRef<T | undefined>(undefined);
  React.useEffect(() => {
    if (resolvedControlled === undefined) return;
    lastControlledRef.current = resolvedControlled;
    if (currentValue === resolvedControlled) {
      if (controlledIsResponsive) {
        onResponsiveChange?.(resolvedControlled);
      }
      return;
    }
    setValue(resolvedControlled);
    if (controlledIsResponsive) {
      onResponsiveChange?.(resolvedControlled);
    }
  }, [resolvedControlled, currentValue, setValue, onResponsiveChange, controlledIsResponsive]);

  const didInitRef = React.useRef(false);
  React.useEffect(() => {
    if (didInitRef.current) return;
    if (!breakpointReady) return;
    if (typeof controlledValue !== 'undefined') return;
    if (resolvedDefault === undefined) return;
    didInitRef.current = true;
    if (currentValue !== resolvedDefault) {
      setValue(resolvedDefault);
    }
    onInit?.(resolvedDefault);
  }, [breakpointReady, controlledValue, resolvedDefault, currentValue, setValue, onInit]);

  return { resolvedControlled, resolvedDefault };
}

export { useResponsivePresentation, useResponsiveValue, useResponsiveInitialState };
