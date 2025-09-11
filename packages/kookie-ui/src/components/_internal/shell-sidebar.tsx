import * as React from 'react';
import classNames from 'classnames';
import * as Sheet from '../sheet.js';
import { VisuallyHidden } from '../visually-hidden.js';
import { useShell } from '../shell.context.js';
import { useResponsivePresentation } from '../shell.hooks.js';
import { PaneResizeContext } from './shell-resize.js';
import { SidebarHandle, PaneHandle } from './shell-handles.js';
import type { Breakpoint, PaneMode, PaneSizePersistence, PresentationValue, ResponsivePresentation, ResponsiveSidebarMode, SidebarMode } from '../shell.types.js';
import { BREAKPOINTS } from '../shell.types.js';

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

type SidebarComponent = React.ForwardRefExoticComponent<
  Omit<PaneProps, 'mode' | 'defaultMode' | 'onModeChange'> & {
    mode?: SidebarMode;
    defaultMode?: ResponsiveSidebarMode;
    onModeChange?: (mode: SidebarMode) => void;
    thinSize?: number;
    toggleModes?: 'both' | 'single';
  } & React.RefAttributes<HTMLDivElement>
> & { Handle: typeof SidebarHandle };

export const Sidebar = React.forwardRef<
  HTMLDivElement,
  Omit<PaneProps, 'mode' | 'defaultMode' | 'onModeChange'> & {
    mode?: SidebarMode;
    defaultMode?: ResponsiveSidebarMode;
    onModeChange?: (mode: SidebarMode) => void;
    thinSize?: number;
    toggleModes?: 'both' | 'single';
  }
>(
  (
    {
      className,
      presentation = { initial: 'overlay', md: 'fixed' },
      mode,
      defaultMode = 'expanded',
      onModeChange,
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
      ...props
    },
    ref,
  ) => {
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
    const handleChildren = childArray.filter((el: React.ReactElement) => React.isValidElement(el) && el.type === SidebarHandle);
    const contentChildren = childArray.filter((el: React.ReactElement) => !(React.isValidElement(el) && el.type === SidebarHandle));

    // Register with shell
    const sidebarId = React.useId();
    React.useEffect(() => {
      shell.setHasSidebar(true);
      return () => {
        shell.setHasSidebar(false);
      };
    }, [shell, sidebarId]);

    // Honor defaultMode on mount when uncontrolled
    const didInitRef = React.useRef(false);
    React.useEffect(() => {
      if (didInitRef.current) return;
      didInitRef.current = true;
      if (mode === undefined && shell.sidebarMode !== (defaultMode as SidebarMode)) {
        shell.setSidebarMode(defaultMode as SidebarMode);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Sync controlled mode
    React.useEffect(() => {
      if (mode !== undefined && shell.sidebarMode !== mode) {
        shell.setSidebarMode(mode);
      }
    }, [mode, shell]);

    // Emit mode changes
    React.useEffect(() => {
      if (mode === undefined) {
        onModeChange?.(shell.sidebarMode);
      }
    }, [shell.sidebarMode, mode, onModeChange]);

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

    // Always-follow responsive defaultMode for uncontrolled Sidebar (on breakpoint change only)
    const resolveResponsiveMode = React.useCallback((): SidebarMode => {
      if (typeof defaultMode === 'string') return defaultMode as SidebarMode;
      const dm = defaultMode as Partial<Record<Breakpoint, SidebarMode>> | undefined;
      if (dm && dm[shell.currentBreakpoint as Breakpoint]) {
        return dm[shell.currentBreakpoint as Breakpoint] as SidebarMode;
      }
      const bpKeys = Object.keys(BREAKPOINTS) as Array<keyof typeof BREAKPOINTS>;
      const order: Breakpoint[] = ([...bpKeys].reverse() as Breakpoint[]).concat('initial' as Breakpoint);
      const startIdx = order.indexOf(shell.currentBreakpoint as Breakpoint);
      for (let i = startIdx + 1; i < order.length; i++) {
        const bp = order[i];
        if (dm && dm[bp]) return dm[bp] as SidebarMode;
      }
      return 'collapsed';
    }, [defaultMode, shell.currentBreakpoint]);

    // Register custom toggle behavior based on toggleModes (both|single)
    const shellForToggle = useShell();
    const resolveDefaultSidebarMode = React.useCallback((): SidebarMode => {
      const resolved = resolveResponsiveMode();
      return resolved === 'thin' || resolved === 'expanded' ? resolved : 'expanded';
    }, [resolveResponsiveMode]);

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

    const lastSidebarBpRef = React.useRef<Breakpoint | null>(null);
    React.useEffect(() => {
      if (mode !== undefined) return;
      if (!shell.currentBreakpointReady) return;
      if (lastSidebarBpRef.current === shell.currentBreakpoint) return;
      lastSidebarBpRef.current = shell.currentBreakpoint as Breakpoint;
      const next = resolveResponsiveMode();
      if (next !== shell.sidebarMode) shell.setSidebarMode(next);
    }, [mode, shell.currentBreakpoint, shell.currentBreakpointReady, resolveResponsiveMode, shell.sidebarMode, shell.setSidebarMode]);

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
              <Sheet.Title>Sidebar</Sheet.Title>
            </VisuallyHidden>
            {contentChildren}
          </Sheet.Content>
        </Sheet.Root>
      );
    }

    return (
      <div
        {...props}
        ref={setRef}
        className={classNames('rt-ShellSidebar', className)}
        data-mode={shell.sidebarMode}
        data-peek={shell.peekTarget === 'sidebar' || undefined}
        data-presentation={resolvedPresentation}
        data-open={(isStacked && isContentVisible) || undefined}
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
