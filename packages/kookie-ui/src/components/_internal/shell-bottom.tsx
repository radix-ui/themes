import * as React from 'react';
import classNames from 'classnames';
import * as Sheet from '../sheet.js';
import { VisuallyHidden } from '../visually-hidden.js';
import { useShell } from '../shell.context.js';
import { useResponsivePresentation, useResponsiveValue } from '../shell.hooks.js';
import { PaneResizeContext } from './shell-resize.js';
import { BottomHandle, PaneHandle } from './shell-handles.js';
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

type BottomOpenChangeMeta = { reason: 'init' | 'toggle' | 'responsive' };
type BottomControlledProps = { open: boolean | Partial<Record<Breakpoint, boolean>>; onOpenChange?: (open: boolean, meta: BottomOpenChangeMeta) => void; defaultOpen?: never };
type BottomUncontrolledProps = { defaultOpen?: boolean; onOpenChange?: (open: boolean, meta: BottomOpenChangeMeta) => void; open?: never };
type BottomSizeControlledProps = { size: number | string; defaultSize?: never };
type BottomSizeUncontrolledProps = { defaultSize?: number | string; size?: never };
type BottomSizeChangeMeta = { reason: 'init' | 'resize' | 'controlled' };
type BottomPublicProps = PaneProps &
  (BottomControlledProps | BottomUncontrolledProps) &
  (BottomSizeControlledProps | BottomSizeUncontrolledProps) & {
    onSizeChange?: (size: number, meta: BottomSizeChangeMeta) => void;
    sizeUpdate?: 'throttle' | 'debounce';
    sizeUpdateMs?: number;
  };

type BottomComponent = React.ForwardRefExoticComponent<BottomPublicProps & React.RefAttributes<HTMLDivElement>> & { Handle: typeof BottomHandle };

export const Bottom = React.forwardRef<HTMLDivElement, BottomPublicProps>(
  (
    {
      className,
      presentation = 'fixed',
      // removed legacy props
      // new API
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

    // Throttled/debounced emitter for onSizeChange
    const onSizeChange = (props as any).onSizeChange;
    const sizeUpdate = (props as any).sizeUpdate;
    const sizeUpdateMs = (props as any).sizeUpdateMs;
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

    const didInitRef = React.useRef(false);
    const didInitFromDefaultOpenRef = React.useRef(false);
    const resolvedDefaultOpen = useResponsiveValue(defaultOpen as any);
    React.useEffect(() => {
      if (didInitRef.current) return;
      if (!shell.currentBreakpointReady) return;
      didInitRef.current = true;
      if (typeof open === 'undefined' && typeof defaultOpen !== 'undefined') {
        const initial = Boolean(resolvedDefaultOpen);
        shell.setBottomMode(initial ? 'expanded' : 'collapsed');
        didInitFromDefaultOpenRef.current = true;
      }
    }, [shell, open, defaultOpen, resolvedDefaultOpen]);

    // Dev guards
    const wasControlledRef = React.useRef<boolean | null>(null);
    if (process.env.NODE_ENV !== 'production') {
      if (typeof open !== 'undefined' && typeof defaultOpen !== 'undefined') {
        console.error('Shell.Bottom: Do not pass both `open` and `defaultOpen`. Choose one.');
      }
      if (typeof (props as any).size !== 'undefined' && typeof (props as any).defaultSize !== 'undefined') {
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

    // Controlled sync (responsive handled below)
    React.useEffect(() => {
      if (typeof open === 'undefined') return;
      shell.setBottomMode(open ? 'expanded' : 'collapsed');
    }, [shell, open]);

    const responsiveNotifiedRef = React.useRef(false);

    // Controlled responsive open
    const resolvedOpen = useResponsiveValue(open);
    React.useEffect(() => {
      if (typeof resolvedOpen === 'undefined') return;
      const shouldExpand = Boolean(resolvedOpen);
      shell.setBottomMode(shouldExpand ? 'expanded' : 'collapsed');
    }, [shell, resolvedOpen]);

    const initNotifiedRef = React.useRef(false);
    const lastBottomModeRef = React.useRef<PaneMode | null>(null);
    React.useEffect(() => {
      if (!initNotifiedRef.current && typeof open === 'undefined' && defaultOpen && shell.bottomMode === 'expanded') {
        onOpenChange?.(true, { reason: 'init' });
        initNotifiedRef.current = true;
      }
      if (typeof open === 'undefined') {
        if (lastBottomModeRef.current !== null && lastBottomModeRef.current !== shell.bottomMode) {
          if (!responsiveNotifiedRef.current) {
            onOpenChange?.(shell.bottomMode === 'expanded', { reason: 'toggle' });
          }
          responsiveNotifiedRef.current = false;
        }
        lastBottomModeRef.current = shell.bottomMode;
      }
    }, [shell.bottomMode, open, defaultOpen, onOpenChange]);

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
    const {
      defaultOpen: _bottomDefaultOpenIgnored,
      open: _bottomOpenIgnored,
      onOpenChange: _bottomOnOpenChangeIgnored,
      size: _bottomSizeIgnored,
      defaultSize: _bottomDefaultSizeIgnored,
      onSizeChange: _bottomOnSizeChangeIgnored,
      sizeUpdate: _szu,
      sizeUpdateMs: _szums,
      ...bottomDomProps
    } = props as any;

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
      if (typeof (props as any).size === 'undefined' && typeof (props as any).defaultSize !== 'undefined') {
        const px = normalizeToPx((props as any).defaultSize);
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
    const controlledSize = (props as any).size;
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
  },
) as BottomComponent;
Bottom.displayName = 'Shell.Bottom';
Bottom.Handle = BottomHandle;
