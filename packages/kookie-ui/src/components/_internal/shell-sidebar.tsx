import * as React from 'react';
import classNames from 'classnames';
import * as Sheet from '../sheet.js';
import { VisuallyHidden } from '../visually-hidden.js';
import { useShell } from '../shell.context.js';
import { useResponsivePresentation, useResponsiveValue } from '../shell.hooks.js';
import { PaneResizeContext } from './shell-resize.js';
import { SidebarHandle, PaneHandle } from './shell-handles.js';
import type { Breakpoint, PaneMode, PaneSizePersistence, ResponsivePresentation, SidebarMode, Responsive } from '../shell.types.js';
import { _BREAKPOINTS } from '../shell.types.js';

interface PaneProps extends React.ComponentPropsWithoutRef<'div'> {
  presentation?: ResponsivePresentation;
  mode?: PaneMode;
  defaultMode?: any;
  onModeChange?: (mode: PaneMode | SidebarMode) => void;
  expandedSize?: number;
  minSize?: number;
  maxSize?: number;
  resizable?: boolean;
  collapsible?: boolean;
  onExpand?: () => void;
  onCollapse?: () => void;
  onResize?: (size: number) => void;
  resizer?: React.ReactNode;
  onResizeStart?: (size: number) => void;
  onResizeEnd?: (size: number) => void;
  snapPoints?: number[];
  snapTolerance?: number;
  collapseThreshold?: number;
  paneId?: string;
  persistence?: PaneSizePersistence;
}

type SidebarStateChangeMeta = { reason: 'init' | 'toggle' | 'responsive' };
type SidebarControlledProps = { state: Responsive<SidebarMode>; onStateChange?: (state: SidebarMode, meta: SidebarStateChangeMeta) => void; defaultState?: never };
type SidebarUncontrolledProps = { defaultState?: SidebarMode | Partial<Record<Breakpoint, SidebarMode>>; onStateChange?: (state: SidebarMode, meta: SidebarStateChangeMeta) => void; state?: never };
type SidebarPublicProps = Omit<PaneProps, 'mode' | 'defaultMode' | 'onModeChange'> & {
  // removed legacy mode props
  thinSize?: number;
  toggleModes?: 'both' | 'single';
  // size API (width when expanded)
  size?: number | string;
  defaultSize?: number | string;
  onSizeChange?: (size: number, meta: { reason: 'init' | 'resize' | 'controlled' }) => void;
  sizeUpdate?: 'throttle' | 'debounce';
  sizeUpdateMs?: number;
} & (SidebarControlledProps | SidebarUncontrolledProps);

type SidebarComponent = React.ForwardRefExoticComponent<SidebarPublicProps & React.RefAttributes<HTMLDivElement>> & { Handle: typeof SidebarHandle };

