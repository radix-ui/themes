import * as React from 'react';
import classNames from 'classnames';
import * as Sheet from '../sheet.js';
import { VisuallyHidden } from '../visually-hidden.js';
import { useShell } from '../shell.context.js';
import { useResponsivePresentation, useResponsiveValue } from '../shell.hooks.js';
import { PaneResizeContext } from './shell-resize.js';
import { InspectorHandle, PaneHandle } from './shell-handles.js';
import { _BREAKPOINTS } from '../shell.types.js';
import type { Breakpoint, PaneMode, PaneSizePersistence, ResponsivePresentation } from '../shell.types.js';

interface PaneProps extends React.ComponentPropsWithoutRef<'div'> {
  presentation?: ResponsivePresentation;
  // legacy mode removed
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

type InspectorOpenChangeMeta = { reason: 'init' | 'toggle' | 'responsive' };
type InspectorControlledProps = { open: boolean | Partial<Record<Breakpoint, boolean>>; onOpenChange?: (open: boolean, meta: InspectorOpenChangeMeta) => void; defaultOpen?: never };
type InspectorUncontrolledProps = { defaultOpen?: boolean | Partial<Record<Breakpoint, boolean>>; onOpenChange?: (open: boolean, meta: InspectorOpenChangeMeta) => void; open?: never };
type InspectorSizeChangeMeta = { reason: 'init' | 'resize' | 'controlled' };
type InspectorPublicProps = PaneProps &
  (InspectorControlledProps | InspectorUncontrolledProps) & {
    onSizeChange?: (size: number, meta: InspectorSizeChangeMeta) => void;
    sizeUpdate?: 'throttle' | 'debounce';
    sizeUpdateMs?: number;
  };

type InspectorComponent = React.ForwardRefExoticComponent<InspectorPublicProps & React.RefAttributes<HTMLDivElement>> & { Handle: typeof InspectorHandle };

export const Inspector = React.forwardRef<HTMLDivElement, InspectorPublicProps>(
  (
    {
      className,
      presentation = { initial: 'overlay', lg: 'fixed' },
      // removed legacy props
      // new API
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

    // Throttled/debounced emitter for onSizeChange
    const onSizeChange = (props as any).onSizeChange;
    const sizeUpdate = (props as any).sizeUpdate;
    const sizeUpdateMs = (props as any).sizeUpdateMs;
    const emitSizeChange = React.useMemo(() => {
      const cb = onSizeChange as undefined | ((s: number, meta: InspectorSizeChangeMeta) => void);
      const strategy = sizeUpdate as undefined | 'throttle' | 'debounce';
      const ms = sizeUpdateMs ?? 50;
      if (!cb) return () => {};
      if (strategy === 'debounce') {
        let t: any = null;
        return (s: number, meta: InspectorSizeChangeMeta) => {
          if (t) clearTimeout(t);
          t = setTimeout(() => {
            cb(s, meta);
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

    const responsiveNotifiedRef = React.useRef(false);
    const didInitFromDefaultOpenRef = React.useRef(false);
    const resolvedDefaultOpen = useResponsiveValue(defaultOpen);
    React.useEffect(() => {
      if (!shell.currentBreakpointReady) return;
      if (didInitFromDefaultOpenRef.current) return;
      if (typeof open !== 'undefined') return; // controlled ignores default
      if (typeof defaultOpen === 'undefined') return;
      const initialOpen = Boolean(resolvedDefaultOpen);
      shell.setInspectorMode(initialOpen ? 'expanded' : 'collapsed');
      if (initialOpen) onOpenChange?.(true, { reason: 'init' });
      didInitFromDefaultOpenRef.current = true;
    }, [shell, resolvedDefaultOpen, defaultOpen, open, onOpenChange]);

    // Controlled responsive open
    const resolvedOpen = useResponsiveValue(open);
    React.useEffect(() => {
      if (typeof resolvedOpen === 'undefined') return;
      const shouldExpand = Boolean(resolvedOpen);
      if (shouldExpand && shell.inspectorMode !== 'expanded') shell.setInspectorMode('expanded');
      if (!shouldExpand && shell.inspectorMode !== 'collapsed') shell.setInspectorMode('collapsed');
    }, [shell, resolvedOpen]);

    // Removed boolean-only mount init; handled in responsive init effect above

    // Removed: boolean-only controlled sync. Use responsive-resolved effect below instead.

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
          if (!responsiveNotifiedRef.current) {
            onOpenChange?.(shell.inspectorMode === 'expanded', { reason: 'toggle' });
          }
          responsiveNotifiedRef.current = false;
        }
        lastInspectorModeRef.current = shell.inspectorMode;
      }
    }, [shell.inspectorMode, open, defaultOpen, onOpenChange]);

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
      if (typeof (props as any).size === 'undefined' && typeof (props as any).defaultSize !== 'undefined') {
        const px = normalizeToPx((props as any).defaultSize);
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
    const controlledSize = (props as any).size;
    React.useEffect(() => {
      if (!localRef.current) return;
      if (typeof controlledSize === 'undefined') return;
      const px = normalizeToPx(controlledSize);
      if (typeof px === 'number' && Number.isFinite(px)) {
        const minPx = typeof minSize === 'number' ? minSize : undefined;
        const maxPx = typeof maxSize === 'number' ? maxSize : undefined;
        const clamped = Math.min(maxPx ?? px, Math.max(minPx ?? px, px));
        localRef.current.style.setProperty('--inspector-size', `${clamped}px`);
        emitSizeChange(clamped, { reason: 'controlled' });
      }
    }, [controlledSize, minSize, maxSize, normalizeToPx, emitSizeChange]);

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
    const {
      defaultOpen: _inspectorDefaultOpenIgnored,
      open: _inspectorOpenIgnored,
      onOpenChange: _inspectorOnOpenChangeIgnored,
      size: _sz,
      defaultSize: _dsz,
      onSizeChange: _osc,
      sizeUpdate: _szu,
      sizeUpdateMs: _szums,
      ...inspectorDomProps
    } = props as any;

    return (
      <div
        {...inspectorDomProps}
        ref={setRef}
        className={classNames('rt-ShellInspector', className)}
        data-mode={shell.inspectorMode}
        data-peek={shell.peekTarget === 'inspector' || undefined}
        data-presentation={shell.currentBreakpointReady ? resolvedPresentation : undefined}
        data-open={(shell.currentBreakpointReady && isStacked && isExpanded) || undefined}
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
