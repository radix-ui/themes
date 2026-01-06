import * as React from 'react';
import classNames from 'classnames';
import * as Sheet from '../sheet.js';
import { VisuallyHidden } from '../visually-hidden.js';
import { useShell, useInset } from '../shell.context.js';
import { useResponsivePresentation, useResponsiveInitialState } from '../shell.hooks.js';
import { PaneResizeContext } from './shell-resize.js';
import { InspectorHandle, PaneHandle } from './shell-handles.js';
import { _BREAKPOINTS } from '../shell.types.js';
import type { Breakpoint, PaneMode, PaneSizePersistence, ResponsivePresentation, PaneBaseProps } from '../shell.types.js';
import { extractPaneDomProps, mapResponsiveBooleanToPaneMode } from './shell-prop-helpers.js';
import { normalizeToPx } from '../../helpers/normalize-to-px.js';

type InspectorOpenChangeMeta = { reason: 'init' | 'toggle' | 'responsive' };
type InspectorControlledProps = { open: boolean | Partial<Record<Breakpoint, boolean>>; onOpenChange?: (open: boolean, meta: InspectorOpenChangeMeta) => void; defaultOpen?: never };
type InspectorUncontrolledProps = { defaultOpen?: boolean | Partial<Record<Breakpoint, boolean>>; onOpenChange?: (open: boolean, meta: InspectorOpenChangeMeta) => void; open?: never };
type InspectorSizeChangeMeta = { reason: 'init' | 'resize' | 'controlled' };
type InspectorSizeControlledProps = { size: number | string; defaultSize?: never };
type InspectorSizeUncontrolledProps = { defaultSize?: number | string; size?: never };
type InspectorPublicProps = PaneBaseProps &
  (InspectorControlledProps | InspectorUncontrolledProps) &
  (InspectorSizeControlledProps | InspectorSizeUncontrolledProps) & {
    onSizeChange?: (size: number, meta: InspectorSizeChangeMeta) => void;
    sizeUpdate?: 'throttle' | 'debounce';
    sizeUpdateMs?: number;
    /** When true, adds margin and triggers gray backdrop on Shell. */
    inset?: boolean;
  };

type InspectorComponent = React.ForwardRefExoticComponent<InspectorPublicProps & React.RefAttributes<HTMLDivElement>> & { Handle: typeof InspectorHandle };

const INSPECTOR_DOM_PROP_KEYS = [
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
  'inset',
] as const satisfies readonly (keyof InspectorPublicProps)[];