export const Sidebar = React.forwardRef<HTMLDivElement, SidebarPublicProps>(
  (
    {
      className,
      presentation = { initial: 'overlay', md: 'fixed' },
      // removed legacy props
      expandedSize = 288,
      minSize = 200,
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
      thinSize = 64,
      toggleModes,
      // new state props (XOR)
      state,
      defaultState,
      onStateChange,
      ...props
    },
    ref,
  ) => {
    const shell = useShell();
    const resolvedPresentation = useResponsivePresentation(presentation);
    const isOverlay = resolvedPresentation === 'overlay';
    const isStacked = resolvedPresentation === 'stacked';
    // Phase sequencing is now CSS-driven; no JS-managed phase
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
    const handleChildren = childArray.filter((el: React.ReactElement) => React.isValidElement(el) && el.type === SidebarHandle);
    const contentChildren = childArray.filter((el: React.ReactElement) => !(React.isValidElement(el) && el.type === SidebarHandle));

    // Throttled/debounced emitter for onSizeChange
    const onSizeChange = (props as any).onSizeChange;
    const sizeUpdate = (props as any).sizeUpdate;
    const sizeUpdateMs = (props as any).sizeUpdateMs;
    const emitSizeChange = React.useMemo(() => {
      const cb = onSizeChange as undefined | ((s: number, meta: { reason: 'init' | 'resize' | 'controlled' }) => void);
      const strategy = sizeUpdate as undefined | 'throttle' | 'debounce';
      const ms = sizeUpdateMs ?? 50;
      if (!cb) return () => {};
      if (strategy === 'debounce') {
        let t: any = null;
        return (s: number, meta: { reason: 'init' | 'resize' | 'controlled' }) => {
          if (t) clearTimeout(t);
          t = setTimeout(() => {
            cb(s, meta);
          }, ms);
        };
      }
      if (strategy === 'throttle') {
        let last = 0;
        return (s: number, meta: { reason: 'init' | 'resize' | 'controlled' }) => {
          const now = Date.now();
          if (now - last >= ms) {
            last = now;
            cb(s, meta);
          }
        };
      }
      return (s: number, meta: { reason: 'init' | 'resize' | 'controlled' }) => cb(s, meta);
    }, [onSizeChange, sizeUpdate, sizeUpdateMs]);

    // Register with shell
    const sidebarId = React.useId();
    React.useEffect(() => {
      shell.setHasSidebar(true);
      return () => {
        shell.setHasSidebar(false);
      };
    }, [shell, sidebarId]);

    // Dev guards
    const wasControlledRef = React.useRef<boolean | null>(null);
    if (process.env.NODE_ENV !== 'production') {
      if (typeof state !== 'undefined' && typeof defaultState !== 'undefined') {
        console.error('Shell.Sidebar: Do not pass both `state` and `defaultState`. Choose one.');
      }
      if (typeof (props as any).size !== 'undefined' && typeof (props as any).defaultSize !== 'undefined') {
        console.error('Shell.Sidebar: Do not pass both `size` and `defaultSize`. Choose one.');
      }
    }

    // Warn on mode switch between controlled/uncontrolled
    React.useEffect(() => {
      const isControlled = typeof state !== 'undefined';
      if (wasControlledRef.current === null) {
        wasControlledRef.current = isControlled;
        return;
      }
      if (wasControlledRef.current !== isControlled) {
        console.warn('Shell.Sidebar: Switching between controlled and uncontrolled `state` is not supported.');
        wasControlledRef.current = isControlled;
      }
    }, [state]);

    // Resolve responsive controlled state at top level
    const resolvedState = useResponsiveValue(state);
    const resolvedDefaultState = useResponsiveValue(defaultState as any);

    // Honor state/defaultState on mount when uncontrolled
    const didInitRef = React.useRef(false);
    React.useEffect(() => {
      if (didInitRef.current) return;
      if (!shell.currentBreakpointReady) return;
      didInitRef.current = true;
      // Controlled state may be responsive; use resolved value
      if (typeof state !== 'undefined' && resolvedState) {
        if (shell.sidebarMode !== resolvedState) shell.setSidebarMode(resolvedState);
        return;
      }
      if (typeof defaultState !== 'undefined') {
        const initialState = (resolvedDefaultState ?? defaultState) as SidebarMode;
        if (shell.sidebarMode !== initialState) {
          shell.setSidebarMode(initialState);
        }
        onStateChange?.(initialState, { reason: 'init' });
        return;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shell.currentBreakpointReady, resolvedDefaultState, resolvedState, state, defaultState]);

    // Sync controlled state (responsive-aware)
    React.useEffect(() => {
      if (resolvedState === undefined) return;
      if (shell.sidebarMode !== resolvedState) shell.setSidebarMode(resolvedState);
    }, [shell, resolvedState]);

    // Emit mode changes
    const lastNotifyModeRef = React.useRef<SidebarMode | null>(null);
    React.useEffect(() => {
      // notify new API when uncontrolled; skip first run to avoid masking init
      if (typeof state === 'undefined') {
        if (lastNotifyModeRef.current === null) {
          lastNotifyModeRef.current = shell.sidebarMode as SidebarMode;
        } else if (lastNotifyModeRef.current !== shell.sidebarMode) {
          lastNotifyModeRef.current = shell.sidebarMode as SidebarMode;
          onStateChange?.(shell.sidebarMode as SidebarMode, { reason: 'toggle' });
        }
      }
    }, [shell.sidebarMode, state, onStateChange]);

    // Emit expand/collapse events
    React.useEffect(() => {
      if (shell.sidebarMode === 'expanded') {
        onExpand?.();
      } else {
        onCollapse?.();
      }
    }, [shell.sidebarMode, onExpand, onCollapse]);

    // Option A: thin is width-only; content remains visible whenever not collapsed
    const isContentVisible = shell.sidebarMode !== 'collapsed';

    // Default persistence if paneId provided and none supplied (fixed only)
    const persistenceAdapter = React.useMemo(() => {
      if (!paneId || persistence) return persistence;
      const key = `kookie-ui:shell:sidebar:${paneId}`;
      const adapter: PaneSizePersistence = {
        load: () => {
          if (typeof window === 'undefined') return undefined;
          const v = window.localStorage.getItem(key);
          return v ? Number(v) : undefined;
        },
        save: (size: number) => {
          if (typeof window === 'undefined') return;
          window.localStorage.setItem(key, String(size));
        },
      };
      return adapter;
    }, [paneId, persistence]);

    React.useEffect(() => {
      let mounted = true;
      (async () => {
        if (!resizable || !persistenceAdapter?.load || isOverlay) return;
        const loaded = await persistenceAdapter.load();
        if (mounted && typeof loaded === 'number' && localRef.current) {
          localRef.current.style.setProperty('--sidebar-size', `${loaded}px`);
          onResize?.(loaded);
        }
      })();
      return () => {
        mounted = false;
      };
    }, [resizable, persistenceAdapter, onResize, isOverlay]);

    // Register custom toggle behavior based on toggleModes (both|single)
    const shellForToggle = useShell();
    const resolveDefaultSidebarMode = React.useCallback((): SidebarMode => {
      const resolved = defaultState ?? 'expanded';
      return resolved === 'thin' || resolved === 'expanded' ? resolved : 'expanded';
    }, [defaultState]);

    React.useEffect(() => {
      if (!shellForToggle.setSidebarToggleComputer) return;
      const strategy: 'both' | 'single' = toggleModes ?? 'both';
      const compute = (current: SidebarMode): SidebarMode => {
        if (strategy === 'both') {
          if (current === 'collapsed') return 'thin';
          if (current === 'thin') return 'expanded';
          return 'collapsed';
        }
        const target = resolveDefaultSidebarMode();
        if (current === 'collapsed') return target;
        if (current === target) return 'collapsed';
        return target;
      };
      shellForToggle.setSidebarToggleComputer(compute);
      return () => {
        shellForToggle.setSidebarToggleComputer?.((cur) => (cur === 'collapsed' ? 'thin' : cur === 'thin' ? 'expanded' : 'collapsed'));
      };
    }, [shellForToggle, toggleModes, resolveDefaultSidebarMode]);

    const lastOverlayWidthRef = React.useRef<number>(expandedSize);
    const lastOverlayModeRef = React.useRef<SidebarMode>('expanded');
    React.useEffect(() => {
      if (shell.sidebarMode !== 'collapsed') {
        lastOverlayModeRef.current = shell.sidebarMode as SidebarMode;
        lastOverlayWidthRef.current = shell.sidebarMode === 'thin' ? thinSize : expandedSize;
      }
    }, [shell.sidebarMode, thinSize, expandedSize]);

    // Remove responsive default mode behavior entirely

    const handleEl =
      resizable && !isOverlay && shell.sidebarMode === 'expanded' ? (
        <PaneResizeContext.Provider
          value={{
            containerRef: localRef,
            cssVarName: '--sidebar-size',
            minSize,
            maxSize,
            defaultSize: expandedSize,
            orientation: 'vertical',
            edge: 'end',
            computeNext: (client, startClient, startSize) => {
              const isRtl = getComputedStyle(localRef.current!).direction === 'rtl';
              const delta = client - startClient;
              return startSize + (isRtl ? -delta : delta);
            },
            onResize,
            onResizeStart,
            onResizeEnd: (size) => {
              onResizeEnd?.(size);
              emitSizeChange(size, { reason: 'resize' });
              persistenceAdapter?.save?.(size);
            },
            target: 'sidebar',
            collapsible,
            snapPoints,
            snapTolerance: snapTolerance ?? 8,
            collapseThreshold,
            requestCollapse: () => shell.setSidebarMode('collapsed'),
            requestToggle: () => shell.togglePane('sidebar'),
          }}
        >
          {handleChildren.length > 0 ? handleChildren.map((el, i) => React.cloneElement(el, { key: el.key ?? i })) : <PaneHandle />}
        </PaneResizeContext.Provider>
      ) : null;

    // Strip new API props from DOM
    const { state: _s, defaultState: _ds, onStateChange: _osc, size: _sz, defaultSize: _dsz, onSizeChange: _onsc, sizeUpdate: _szu, sizeUpdateMs: _szums, ...domProps } = props as any;

    // Normalize CSS lengths to px
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
        const base = document.documentElement.clientWidth || window.innerWidth || 0;
        return (pct / 100) * base;
      }
      const n = Number.parseFloat(str);
      return Number.isFinite(n) ? n : undefined;
    }, []);

    // Apply defaultSize on mount when uncontrolled
    React.useEffect(() => {
      if (!localRef.current) return;
      const { size, defaultSize } = props as any;
      if (typeof size === 'undefined' && typeof defaultSize !== 'undefined') {
        const px = normalizeToPx(defaultSize);
        if (typeof px === 'number' && Number.isFinite(px)) {
          const minPx = typeof minSize === 'number' ? minSize : undefined;
          const maxPx = typeof maxSize === 'number' ? maxSize : undefined;
          const clamped = Math.min(maxPx ?? px, Math.max(minPx ?? px, px));
          localRef.current.style.setProperty('--sidebar-size', `${clamped}px`);
          emitSizeChange(clamped, { reason: 'init' });
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Controlled size sync
    const controlledSize = (props as any).size;
    React.useEffect(() => {
      if (!localRef.current) return;
      if (typeof controlledSize === 'undefined') return;
      const px = normalizeToPx(controlledSize);
      if (typeof px === 'number' && Number.isFinite(px)) {
        const minPx = typeof minSize === 'number' ? minSize : undefined;
        const maxPx = typeof maxSize === 'number' ? maxSize : undefined;
        const clamped = Math.min(maxPx ?? px, Math.max(minPx ?? px, px));
        localRef.current.style.setProperty('--sidebar-size', `${clamped}px`);
        emitSizeChange(clamped, { reason: 'controlled' });
      }
    }, [controlledSize, minSize, maxSize, normalizeToPx, emitSizeChange]);

    if (isOverlay) {
      const open = shell.sidebarMode !== 'collapsed';
      return (
        <Sheet.Root open={open} onOpenChange={(o) => shell.setSidebarMode(o ? 'expanded' : 'collapsed')}>
          <Sheet.Content
            side="start"
            style={{ padding: 0 }}
            width={{
              initial: `${open ? (shell.sidebarMode === 'thin' ? thinSize : expandedSize) : lastOverlayWidthRef.current}px`,
            }}
          >
            <VisuallyHidden>
              <Sheet.Title>Navigation</Sheet.Title>
            </VisuallyHidden>
            {contentChildren}
          </Sheet.Content>
        </Sheet.Root>
      );
    }
    return (
      <div
        {...domProps}
        ref={setRef}
        className={classNames('rt-ShellSidebar', className)}
        data-mode={shell.sidebarMode}
        data-peek={shell.peekTarget === 'sidebar' || undefined}
        data-presentation={shell.currentBreakpointReady ? resolvedPresentation : undefined}
        data-open={(shell.currentBreakpointReady && isStacked && isContentVisible) || undefined}
        style={{
          ...style,
          ['--sidebar-size' as any]: `${expandedSize}px`,
          ['--sidebar-thin-size' as any]: `${thinSize}px`,
          ['--sidebar-min-size' as any]: `${minSize}px`,
          ['--sidebar-max-size' as any]: `${maxSize}px`,
          ...(shell.peekTarget === 'sidebar' && shell.sidebarMode === 'collapsed' && !isOverlay
            ? (() => {
                const strategy: 'both' | 'single' = toggleModes ?? 'both';
                const current = shell.sidebarMode as SidebarMode;
                let next: SidebarMode;
                if (strategy === 'both') {
                  next = current === 'collapsed' ? 'thin' : current === 'thin' ? 'expanded' : 'collapsed';
                } else {
                  const target = resolveDefaultSidebarMode();
                  next = current === 'collapsed' ? target : 'collapsed';
                }
                if (next === 'thin') {
                  return {
                    ['--peek-sidebar-width' as any]: `${thinSize}px`,
                  } as React.CSSProperties;
                }
                return {
                  ['--peek-sidebar-width' as any]: `var(--sidebar-size, ${expandedSize}px)`,
                } as React.CSSProperties;
              })()
            : {}),
        }}
      >
        <div className="rt-ShellSidebarContent" data-visible={isContentVisible || undefined}>
          {contentChildren}
        </div>
        {handleEl}
      </div>
    );
  },
) as SidebarComponent;

Sidebar.displayName = 'Shell.Sidebar';
Sidebar.Handle = SidebarHandle;
