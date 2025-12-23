import * as React from 'react';
import classNames from 'classnames';
import * as Sheet from '../sheet.js';
import { VisuallyHidden } from '../visually-hidden.js';
import { useShell } from '../shell.context.js';
import { useResponsivePresentation, useResponsiveInitialState } from '../shell.hooks.js';
import { PaneResizeContext } from './shell-resize.js';
import { BottomHandle, PaneHandle } from './shell-handles.js';
import { _BREAKPOINTS } from '../shell.types.js';
import type { Breakpoint, PaneMode, PaneSizePersistence, ResponsivePresentation, PaneBaseProps } from '../shell.types.js';
import { extractPaneDomProps, mapResponsiveBooleanToPaneMode } from './shell-prop-helpers.js';

type BottomOpenChangeMeta = { reason: 'init' | 'toggle' | 'responsive' };
type BottomControlledProps = { open: boolean | Partial<Record<Breakpoint, boolean>>; onOpenChange?: (open: boolean, meta: BottomOpenChangeMeta) => void; defaultOpen?: never };
type BottomUncontrolledProps = { defaultOpen?: boolean; onOpenChange?: (open: boolean, meta: BottomOpenChangeMeta) => void; open?: never };
type BottomSizeControlledProps = { size: number | string; defaultSize?: never };
type BottomSizeUncontrolledProps = { defaultSize?: number | string; size?: never };
type BottomSizeChangeMeta = { reason: 'init' | 'resize' | 'controlled' };
type BottomPublicProps = PaneBaseProps &
  (BottomControlledProps | BottomUncontrolledProps) &
  (BottomSizeControlledProps | BottomSizeUncontrolledProps) & {
    onSizeChange?: (size: number, meta: BottomSizeChangeMeta) => void;
    sizeUpdate?: 'throttle' | 'debounce';
    sizeUpdateMs?: number;
  };

type BottomComponent = React.ForwardRefExoticComponent<BottomPublicProps & React.RefAttributes<HTMLDivElement>> & { Handle: typeof BottomHandle };

const BOTTOM_DOM_PROP_KEYS = [
  'className',
  'children',
  'defaultOpen',
  'open',
  'onOpenChange',
  'size',
  'defaultSize',
  'onSizeChange',
  'sizeUpdate',
  'sizeUpdateMs',
  'style',
] as const satisfies readonly (keyof BottomPublicProps)[];

