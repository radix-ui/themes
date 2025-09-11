import * as React from 'react';
import classNames from 'classnames';
import * as Sheet from '../sheet.js';
import { VisuallyHidden } from '../visually-hidden.js';
import { useShell } from '../shell.context.js';
import { useResponsivePresentation } from '../shell.hooks.js';
import { PaneResizeContext } from './shell-resize.js';
import { BottomHandle, PaneHandle } from './shell-handles.js';
import { BREAKPOINTS } from '../shell.types.js';
import type { Breakpoint, PaneMode, PaneSizePersistence, ResponsivePresentation } from '../shell.types.js';

interface PaneProps extends React.ComponentPropsWithoutRef<'div'> {
  presentation?: ResponsivePresentation;
  mode?: PaneMode;
  defaultMode?: any;
  onModeChange?: (mode: PaneMode) => void;
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

type BottomComponent = React.ForwardRefExoticComponent<PaneProps & React.RefAttributes<HTMLDivElement>> & { Handle: typeof BottomHandle };

export const Bottom = React.forwardRef<HTMLDivElement, PaneProps>(
  (
    {
      className,
      presentation = 'fixed',
      mode,
      defaultMode = 'collapsed',
      onModeChange,
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
    const handleChildren = childArray.filter((el: React.ReactElement) => React.isValidElement(el) && el.type === BottomHandle);
    const contentChildren = childArray.filter((el: React.ReactElement) => !(React.isValidElement(el) && el.type === BottomHandle));

    const resolveResponsiveMode = React.useCallback((): PaneMode => {
      if (typeof defaultMode === 'string') return defaultMode as PaneMode;
      const dm = defaultMode as Partial<Record<Breakpoint, PaneMode>> | undefined;
      if (dm && dm[shell.currentBreakpoint as Breakpoint]) {
        return dm[shell.currentBreakpoint as Breakpoint] as PaneMode;
      }
      const bpKeys = Object.keys(BREAKPOINTS) as Array<keyof typeof BREAKPOINTS>;
      const order: Breakpoint[] = ([...bpKeys].reverse() as Breakpoint[]).concat('initial' as Breakpoint);
      const startIdx = order.indexOf(shell.currentBreakpoint as Breakpoint);
      for (let i = startIdx + 1; i < order.length; i++) {
        const bp = order[i];
        if (dm && dm[bp]) {
          return dm[bp] as PaneMode;
        }
      }
      return 'collapsed';
    }, [defaultMode, shell.currentBreakpoint]);

    const didInitRef = React.useRef(false);
    React.useEffect(() => {
      if (didInitRef.current) return;
      didInitRef.current = true;
      if (mode === undefined) {
        const initial = resolveResponsiveMode();
        if (shell.bottomMode !== initial) shell.setBottomMode(initial);
      }
    }, []);

    const lastBottomBpRef = React.useRef<Breakpoint | null>(null);
    const lastResolvedBottomRef = React.useRef<PaneMode | null>(null);
    React.useEffect(() => {
      if (mode !== undefined) return;
      if (!shell.currentBreakpointReady) return;
      if (lastBottomBpRef.current === shell.currentBreakpoint) return;
      lastBottomBpRef.current = shell.currentBreakpoint as Breakpoint;
      const next = resolveResponsiveMode();
      if (lastResolvedBottomRef.current === next) return;
      lastResolvedBottomRef.current = next;
      if (next !== shell.bottomMode) shell.setBottomMode(next);
    }, [mode, shell.currentBreakpoint, shell.currentBreakpointReady, resolveResponsiveMode, shell.bottomMode, shell.setBottomMode]);

    React.useEffect(() => {
      if (mode !== undefined && shell.bottomMode !== mode) {
        shell.setBottomMode(mode);
      }
    }, [mode, shell]);

    React.useEffect(() => {
      if (mode === undefined) {
        onModeChange?.(shell.bottomMode);
      }
    }, [shell.bottomMode, mode, onModeChange]);

    React.useEffect(() => {
      if (shell.bottomMode === 'expanded') {
        onExpand?.();
      } else {
        onCollapse?.();
      }
    }, [shell.bottomMode, onExpand, onCollapse]);

    const isExpanded = shell.bottomMode === 'expanded';

    const persistenceAdapter = React.useMemo(() => {
      if (!paneId || persistence) return persistence;
      const key = `kookie-ui:shell:bottom:${paneId}`;
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
          localRef.current.style.setProperty('--bottom-size', `${loaded}px`);
          onResize?.(loaded);
        }
      })();
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
        {...props}
        ref={setRef}
        className={classNames('rt-ShellBottom', className)}
        data-mode={shell.bottomMode}
        data-peek={shell.peekTarget === 'bottom' || undefined}
        data-presentation={resolvedPresentation}
        data-open={(isStacked && isExpanded) || undefined}
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
  },
) as BottomComponent;
Bottom.displayName = 'Shell.Bottom';
Bottom.Handle = BottomHandle;