export const Inspector = React.forwardRef<HTMLDivElement, InspectorPublicProps>((initialProps, ref) => {
  const {
    className,
    presentation = { initial: 'overlay', lg: 'fixed' },
    defaultOpen,
    open,
    onOpenChange,
    expandedSize = 320,
    minSize = 200,
    maxSize = 500,
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
    onSizeChange,
    sizeUpdate,
    sizeUpdateMs = 50,
    size,
    defaultSize,
    inset,
  } = initialProps;
  const inspectorDomProps = extractPaneDomProps(initialProps, INSPECTOR_DOM_PROP_KEYS);
  const shell = useShell();
  const { registerInset, unregisterInset } = useInset();

  // Register/unregister inset
  React.useEffect(() => {
    if (inset) {
      registerInset('inspector');
      return () => unregisterInset('inspector');
    }
  }, [inset, registerInset, unregisterInset]);
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
  const handleChildren = childArray.filter((el: React.ReactElement) => React.isValidElement(el) && el.type === InspectorHandle);
  const contentChildren = childArray.filter((el: React.ReactElement) => !(React.isValidElement(el) && el.type === InspectorHandle));

  // Throttled/debounced emitter for onSizeChange
  const normalizedControlledOpen = React.useMemo(() => mapResponsiveBooleanToPaneMode(open), [open]);
  const normalizedDefaultOpen = React.useMemo(() => mapResponsiveBooleanToPaneMode(defaultOpen), [defaultOpen]);
  const openIsResponsive = typeof open === 'object' && open !== null;
  useResponsiveInitialState<PaneMode>({
    controlledValue: normalizedControlledOpen,
    defaultValue: normalizedDefaultOpen,
    currentValue: shell.inspectorMode,
    setValue: shell.setInspectorMode,
    breakpointReady: shell.currentBreakpointReady,
    controlledIsResponsive: openIsResponsive,
    onResponsiveChange: (next) => onOpenChange?.(next === 'expanded', { reason: 'responsive' }),
    onInit: (initial) => {
      if (typeof open === 'undefined') {
        onOpenChange?.(initial === 'expanded', { reason: 'init' });
      }
    },
  });

  // Ref for debounce cleanup
  const debounceTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  // Cleanup debounce timeout on unmount or when dependencies change
  React.useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
        debounceTimeoutRef.current = null;
      }
    };
  }, [onSizeChange, sizeUpdate, sizeUpdateMs]);
  // Throttled/debounced emitter for onSizeChange
  const emitSizeChange = React.useMemo(() => {
    const cb = onSizeChange as undefined | ((s: number, meta: InspectorSizeChangeMeta) => void);
    const strategy = sizeUpdate as undefined | 'throttle' | 'debounce';
    const ms = sizeUpdateMs ?? 50;
    if (!cb) return () => {};
    if (strategy === 'debounce') {
      return (s: number, meta: InspectorSizeChangeMeta) => {
        if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
        debounceTimeoutRef.current = setTimeout(() => {
          cb(s, meta);
          debounceTimeoutRef.current = null;
        }, ms);
      };
    }
    if (strategy === 'throttle') {
      let last = 0;
      return (s: number, meta: InspectorSizeChangeMeta) => {
        const now = Date.now();
        if (now - last >= ms) {
          last = now;
          cb(s, meta);
        }
      };
    }
    return (s: number, meta: InspectorSizeChangeMeta) => cb(s, meta);
  }, [onSizeChange, sizeUpdate, sizeUpdateMs]);

  // Dev guards
  const wasControlledRef = React.useRef<boolean | null>(null);
  if (process.env.NODE_ENV !== 'production') {
    if (typeof open !== 'undefined' && typeof defaultOpen !== 'undefined') {
      console.error('Shell.Inspector: Do not pass both `open` and `defaultOpen`. Choose one.');
    }
  }

  // Warn on controlled/uncontrolled mode switch
  React.useEffect(() => {
    const isControlled = typeof open !== 'undefined';
    if (wasControlledRef.current === null) {
      wasControlledRef.current = isControlled;
      return;
    }
    if (wasControlledRef.current !== isControlled) {
      console.warn('Shell.Inspector: Switching between controlled and uncontrolled `open` is not supported.');
      wasControlledRef.current = isControlled;
    }
  }, [open]);

  const initNotifiedRef = React.useRef(false);
  const lastInspectorModeRef = React.useRef<PaneMode | null>(null);
  React.useEffect(() => {
    // Notify init open
    if (!initNotifiedRef.current && typeof open === 'undefined' && defaultOpen && shell.inspectorMode === 'expanded') {
      onOpenChange?.(true, { reason: 'init' });
      initNotifiedRef.current = true;
    }

    // Notify toggles when uncontrolled (avoid double-notify after responsive change)
    if (typeof open === 'undefined') {
      if (lastInspectorModeRef.current !== null && lastInspectorModeRef.current !== shell.inspectorMode) {
        onOpenChange?.(shell.inspectorMode === 'expanded', { reason: 'toggle' });
      }
      lastInspectorModeRef.current = shell.inspectorMode;
    }
  }, [shell.inspectorMode, open, defaultOpen, onOpenChange]);

  // Track previous mode to only fire callbacks on actual user-initiated state transitions.
  // We wait for breakpointReady to ensure the initial state sync from useResponsiveInitialState
  // is complete before enabling callbacks. This avoids spurious callbacks during initialization.
  // Use callback refs to avoid re-running effect when inline callbacks change.
  const onExpandRef = React.useRef(onExpand);
  const onCollapseRef = React.useRef(onCollapse);
  React.useLayoutEffect(() => {
    onExpandRef.current = onExpand;
    onCollapseRef.current = onCollapse;
  });

  const prevInspectorModeRef = React.useRef<PaneMode | null>(null);
  const hasInitializedRef = React.useRef(false);
  React.useEffect(() => {
    const currentMode = shell.inspectorMode;

    // Wait for breakpoint to be ready before enabling callbacks
    if (!shell.currentBreakpointReady) {
      prevInspectorModeRef.current = currentMode;
      return;
    }

    // Skip the first run after breakpoint is ready - this captures the post-sync state
    if (!hasInitializedRef.current) {
      hasInitializedRef.current = true;
      prevInspectorModeRef.current = currentMode;
      return;
    }

    const prevMode = prevInspectorModeRef.current;

    // Only fire on actual state transitions
    if (prevMode !== null && prevMode !== currentMode) {
      if (currentMode === 'expanded') {
        onExpandRef.current?.();
      } else if (currentMode === 'collapsed') {
        onCollapseRef.current?.();
      }
      prevInspectorModeRef.current = currentMode;
    }
  }, [shell.inspectorMode, shell.currentBreakpointReady]);

  const isExpanded = shell.inspectorMode === 'expanded';

  const persistenceAdapter = React.useMemo(() => {
    if (!paneId || persistence) return persistence;
    const key = `kookie-ui:shell:inspector:${paneId}`;
    const adapter: PaneSizePersistence = {
      load: () => {
        if (typeof window === 'undefined') return undefined;
        try {
          const v = window.localStorage.getItem(key);
          return v ? Number(v) : undefined;
        } catch (err) {
          if (process.env.NODE_ENV !== 'production') {
            console.warn('Shell.Inspector: failed to load persisted size', err);
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
            console.warn('Shell.Inspector: failed to save persisted size', err);
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
      localRef.current.style.setProperty('--inspector-size', `${value}px`);
      onResize?.(value);
    };
    if (loaded instanceof Promise) {
      loaded.then(applyLoaded).catch((err) => {
        if (process.env.NODE_ENV !== 'production') {
          console.warn('Shell.Inspector: failed to load persisted size', err);
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
          cssVarName: '--inspector-size',
          minSize,
          maxSize,
          defaultSize: expandedSize,
          orientation: 'vertical',
          edge: 'start',
          computeNext: (client, startClient, startSize) => {
            const isRtl = getComputedStyle(localRef.current!).direction === 'rtl';
            const delta = client - startClient;
            return startSize + (isRtl ? delta : -delta);
          },
          onResize,
          onResizeStart,
          onResizeEnd: (size) => {
            onResizeEnd?.(size);
            emitSizeChange(size, { reason: 'resize' });
            persistenceAdapter?.save?.(size);
          },
          target: 'inspector',
          collapsible,
          snapPoints,
          snapTolerance: snapTolerance ?? 8,
          collapseThreshold,
          requestCollapse: () => shell.setInspectorMode('collapsed'),
          requestToggle: () => shell.togglePane('inspector'),
        }}
      >
        {handleChildren.length > 0 ? handleChildren.map((el, i) => React.cloneElement(el, { key: el.key ?? i })) : <PaneHandle />}
      </PaneResizeContext.Provider>
    ) : null;

  // Normalize CSS lengths to px helper
  const normalizeSizeToPx = React.useCallback((value: number | string | undefined) => normalizeToPx(value, 'horizontal'), []);

  // Apply defaultSize on mount when uncontrolled
  React.useEffect(() => {
    if (!localRef.current) return;
    if (typeof size === 'undefined' && typeof defaultSize !== 'undefined') {
      const px = normalizeSizeToPx(defaultSize);
      if (typeof px === 'number' && Number.isFinite(px)) {
        const minPx = typeof minSize === 'number' ? minSize : undefined;
        const maxPx = typeof maxSize === 'number' ? maxSize : undefined;
        const clamped = Math.min(maxPx ?? px, Math.max(minPx ?? px, px));
        localRef.current.style.setProperty('--inspector-size', `${clamped}px`);
        emitSizeChange(clamped, { reason: 'init' });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Controlled size sync
  const controlledSize = size;
  React.useEffect(() => {
    if (!localRef.current) return;
    if (typeof controlledSize === 'undefined') return;
    const px = normalizeSizeToPx(controlledSize);
    if (typeof px === 'number' && Number.isFinite(px)) {
      const minPx = typeof minSize === 'number' ? minSize : undefined;
      const maxPx = typeof maxSize === 'number' ? maxSize : undefined;
      const clamped = Math.min(maxPx ?? px, Math.max(minPx ?? px, px));
      localRef.current.style.setProperty('--inspector-size', `${clamped}px`);
      emitSizeChange(clamped, { reason: 'controlled' });
    }
  }, [controlledSize, minSize, maxSize, normalizeSizeToPx, emitSizeChange]);

  if (isOverlay) {
    const open = shell.inspectorMode === 'expanded';
    return (
      <Sheet.Root open={open} onOpenChange={(o) => shell.setInspectorMode(o ? 'expanded' : 'collapsed')}>
        <Sheet.Content side="end" style={{ padding: 0 }} width={{ initial: `${expandedSize}px` }}>
          <VisuallyHidden>
            <Sheet.Title>Inspector</Sheet.Title>
          </VisuallyHidden>
          {contentChildren}
        </Sheet.Content>
      </Sheet.Root>
    );
  }

  // Strip control/size props from DOM spread
  return (
    <div
      {...inspectorDomProps}
      ref={setRef}
      className={classNames('rt-ShellInspector', className)}
      data-mode={shell.inspectorMode}
      data-peek={shell.peekTarget === 'inspector' || undefined}
      data-presentation={shell.currentBreakpointReady ? resolvedPresentation : undefined}
      data-open={(shell.currentBreakpointReady && isStacked && isExpanded) || undefined}
      data-inset={inset || undefined}
      style={{
        ...style,
        ['--inspector-size' as any]: `${expandedSize}px`,
        ['--inspector-min-size' as any]: `${minSize}px`,
        ['--inspector-max-size' as any]: `${maxSize}px`,
      }}
    >
      <div className="rt-ShellInspectorContent" data-visible={isExpanded || undefined}>
        {contentChildren}
      </div>
      {handleEl}
    </div>
  );
}) as InspectorComponent;

Inspector.displayName = 'Shell.Inspector';
Inspector.Handle = InspectorHandle;
