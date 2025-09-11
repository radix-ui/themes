import * as React from 'react';
import classNames from 'classnames';
import * as Sheet from '../sheet.js';
import { VisuallyHidden } from '../visually-hidden.js';
import { useShell } from '../shell.context.js';
import { useResponsivePresentation } from '../shell.hooks.js';
import { PaneResizeContext } from './shell-resize.js';
import { InspectorHandle, PaneHandle } from './shell-handles.js';
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

type InspectorComponent = React.ForwardRefExoticComponent<PaneProps & React.RefAttributes<HTMLDivElement>> & { Handle: typeof InspectorHandle };

export const Inspector = React.forwardRef<HTMLDivElement, PaneProps>(
  (
    {
      className,
      presentation = { initial: 'overlay', lg: 'fixed' },
      mode,
      defaultMode = 'collapsed',
      onModeChange,
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
    const handleChildren = childArray.filter((el: React.ReactElement) => React.isValidElement(el) && el.type === InspectorHandle);
    const contentChildren = childArray.filter((el: React.ReactElement) => !(React.isValidElement(el) && el.type === InspectorHandle));

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

    const lastInspectorBpRef = React.useRef<Breakpoint | null>(null);
    React.useEffect(() => {
      if (mode !== undefined) return;
      if (!shell.currentBreakpointReady) return;
      if (lastInspectorBpRef.current === shell.currentBreakpoint) return;
      lastInspectorBpRef.current = shell.currentBreakpoint as Breakpoint;
      const next = resolveResponsiveMode();
      if (next !== shell.inspectorMode) {
        shell.setInspectorMode(next);
      }
    }, [mode, shell.currentBreakpoint, shell.currentBreakpointReady, resolveResponsiveMode, shell.inspectorMode, shell.setInspectorMode]);

    React.useEffect(() => {
      if (mode !== undefined && shell.inspectorMode !== mode) {
        shell.setInspectorMode(mode);
      }
    }, [mode, shell]);

    React.useEffect(() => {
      if (mode === undefined) {
        onModeChange?.(shell.inspectorMode);
      }
    }, [shell.inspectorMode, mode, onModeChange]);

    React.useEffect(() => {
      if (shell.inspectorMode === 'expanded') {
        onExpand?.();
      } else {
        onCollapse?.();
      }
    }, [shell.inspectorMode, onExpand, onCollapse]);

    const isExpanded = shell.inspectorMode === 'expanded';

    const persistenceAdapter = React.useMemo(() => {
      if (!paneId || persistence) return persistence;
      const key = `kookie-ui:shell:inspector:${paneId}`;
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
          localRef.current.style.setProperty('--inspector-size', `${loaded}px`);
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

    return (
      <div
        {...props}
        ref={setRef}
        className={classNames('rt-ShellInspector', className)}
        data-mode={shell.inspectorMode}
        data-peek={shell.peekTarget === 'inspector' || undefined}
        data-presentation={resolvedPresentation}
        data-open={(isStacked && isExpanded) || undefined}
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
  },
) as InspectorComponent;

Inspector.displayName = 'Shell.Inspector';
Inspector.Handle = InspectorHandle;