export const Bottom = React.forwardRef<HTMLDivElement, BottomPublicProps>((initialProps, ref) => {
  const {
    className,
    presentation = 'fixed',
    defaultOpen,
    open,
    onOpenChange,
    expandedSize = 200,
    minSize = 100,
    maxSize = 400,
    resizable = false,
    collapsible = true,
    onExpand,
    onCollapse,
    onResize,
    onResizeStart,
    onResizeEnd,
    snapPoints,
    snapTolerance,
    collapseThreshold,
    paneId,
    persistence,
    children,
    style,
    size,
    defaultSize,
    onSizeChange,
    sizeUpdate,
    sizeUpdateMs = 50,
  } = initialProps;
  const bottomDomProps = extractPaneDomProps(initialProps, BOTTOM_DOM_PROP_KEYS);
  const shell = useShell();
  const resolvedPresentation = useResponsivePresentation(presentation);
  const isOverlay = resolvedPresentation === 'overlay';
  const isStacked = resolvedPresentation === 'stacked';
  const localRef = React.useRef<HTMLDivElement | null>(null);
  const setRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      localRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [ref],
  );
  const childArray = React.Children.toArray(children) as React.ReactElement[];
  const handleChildren = childArray.filter((el: React.ReactElement) => React.isValidElement(el) && el.type === BottomHandle);
  const contentChildren = childArray.filter((el: React.ReactElement) => !(React.isValidElement(el) && el.type === BottomHandle));

  // Throttled/debounced emitter for onSizeChange
  const normalizedControlledOpen = React.useMemo(() => mapResponsiveBooleanToPaneMode(open), [open]);
  const normalizedDefaultOpen = React.useMemo(() => mapResponsiveBooleanToPaneMode(defaultOpen), [defaultOpen]);
  const openIsResponsive = typeof open === 'object' && open !== null;
  useResponsiveInitialState<PaneMode>({
    controlledValue: normalizedControlledOpen,
    defaultValue: normalizedDefaultOpen,
    currentValue: shell.bottomMode,
    setValue: shell.setBottomMode,
    breakpointReady: shell.currentBreakpointReady,
    controlledIsResponsive: openIsResponsive,
    onResponsiveChange: (next) => onOpenChange?.(next === 'expanded', { reason: 'responsive' }),
    onInit: (initial) => {
      if (typeof open === 'undefined') {
        onOpenChange?.(initial === 'expanded', { reason: 'init' });
      }
    },
  });

  const emitSizeChange = React.useMemo(() => {
    const cb = onSizeChange as undefined | ((s: number, meta: BottomSizeChangeMeta) => void);
    const strategy = sizeUpdate as undefined | 'throttle' | 'debounce';
    const ms = sizeUpdateMs ?? 50;
    if (!cb) return () => {};
    if (strategy === 'debounce') {
      let t: any = null;
      return (s: number, meta: BottomSizeChangeMeta) => {
        if (t) clearTimeout(t);
        t = setTimeout(() => {
          cb(s, meta);
        }, ms);
      };
    }
    if (strategy === 'throttle') {
      let last = 0;
      return (s: number, meta: BottomSizeChangeMeta) => {
        const now = Date.now();
        if (now - last >= ms) {
          last = now;
          cb(s, meta);
        }
      };
    }
    return (s: number, meta: BottomSizeChangeMeta) => cb(s, meta);
  }, [onSizeChange, sizeUpdate, sizeUpdateMs]);

  // Dev guards
  const wasControlledRef = React.useRef<boolean | null>(null);
  if (process.env.NODE_ENV !== 'production') {
    if (typeof open !== 'undefined' && typeof defaultOpen !== 'undefined') {
      console.error('Shell.Bottom: Do not pass both `open` and `defaultOpen`. Choose one.');
    }
    if (typeof size !== 'undefined' && typeof defaultSize !== 'undefined') {
      console.error('Shell.Bottom: Do not pass both `size` and `defaultSize`. Choose one.');
    }
  }

  React.useEffect(() => {
    const isControlled = typeof open !== 'undefined';
    if (wasControlledRef.current === null) {
      wasControlledRef.current = isControlled;
      return;
    }
    if (wasControlledRef.current !== isControlled) {
      console.warn('Shell.Bottom: Switching between controlled and uncontrolled `open` is not supported.');
      wasControlledRef.current = isControlled;
    }
  }, [open]);

  const initNotifiedRef = React.useRef(false);
  const lastBottomModeRef = React.useRef<PaneMode | null>(null);
  React.useEffect(() => {
    if (!initNotifiedRef.current && typeof open === 'undefined' && defaultOpen && shell.bottomMode === 'expanded') {
      onOpenChange?.(true, { reason: 'init' });
      initNotifiedRef.current = true;
    }
    if (typeof open === 'undefined') {
      if (lastBottomModeRef.current !== null && lastBottomModeRef.current !== shell.bottomMode) {
        onOpenChange?.(shell.bottomMode === 'expanded', { reason: 'toggle' });
      }
      lastBottomModeRef.current = shell.bottomMode;
    }
  }, [shell.bottomMode, open, defaultOpen, onOpenChange]);

  // Track previous mode to only fire callbacks on actual user-initiated state transitions.
  // We wait for breakpointReady to ensure the initial state sync from useResponsiveInitialState
  // is complete before enabling callbacks. This avoids spurious callbacks during initialization.
  const prevBottomModeRef = React.useRef<PaneMode | null>(null);
  const hasInitializedRef = React.useRef(false);
  React.useEffect(() => {
    const currentMode = shell.bottomMode;

    // Wait for breakpoint to be ready before enabling callbacks
    if (!shell.currentBreakpointReady) {
      prevBottomModeRef.current = currentMode;
      return;
    }

    // Skip the first run after breakpoint is ready - this captures the post-sync state
    if (!hasInitializedRef.current) {
      hasInitializedRef.current = true;
      prevBottomModeRef.current = currentMode;
      return;
    }

    const prevMode = prevBottomModeRef.current;

    // Only fire on actual state transitions
    if (prevMode !== null && prevMode !== currentMode) {
      if (currentMode === 'expanded') {
        onExpand?.();
      } else if (currentMode === 'collapsed') {
        onCollapse?.();
      }
      prevBottomModeRef.current = currentMode;
    }
  }, [shell.bottomMode, shell.currentBreakpointReady, onExpand, onCollapse]);

  const isExpanded = shell.bottomMode === 'expanded';

  const persistenceAdapter = React.useMemo(() => {
    if (!paneId || persistence) return persistence;
    const key = `kookie-ui:shell:bottom:${paneId}`;
    const adapter: PaneSizePersistence = {
      load: () => {
        if (typeof window === 'undefined') return undefined;
        try {
          const v = window.localStorage.getItem(key);
          return v ? Number(v) : undefined;
        } catch (err) {
          if (process.env.NODE_ENV !== 'production') {
            console.warn('Shell.Bottom: failed to load persisted size', err);
          }
          return undefined;
        }
      },
      save: (size: number) => {
        if (typeof window === 'undefined') return;
        try {
          window.localStorage.setItem(key, String(size));
        } catch (err) {
          if (process.env.NODE_ENV !== 'production') {
            console.warn('Shell.Bottom: failed to save persisted size', err);
          }
        }
      },
    };
    return adapter;
  }, [paneId, persistence]);

  React.useEffect(() => {
    let mounted = true;
    if (!resizable || !persistenceAdapter?.load || isOverlay) return undefined;
    const loaded = persistenceAdapter.load();
    const applyLoaded = (value?: number) => {
      if (!mounted || typeof value !== 'number' || !localRef.current) return;
      localRef.current.style.setProperty('--bottom-size', `${value}px`);
      onResize?.(value);
    };
    if (loaded instanceof Promise) {
      loaded.then(applyLoaded).catch((err) => {
        if (process.env.NODE_ENV !== 'production') {
          console.warn('Shell.Bottom: failed to load persisted size', err);
        }
      });
    } else {
      applyLoaded(loaded);
    }
    return () => {
      mounted = false;
    };
  }, [resizable, persistenceAdapter, onResize, isOverlay]);

  const handleEl =
    resizable && !isOverlay && isExpanded ? (
      <PaneResizeContext.Provider
        value={{
          containerRef: localRef,
          cssVarName: '--bottom-size',
          minSize,
          maxSize,
          defaultSize: expandedSize,
          orientation: 'horizontal',
          edge: 'start',
          computeNext: (client, startClient, startSize) => {
            const delta = client - startClient;
            return startSize - delta;
          },
          onResize,
          onResizeStart,
          onResizeEnd: (size) => {
            onResizeEnd?.(size);
            emitSizeChange(size, { reason: 'resize' });
            persistenceAdapter?.save?.(size);
          },
          target: 'bottom',
          collapsible,
          snapPoints,
          snapTolerance: snapTolerance ?? 8,
          collapseThreshold,
          requestCollapse: () => shell.setBottomMode('collapsed'),
          requestToggle: () => shell.togglePane('bottom'),
        }}
      >
        {handleChildren.length > 0 ? handleChildren.map((el, i) => React.cloneElement(el, { key: el.key ?? i })) : <PaneHandle />}
      </PaneResizeContext.Provider>
    ) : null;

  // Strip control/size props from DOM spread (moved above overlay return to keep hook order consistent)
  // Normalize CSS lengths to px (moved above overlay return to keep hook order consistent)
  const normalizeToPx = React.useCallback((value: number | string | undefined): number | undefined => {
    if (value == null) return undefined;
    if (typeof value === 'number' && Number.isFinite(value)) return value;
    const str = String(value).trim();
    if (!str) return undefined;
    if (str.endsWith('px')) return Number.parseFloat(str);
    if (str.endsWith('rem')) {
      const rem = Number.parseFloat(getComputedStyle(document.documentElement).fontSize || '16') || 16;
      return Number.parseFloat(str) * rem;
    }
    if (str.endsWith('%')) {
      const pct = Number.parseFloat(str);
      const base = document.documentElement.clientHeight || window.innerHeight || 0;
      return (pct / 100) * base;
    }
    const n = Number.parseFloat(str);
    return Number.isFinite(n) ? n : undefined;
  }, []);

  // Apply defaultSize on mount when uncontrolled (moved above overlay return)
  React.useEffect(() => {
    if (!localRef.current) return;
    if (typeof size === 'undefined' && typeof defaultSize !== 'undefined') {
      const px = normalizeToPx(defaultSize);
      if (typeof px === 'number' && Number.isFinite(px)) {
        const minPx = typeof minSize === 'number' ? minSize : undefined;
        const maxPx = typeof maxSize === 'number' ? maxSize : undefined;
        const clamped = Math.min(maxPx ?? px, Math.max(minPx ?? px, px));
        localRef.current.style.setProperty('--bottom-size', `${clamped}px`);
        emitSizeChange(clamped, { reason: 'init' });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Controlled size sync (moved above overlay return)
  const controlledSize = size;
  React.useEffect(() => {
    if (!localRef.current) return;
    if (typeof controlledSize === 'undefined') return;
    const px = normalizeToPx(controlledSize);
    if (typeof px === 'number' && Number.isFinite(px)) {
      const minPx = typeof minSize === 'number' ? minSize : undefined;
      const maxPx = typeof maxSize === 'number' ? maxSize : undefined;
      const clamped = Math.min(maxPx ?? px, Math.max(minPx ?? px, px));
      localRef.current.style.setProperty('--bottom-size', `${clamped}px`);
      emitSizeChange(clamped, { reason: 'controlled' });
    }
  }, [controlledSize, minSize, maxSize, normalizeToPx, emitSizeChange]);

  if (isOverlay) {
    const open = shell.bottomMode === 'expanded';
    return (
      <Sheet.Root open={open} onOpenChange={(o) => shell.setBottomMode(o ? 'expanded' : 'collapsed')}>
        <Sheet.Content side="bottom" style={{ padding: 0 }} height={{ initial: `${expandedSize}px` }}>
          <VisuallyHidden>
            <Sheet.Title>Bottom panel</Sheet.Title>
          </VisuallyHidden>
          {contentChildren}
        </Sheet.Content>
      </Sheet.Root>
    );
  }

  return (
    <div
      {...bottomDomProps}
      ref={setRef}
      className={classNames('rt-ShellBottom', className)}
      data-mode={shell.bottomMode}
      data-peek={shell.peekTarget === 'bottom' || undefined}
      data-presentation={shell.currentBreakpointReady ? resolvedPresentation : undefined}
      data-open={(shell.currentBreakpointReady && isStacked && isExpanded) || undefined}
      style={{
        ...style,
        ['--bottom-size' as any]: `${expandedSize}px`,
        ['--bottom-min-size' as any]: `${minSize}px`,
        ['--bottom-max-size' as any]: `${maxSize}px`,
      }}
    >
      <div className="rt-ShellBottomContent" data-visible={isExpanded || undefined}>
        {contentChildren}
      </div>
      {handleEl}
    </div>
  );
}) as BottomComponent;
Bottom.displayName = 'Shell.Bottom';
Bottom.Handle = BottomHandle;
