/**
 * Shell Component - Layout Engine + Chrome
 *
 * Philosophy:
 * - Shell = layout engine + chrome
 * - Manages layout state: expanded/collapsed, fixed/overlay, sizes
 * - Does not manage content/navigation state
 * - Provides unstyled primitives (slots, triggers)
 * - Enforces composition rules (Rail ↔ Panel dependency, Sidebar exclusivity)
 *
 * Core Slots:
 * - Header: global top bar
 * - Rail: slim nav strip
 * - Panel: sidebar next to rail
 * - Sidebar: alternative to Rail+Panel (exclusive)
 * - Content: main work area
 * - Inspector: right-side panel
 * - Bottom: bottom panel
 *
 * Composition Rules:
 * - Rail + Panel: valid together (Rail collapse → Panel collapse)
 * - Sidebar: cannot coexist with Rail or Panel
 * - Content: always required
 * - Inspector/Bottom: optional, independent
 */
'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as Sheet from './sheet.js';
import { Inset } from './inset.js';
import { VisuallyHidden } from './visually-hidden.js';

// Types
type PresentationValue = 'fixed' | 'overlay' | 'stacked';
type ResponsivePresentation =
  | PresentationValue
  | Partial<Record<'initial' | 'xs' | 'sm' | 'md' | 'lg' | 'xl', PresentationValue>>;
type PaneMode = 'expanded' | 'collapsed';
type SidebarMode = 'collapsed' | 'thin' | 'expanded';
type ResponsiveMode =
  | PaneMode
  | Partial<Record<'initial' | 'xs' | 'sm' | 'md' | 'lg' | 'xl', PaneMode>>;

// Sidebar responsive mode (includes 'thin')
type ResponsiveSidebarMode =
  | SidebarMode
  | Partial<Record<'initial' | 'xs' | 'sm' | 'md' | 'lg' | 'xl', SidebarMode>>;

// Persistence adapter for pane sizes
type PaneSizePersistence = {
  load?: () => number | Promise<number | undefined> | undefined;
  save?: (size: number) => void | Promise<void>;
};

// Breakpoint system
const BREAKPOINTS = {
  xs: '(min-width: 520px)',
  sm: '(min-width: 768px)',
  md: '(min-width: 1024px)',
  lg: '(min-width: 1280px)',
  xl: '(min-width: 1640px)',
} as const;

type Breakpoint = 'initial' | keyof typeof BREAKPOINTS;

// Shell context
interface ShellContextValue {
  // Pane states
  leftMode: PaneMode;
  setLeftMode: (mode: PaneMode) => void;
  panelMode: PaneMode; // Panel state within left container
  setPanelMode: (mode: PaneMode) => void;
  sidebarMode: SidebarMode;
  setSidebarMode: (mode: SidebarMode) => void;
  inspectorMode: PaneMode;
  setInspectorMode: (mode: PaneMode) => void;
  bottomMode: PaneMode;
  setBottomMode: (mode: PaneMode) => void;

  // Peek state (layout-only, ephemeral)
  peekTarget: PaneTarget | null;
  setPeekTarget: (target: PaneTarget | null) => void;
  peekPane: (target: PaneTarget) => void;
  clearPeek: () => void;

  // Composition detection
  hasLeft: boolean;
  setHasLeft: (has: boolean) => void;
  hasSidebar: boolean;
  setHasSidebar: (has: boolean) => void;

  // Presentation resolution
  currentBreakpoint: Breakpoint;
  currentBreakpointReady: boolean;
  leftResolvedPresentation?: PresentationValue;

  // Actions
  togglePane: (target: PaneTarget) => void;
  expandPane: (target: PaneTarget) => void;
  collapsePane: (target: PaneTarget) => void;
  // Toggle customization
  setSidebarToggleComputer?: (fn: (current: SidebarMode) => SidebarMode) => void;
  // Dev-only hooks for presentation warnings
  onLeftPres?: (p: PresentationValue) => void;
  // Sizing info for overlay grouping
  onLeftDefaults?: (size: number) => void;
}

const ShellContext = React.createContext<ShellContextValue | null>(null);

function useShell() {
  const ctx = React.useContext(ShellContext);
  if (!ctx) throw new Error('Shell components must be used within <Shell.Root>');
  return ctx;
}

// Pane resize context for composed Handles
interface PaneResizeContextValue {
  containerRef: React.RefObject<HTMLDivElement | null>;
  cssVarName: string;
  minSize: number;
  maxSize: number;
  defaultSize: number;
  orientation: 'vertical' | 'horizontal';
  edge: 'start' | 'end';
  computeNext: (clientPos: number, startClientPos: number, startSize: number) => number;
  onResize?: (size: number) => void;
  onResizeStart?: (size: number) => void;
  onResizeEnd?: (size: number) => void;
  // new features
  target: PaneTarget;
  collapsible: boolean;
  snapPoints?: number[];
  snapTolerance: number;
  collapseThreshold?: number;
  requestCollapse?: () => void;
  requestToggle?: () => void;
}

const PaneResizeContext = React.createContext<PaneResizeContextValue | null>(null);

function usePaneResize() {
  const ctx = React.useContext(PaneResizeContext);
  if (!ctx) throw new Error('Shell.Handle must be used within a resizable pane');
  return ctx;
}

const PaneHandle = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, children, ...props }, ref) => {
    const {
      containerRef,
      cssVarName,
      minSize,
      maxSize,
      defaultSize,
      orientation,
      edge,
      computeNext,
      onResize,
      onResizeStart,
      onResizeEnd,
      snapPoints,
      snapTolerance,
      collapseThreshold,
      collapsible,
      target,
      requestCollapse,
      requestToggle,
    } = usePaneResize();

    // Track active drag cleanup to avoid leaking listeners if unmounted mid-drag
    const activeCleanupRef = React.useRef<(() => void) | null>(null);
    React.useEffect(
      () => () => {
        // Cleanup any in-flight drag on unmount
        try {
          activeCleanupRef.current?.();
        } catch {}
        activeCleanupRef.current = null;
      },
      [],
    );

    const ariaOrientation = orientation;

    return (
      <div
        {...props}
        ref={ref}
        className={classNames('rt-ShellResizer', className)}
        data-orientation={orientation}
        data-edge={edge}
        role="slider"
        aria-orientation={ariaOrientation}
        aria-valuemin={minSize}
        aria-valuemax={maxSize}
        aria-valuenow={defaultSize}
        tabIndex={0}
        onPointerDown={(e) => {
          if (!containerRef.current) return;
          e.preventDefault();
          const container = containerRef.current;
          const handleEl = e.currentTarget as HTMLElement;
          const pointerId = e.pointerId;
          // If a previous drag didn't finalize properly, force cleanup first
          try {
            activeCleanupRef.current?.();
          } catch {}
          container.setAttribute('data-resizing', '');
          try {
            handleEl.setPointerCapture(pointerId);
          } catch {}
          const startClient = orientation === 'vertical' ? e.clientX : e.clientY;
          const startSize = parseFloat(
            getComputedStyle(container).getPropertyValue(cssVarName) || `${defaultSize}`,
          );
          const clamp = (v: number) => Math.min(Math.max(v, minSize), maxSize);
          const body = document.body;
          const prevCursor = body.style.cursor;
          const prevUserSelect = body.style.userSelect;
          body.style.cursor = orientation === 'vertical' ? 'col-resize' : 'row-resize';
          body.style.userSelect = 'none';
          onResizeStart?.(startSize);
          const handleMove = (ev: PointerEvent) => {
            const client = orientation === 'vertical' ? ev.clientX : ev.clientY;
            const next = clamp(computeNext(client, startClient, startSize));
            container.style.setProperty(cssVarName, `${next}px`);
            handleEl.setAttribute('aria-valuenow', String(next));
            onResize?.(next);
          };
          const cleanup = () => {
            try {
              handleEl.releasePointerCapture(pointerId);
            } catch {}
            window.removeEventListener('pointermove', handleMove as any);
            window.removeEventListener('pointerup', handleUp as any);
            window.removeEventListener('pointercancel', handleUp as any);
            window.removeEventListener('keydown', handleKey as any);
            handleEl.removeEventListener('lostpointercapture', handleUp as any);
            container.removeAttribute('data-resizing');
            body.style.cursor = prevCursor;
            body.style.userSelect = prevUserSelect;
            activeCleanupRef.current = null;
          };
          const handleUp = () => {
            const finalSize = parseFloat(
              getComputedStyle(container).getPropertyValue(cssVarName) || `${defaultSize}`,
            );
            // snap logic
            let snapped = finalSize;
            if (snapPoints && snapPoints.length) {
              const nearest = snapPoints.reduce(
                (acc, p) => (Math.abs(p - finalSize) < Math.abs(acc - finalSize) ? p : acc),
                snapPoints[0],
              );
              if (Math.abs(nearest - finalSize) <= (snapTolerance ?? 8)) {
                snapped = nearest;
                container.style.setProperty(cssVarName, `${snapped}px`);
                handleEl.setAttribute('aria-valuenow', String(snapped));
                onResize?.(snapped);
              }
            }
            // collapse threshold
            if (
              collapsible &&
              typeof collapseThreshold === 'number' &&
              finalSize <= collapseThreshold
            ) {
              requestCollapse?.();
            }
            onResizeEnd?.(snapped);
            cleanup();
          };
          const handleKey = (kev: KeyboardEvent) => {
            if (kev.key === 'Escape') {
              // cancel to start size
              container.style.setProperty(cssVarName, `${startSize}px`);
              handleEl.setAttribute('aria-valuenow', String(startSize));
              onResizeEnd?.(startSize);
              cleanup();
            }
          };
          window.addEventListener('pointermove', handleMove as any);
          window.addEventListener('pointerup', handleUp as any);
          window.addEventListener('pointercancel', handleUp as any);
          window.addEventListener('keydown', handleKey as any);
          handleEl.addEventListener('lostpointercapture', handleUp as any);
          // Store cleanup so unmounts or re-entries can clean up properly
          activeCleanupRef.current = cleanup;
        }}
        onDoubleClick={() => {
          if (collapsible) requestToggle?.();
        }}
        onKeyDown={(e) => {
          if (!containerRef.current) return;
          const container = containerRef.current;
          const current = parseFloat(
            getComputedStyle(container).getPropertyValue(cssVarName) || `${defaultSize}`,
          );
          const clamp = (v: number) => Math.min(Math.max(v, minSize), maxSize);
          const step = e.shiftKey ? 32 : 8;
          let delta = 0;
          if (orientation === 'vertical') {
            if (e.key === 'ArrowRight') delta = step;
            else if (e.key === 'ArrowLeft') delta = -step;
          } else {
            if (e.key === 'ArrowDown') delta = step;
            else if (e.key === 'ArrowUp') delta = -step;
          }
          if (e.key === 'Home') {
            e.preventDefault();
            onResizeStart?.(current);
            const next = clamp(minSize);
            container.style.setProperty(cssVarName, `${next}px`);
            (e.currentTarget as HTMLElement).setAttribute('aria-valuenow', String(next));
            onResize?.(next);
            onResizeEnd?.(next);
            return;
          }
          if (e.key === 'End') {
            e.preventDefault();
            onResizeStart?.(current);
            const next = clamp(maxSize);
            container.style.setProperty(cssVarName, `${next}px`);
            (e.currentTarget as HTMLElement).setAttribute('aria-valuenow', String(next));
            onResize?.(next);
            onResizeEnd?.(next);
            return;
          }
          if (delta !== 0) {
            e.preventDefault();
            onResizeStart?.(current);
            // approximate computeNext with delta from keyboard
            const next = clamp(
              current + (edge === 'start' && orientation === 'vertical' ? -delta : delta),
            );
            container.style.setProperty(cssVarName, `${next}px`);
            (e.currentTarget as HTMLElement).setAttribute('aria-valuenow', String(next));
            onResize?.(next);
            onResizeEnd?.(next);
          }
        }}
      >
        {children}
      </div>
    );
  },
);
PaneHandle.displayName = 'Shell.Handle';

// Composed Handle wrappers per pane
const PanelHandle = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  (props, ref) => <PaneHandle {...props} ref={ref} />,
);
PanelHandle.displayName = 'Shell.Panel.Handle';

const SidebarHandle = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  (props, ref) => <PaneHandle {...props} ref={ref} />,
);
SidebarHandle.displayName = 'Shell.Sidebar.Handle';

const InspectorHandle = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  (props, ref) => <PaneHandle {...props} ref={ref} />,
);
InspectorHandle.displayName = 'Shell.Inspector.Handle';

const BottomHandle = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  (props, ref) => <PaneHandle {...props} ref={ref} />,
);
BottomHandle.displayName = 'Shell.Bottom.Handle';

// Hook to resolve responsive presentation
function useResponsivePresentation(presentation: ResponsivePresentation): PresentationValue {
  const { currentBreakpoint } = useShell();

  return React.useMemo(() => {
    if (typeof presentation === 'string') {
      return presentation;
    }

    // Try current breakpoint first
    if (presentation[currentBreakpoint]) {
      return presentation[currentBreakpoint]!;
    }

    // Cascade down to smaller breakpoints based on configured BREAKPOINTS
    const bpKeys = Object.keys(BREAKPOINTS) as Array<keyof typeof BREAKPOINTS>;
    const order: Breakpoint[] = ([...bpKeys].reverse() as Breakpoint[]).concat(
      'initial' as Breakpoint,
    );
    const startIdx = order.indexOf(currentBreakpoint as Breakpoint);

    for (let i = startIdx + 1; i < order.length; i++) {
      const bp = order[i];
      if (presentation[bp]) {
        return presentation[bp]!;
      }
    }

    return 'fixed'; // Default fallback
  }, [presentation, currentBreakpoint]);
}

// Hook to resolve responsive mode defaults
// Removed: defaultMode responsiveness

// Hook to get current breakpoint
function useBreakpoint(): { bp: Breakpoint; ready: boolean } {
  const [currentBp, setCurrentBp] = React.useState<Breakpoint>('initial');
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const queries: [key: keyof typeof BREAKPOINTS, query: string][] = Object.entries(
      BREAKPOINTS,
    ) as any;
    const mqls = queries.map(([k, q]) => [k, window.matchMedia(q)] as const);

    const compute = () => {
      // Highest matched wins
      const matched = mqls.filter(([, m]) => m.matches).map(([k]) => k);
      const next = (matched[matched.length - 1] as Breakpoint | undefined) ?? 'initial';
      setCurrentBp(next);
      setReady(true);
    };

    compute();
    mqls.forEach(([, m]) => m.addEventListener('change', compute));

    return () => {
      mqls.forEach(([, m]) => m.removeEventListener('change', compute));
    };
  }, []);

  return { bp: currentBp, ready };
}

// Root Component
interface ShellRootProps extends React.ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode;
  height?: 'full' | 'auto' | string | number;
}

const Root = React.forwardRef<HTMLDivElement, ShellRootProps>(
  ({ className, children, height = 'full', ...props }, ref) => {
    const { bp: currentBreakpoint, ready: currentBreakpointReady } = useBreakpoint();

    // Pane state management
    const [leftMode, setLeftMode] = React.useState<PaneMode>('collapsed');
    const [panelMode, setPanelMode] = React.useState<PaneMode>('collapsed');
    const [sidebarMode, setSidebarMode] = React.useState<SidebarMode>('expanded');
    const [inspectorMode, setInspectorMode] = React.useState<PaneMode>('collapsed');
    const [bottomMode, setBottomMode] = React.useState<PaneMode>('collapsed');

    // Removed: defaultMode responsiveness and manual change tracking

    // Composition detection
    const [hasLeft, setHasLeft] = React.useState(false);
    const [hasSidebar, setHasSidebar] = React.useState(false);

    // Customizable sidebar toggle sequencing
    const sidebarToggleComputerRef = React.useRef<(current: SidebarMode) => SidebarMode>(
      (current) =>
        current === 'collapsed' ? 'thin' : current === 'thin' ? 'expanded' : 'collapsed',
    );
    const setSidebarToggleComputer = React.useCallback(
      (fn: (current: SidebarMode) => SidebarMode) => {
        sidebarToggleComputerRef.current = fn;
      },
      [],
    );

    // Left collapse cascades to Panel
    React.useEffect(() => {
      if (leftMode === 'collapsed') {
        setPanelMode('collapsed');
      }
    }, [leftMode]);

    // Composition validation
    React.useEffect(() => {
      if (hasSidebar && hasLeft) {
        console.warn(
          'Shell: Sidebar cannot coexist with Rail or Panel. Use either Rail+Panel OR Sidebar.',
        );
      }
    }, [hasSidebar, hasLeft]);

    // Left presentation + defaults from children
    const [devLeftPres, setDevLeftPres] = React.useState<PresentationValue | undefined>(undefined);
    const onLeftPres = React.useCallback((p: PresentationValue) => setDevLeftPres(p), []);
    const railDefaultSizeRef = React.useRef<number>(64);
    const panelDefaultSizeRef = React.useRef<number>(288);
    const onRailDefaults = React.useCallback((size: number) => {
      railDefaultSizeRef.current = size;
    }, []);
    const onPanelDefaults = React.useCallback((size: number) => {
      panelDefaultSizeRef.current = size;
    }, []);

    // Determine children presence for left composition
    const hasLeftChildren = React.useMemo(() => {
      const childArray = React.Children.toArray(children) as React.ReactElement[];
      const isType = (el: React.ReactElement, comp: any) =>
        React.isValidElement(el) &&
        (el.type === comp || (el as any).type?.displayName === comp.displayName);
      return childArray.some((el) => isType(el, Rail) || isType(el, Panel));
    }, [children]);

    const hasSidebarChildren = React.useMemo(() => {
      const childArray = React.Children.toArray(children) as React.ReactElement[];
      const isType = (el: React.ReactElement, comp: any) =>
        React.isValidElement(el) &&
        (el.type === comp || (el as any).type?.displayName === comp.displayName);
      return childArray.some((el) => isType(el, Sidebar));
    }, [children]);

    const togglePane = React.useCallback(
      (target: PaneTarget) => {
        switch (target) {
          case 'left':
          case 'rail':
            setLeftMode((prev) => (prev === 'expanded' ? 'collapsed' : 'expanded'));
            break;
          case 'panel':
            // Panel toggle: expand left if collapsed, then toggle panel
            if (leftMode === 'collapsed') {
              setLeftMode('expanded');
              setPanelMode('expanded');
            } else {
              setPanelMode((prev) => (prev === 'expanded' ? 'collapsed' : 'expanded'));
            }
            break;
          case 'sidebar':
            setSidebarMode((prev) => sidebarToggleComputerRef.current(prev as SidebarMode));
            break;
          case 'inspector':
            setInspectorMode((prev) => (prev === 'expanded' ? 'collapsed' : 'expanded'));
            break;
          case 'bottom':
            setBottomMode((prev) => (prev === 'expanded' ? 'collapsed' : 'expanded'));
            break;
        }
      },
      [leftMode],
    );

    const expandPane = React.useCallback((target: PaneTarget) => {
      switch (target) {
        case 'left':
        case 'rail':
          setLeftMode('expanded');
          break;
        case 'panel':
          setLeftMode('expanded');
          setPanelMode('expanded');
          break;
        case 'sidebar':
          setSidebarMode('expanded');
          break;
        case 'inspector':
          setInspectorMode('expanded');
          break;
        case 'bottom':
          setBottomMode('expanded');
          break;
      }
    }, []);

    const collapsePane = React.useCallback((target: PaneTarget) => {
      switch (target) {
        case 'left':
        case 'rail':
          setLeftMode('collapsed');
          break;
        case 'panel':
          setPanelMode('collapsed');
          break;
        case 'sidebar':
          setSidebarMode('collapsed');
          break;
        case 'inspector':
          setInspectorMode('collapsed');
          break;
        case 'bottom':
          setBottomMode('collapsed');
          break;
      }
    }, []);

    const baseContextValue = React.useMemo(
      () => ({
        leftMode,
        setLeftMode,
        panelMode,
        setPanelMode,
        sidebarMode,
        setSidebarMode,
        inspectorMode,
        setInspectorMode,
        bottomMode,
        setBottomMode,
        hasLeft,
        setHasLeft,
        hasSidebar,
        setHasSidebar,
        currentBreakpoint,
        currentBreakpointReady,
        leftResolvedPresentation: devLeftPres,
        togglePane,
        expandPane,
        collapsePane,
        setSidebarToggleComputer,
        onLeftPres,
        onRailDefaults,
        onPanelDefaults,
      }),
      [
        leftMode,
        panelMode,
        sidebarMode,
        inspectorMode,
        bottomMode,
        hasLeft,
        hasSidebar,
        currentBreakpoint,
        currentBreakpointReady,
        devLeftPres,
        togglePane,
        expandPane,
        collapsePane,
        setSidebarToggleComputer,
        onLeftPres,
        onRailDefaults,
        onPanelDefaults,
      ],
    );

    // Organize children by type
    const childArray = React.Children.toArray(children) as React.ReactElement[];
    const isType = (el: React.ReactElement, comp: any) =>
      React.isValidElement(el) &&
      (el.type === comp || (el as any).type?.displayName === comp.displayName);

    const headerEls = childArray.filter((el) => isType(el, Header));
    const railEls = childArray.filter((el) => isType(el, Rail));
    const panelEls = childArray.filter((el) => isType(el, Panel));
    const sidebarEls = childArray.filter((el) => isType(el, Sidebar));
    const contentEls = childArray.filter((el) => isType(el, Content));
    const inspectorEls = childArray.filter((el) => isType(el, Inspector));
    const bottomEls = childArray.filter((el) => isType(el, Bottom));

    const heightStyle = React.useMemo(() => {
      if (height === 'full') return { height: '100vh' };
      if (height === 'auto') return { height: 'auto' };
      if (typeof height === 'string') return { height };
      if (typeof height === 'number') return { height: `${height}px` };
      return {};
    }, [height]);

    // Peek state (layout-only overlay without mode changes)
    const [peekTarget, setPeekTarget] = React.useState<PaneTarget | null>(null);
    const peekPane = React.useCallback((target: PaneTarget) => setPeekTarget(target), []);
    const clearPeek = React.useCallback(() => setPeekTarget(null), []);

    return (
      <div
        {...props}
        ref={ref}
        className={classNames('rt-ShellRoot', className)}
        style={{ ...heightStyle, ...props.style }}
      >
        <ShellContext.Provider
          value={{
            ...baseContextValue,
            peekTarget,
            setPeekTarget,
            peekPane,
            clearPeek,
          }}
        >
          {headerEls}
          <div
            className="rt-ShellBody"
            data-peek-target={peekTarget ?? undefined}
            style={
              peekTarget === 'rail' || peekTarget === 'panel'
                ? ({
                    ['--peek-rail-width' as any]: `${railDefaultSizeRef.current}px`,
                  } as React.CSSProperties)
                : undefined
            }
          >
            {hasLeftChildren && !hasSidebarChildren
              ? (() => {
                  const firstRail = railEls[0] as any;
                  const passthroughProps = firstRail
                    ? {
                        mode: firstRail.props?.mode,
                        defaultMode: firstRail.props?.defaultMode,
                        onModeChange: firstRail.props?.onModeChange,
                        presentation: firstRail.props?.presentation,
                        collapsible: firstRail.props?.collapsible,
                        onExpand: firstRail.props?.onExpand,
                        onCollapse: firstRail.props?.onCollapse,
                      }
                    : {};
                  return (
                    <Left {...(passthroughProps as any)}>
                      {railEls}
                      {panelEls}
                    </Left>
                  );
                })()
              : sidebarEls}
            {contentEls}
            {inspectorEls}
          </div>
          {bottomEls}
        </ShellContext.Provider>
      </div>
    );
  },
);
Root.displayName = 'Shell.Root';

// Header
interface ShellHeaderProps extends React.ComponentPropsWithoutRef<'header'> {
  height?: number;
}

const Header = React.forwardRef<HTMLElement, ShellHeaderProps>(
  ({ className, height = 64, style, ...props }, ref) => (
    <header
      {...props}
      ref={ref}
      className={classNames('rt-ShellHeader', className)}
      style={{
        ...style,
        ['--shell-header-height' as any]: `${height}px`,
      }}
    />
  ),
);
Header.displayName = 'Shell.Header';

// Pane Props Interface (shared by Panel, Sidebar, Inspector, Bottom)
interface PaneProps extends React.ComponentPropsWithoutRef<'div'> {
  presentation?: ResponsivePresentation;
  mode?: PaneMode;
  defaultMode?: ResponsiveMode;
  onModeChange?: (mode: PaneMode) => void;
  expandedSize?: number;
  minSize?: number;
  maxSize?: number;
  resizable?: boolean;
  collapsible?: boolean;
  onExpand?: () => void;
  onCollapse?: () => void;
  onResize?: (size: number) => void;
  /** Optional custom content inside the resizer handle (kept unstyled). */
  resizer?: React.ReactNode;
  onResizeStart?: (size: number) => void;
  onResizeEnd?: (size: number) => void;
  snapPoints?: number[];
  snapTolerance?: number;
  collapseThreshold?: number;
  paneId?: string;
  persistence?: PaneSizePersistence;
}

// Left container (auto-created for Rail+Panel)
interface LeftProps extends React.ComponentPropsWithoutRef<'div'> {
  presentation?: ResponsivePresentation;
  mode?: PaneMode;
  defaultMode?: ResponsiveMode;
  onModeChange?: (mode: PaneMode) => void;
  collapsible?: boolean;
  onExpand?: () => void;
  onCollapse?: () => void;
}

// Rail (special case)
interface RailProps extends React.ComponentPropsWithoutRef<'div'> {
  presentation?: ResponsivePresentation;
  mode?: PaneMode;
  defaultMode?: ResponsiveMode;
  onModeChange?: (mode: PaneMode) => void;
  expandedSize?: number;
  collapsible?: boolean;
  onExpand?: () => void;
  onCollapse?: () => void;
}

// Left container - behaves like Inspector but contains Rail+Panel
const Left = React.forwardRef<HTMLDivElement, LeftProps>(
  (
    {
      className,
      presentation = { initial: 'overlay', sm: 'fixed' },
      mode,
      defaultMode = 'collapsed',
      onModeChange,
      collapsible = true,
      onExpand,
      onCollapse,
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
    // Publish resolved presentation so Root can gate peeking in overlay
    React.useEffect(() => {
      (shell as any).onLeftPres?.(resolvedPresentation);
    }, [shell, resolvedPresentation]);
    const setRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        localRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref],
    );

    // Register with shell
    React.useEffect(() => {
      shell.setHasLeft(true);
      return () => shell.setHasLeft(false);
    }, [shell]);

    // Always-follow responsive defaultMode for uncontrolled Left (Rail stack)
    const resolveResponsiveMode = React.useCallback((): PaneMode => {
      if (typeof defaultMode === 'string') return defaultMode as PaneMode;
      const dm = defaultMode as Partial<Record<Breakpoint, PaneMode>> | undefined;
      if (dm && dm[shell.currentBreakpoint as Breakpoint]) {
        return dm[shell.currentBreakpoint as Breakpoint] as PaneMode;
      }
      const bpKeys = Object.keys(BREAKPOINTS) as Array<keyof typeof BREAKPOINTS>;
      const order: Breakpoint[] = ([...bpKeys].reverse() as Breakpoint[]).concat(
        'initial' as Breakpoint,
      );
      const startIdx = order.indexOf(shell.currentBreakpoint as Breakpoint);
      for (let i = startIdx + 1; i < order.length; i++) {
        const bp = order[i];
        if (dm && dm[bp]) {
          return dm[bp] as PaneMode;
        }
      }
      return 'collapsed';
    }, [defaultMode, shell.currentBreakpoint]);

    const lastBpRef = React.useRef<Breakpoint | null>(null);
    React.useEffect(() => {
      if (mode !== undefined) return; // controlled wins
      if (!shell.currentBreakpointReady) return; // avoid SSR mismatch
      if (lastBpRef.current === shell.currentBreakpoint) return; // only on bp change
      lastBpRef.current = shell.currentBreakpoint as Breakpoint;
      const next = resolveResponsiveMode();
      if (next !== shell.leftMode) {
        shell.setLeftMode(next);
      }
    }, [
      mode,
      shell.currentBreakpoint,
      shell.currentBreakpointReady,
      resolveResponsiveMode,
      shell.leftMode,
      shell.setLeftMode,
    ]);

    // Sync controlled mode
    React.useEffect(() => {
      if (mode !== undefined && shell.leftMode !== mode) {
        shell.setLeftMode(mode);
      }
    }, [mode, shell]);

    // Emit mode changes
    React.useEffect(() => {
      if (mode === undefined) {
        onModeChange?.(shell.leftMode);
      }
    }, [shell.leftMode, mode, onModeChange]);

    // Emit expand/collapse events
    React.useEffect(() => {
      if (shell.leftMode === 'expanded') {
        onExpand?.();
      } else {
        onCollapse?.();
      }
    }, [shell.leftMode, onExpand, onCollapse]);

    const isExpanded = shell.leftMode === 'expanded';

    // Left is not resizable; width derives from Rail/Panel.

    if (isOverlay) {
      const open = shell.leftMode === 'expanded';
      // Compute overlay width from child Rail/Panel expanded sizes
      const childArray = React.Children.toArray(children) as React.ReactElement[];
      const isType = (el: React.ReactElement, comp: any) =>
        React.isValidElement(el) && el.type === comp;
      const railEl = childArray.find((el) => isType(el, Rail));
      const panelEl = childArray.find((el) => isType(el, Panel));
      const railSize =
        typeof (railEl as any)?.props?.expandedSize === 'number'
          ? (railEl as any).props.expandedSize
          : 64;
      const panelSize =
        typeof (panelEl as any)?.props?.expandedSize === 'number'
          ? (panelEl as any).props.expandedSize
          : 288;
      const hasRail = Boolean(railEl);
      const hasPanel = Boolean(panelEl);
      const overlayPx =
        (hasRail ? railSize : 0) + (shell.panelMode === 'expanded' && hasPanel ? panelSize : 0);
      return (
        <Sheet.Root
          open={open}
          onOpenChange={(o) => shell.setLeftMode(o ? 'expanded' : 'collapsed')}
        >
          <Sheet.Content
            side="start"
            style={{ padding: 0 }}
            width={{
              initial: `${overlayPx}px`,
            }}
          >
            <VisuallyHidden>
              <Sheet.Title>Navigation</Sheet.Title>
            </VisuallyHidden>
            <div className="rt-ShellLeft">{children}</div>
          </Sheet.Content>
        </Sheet.Root>
      );
    }

    if (isStacked) {
      const open = shell.leftMode === 'expanded';
      // Compute floating width from child Rail/Panel expanded sizes (like overlay)
      const childArray = React.Children.toArray(children) as React.ReactElement[];
      const isType = (el: React.ReactElement, comp: any) =>
        React.isValidElement(el) && el.type === comp;
      const railEl = childArray.find((el) => isType(el, Rail));
      const panelEl = childArray.find((el) => isType(el, Panel));
      const railSize =
        typeof (railEl as any)?.props?.expandedSize === 'number'
          ? (railEl as any).props.expandedSize
          : 64;
      const panelSize =
        typeof (panelEl as any)?.props?.expandedSize === 'number'
          ? (panelEl as any).props.expandedSize
          : 288;
      const hasRail = Boolean(railEl);
      const hasPanel = Boolean(panelEl);
      const includePanel =
        hasPanel && (shell.panelMode === 'expanded' || shell.peekTarget === 'panel');
      const floatingWidthPx = (hasRail ? railSize : 0) + (includePanel ? panelSize : 0);

      return (
        <div
          {...props}
          ref={setRef}
          className={classNames('rt-ShellLeft', className)}
          data-mode={shell.leftMode}
          data-peek={
            shell.peekTarget === 'left' ||
            shell.peekTarget === 'rail' ||
            shell.peekTarget === 'panel' ||
            undefined
          }
          data-presentation={resolvedPresentation}
          style={{
            ...style,
          }}
          data-open={open || undefined}
        >
          {children}
        </div>
      );
    }

    return (
      <div
        {...props}
        ref={setRef}
        className={classNames('rt-ShellLeft', className)}
        data-mode={shell.leftMode}
        data-peek={
          shell.peekTarget === 'left' ||
          shell.peekTarget === 'rail' ||
          shell.peekTarget === 'panel' ||
          undefined
        }
        data-presentation={resolvedPresentation}
        style={{
          ...style,
        }}
      >
        {children}
      </div>
    );
  },
);
Left.displayName = 'Shell.Left';

const Rail = React.forwardRef<HTMLDivElement, RailProps>(
  (
    {
      className,
      presentation,
      mode,
      defaultMode,
      onModeChange,
      expandedSize = 64,
      collapsible,
      onExpand,
      onCollapse,
      children,
      style,
      ...props
    },
    ref,
  ) => {
    const shell = useShell();

    // Register expanded size with Left container
    React.useEffect(() => {
      (shell as any).onRailDefaults?.(expandedSize);
    }, [shell, expandedSize]);

    const isExpanded = shell.leftMode === 'expanded';

    return (
      <div
        {...props}
        ref={ref}
        className={classNames('rt-ShellRail', className)}
        data-mode={shell.leftMode}
        data-peek={
          (shell.leftResolvedPresentation !== 'overlay' && shell.peekTarget === 'rail') || undefined
        }
        style={{
          ...style,
          ['--rail-size' as any]: `${expandedSize}px`,
        }}
      >
        <div
          className="rt-ShellRailContent"
          data-visible={
            isExpanded ||
            (shell.leftResolvedPresentation !== 'overlay' && shell.peekTarget === 'rail') ||
            undefined
          }
        >
          {children}
        </div>
      </div>
    );
  },
);
Rail.displayName = 'Shell.Rail';

// Panel
type HandleComponent = React.ForwardRefExoticComponent<
  React.ComponentPropsWithoutRef<'div'> & React.RefAttributes<HTMLDivElement>
>;

type PanelComponent = React.ForwardRefExoticComponent<
  Omit<PaneProps, 'defaultMode'> & React.RefAttributes<HTMLDivElement>
> & { Handle: HandleComponent };

type SidebarComponent = React.ForwardRefExoticComponent<
  (Omit<PaneProps, 'mode' | 'defaultMode' | 'onModeChange'> & {
    mode?: SidebarMode;
    defaultMode?: ResponsiveSidebarMode;
    onModeChange?: (mode: SidebarMode) => void;
    thinSize?: number;
    toggleModes?: Array<'thin' | 'expanded'>;
  }) &
    React.RefAttributes<HTMLDivElement>
> & { Handle: HandleComponent };

type InspectorComponent = React.ForwardRefExoticComponent<
  PaneProps & React.RefAttributes<HTMLDivElement>
> & { Handle: HandleComponent };

type BottomComponent = React.ForwardRefExoticComponent<
  PaneProps & React.RefAttributes<HTMLDivElement>
> & { Handle: HandleComponent };

const Panel = React.forwardRef<HTMLDivElement, Omit<PaneProps, 'presentation' | 'defaultMode'>>(
  (
    {
      className,
      mode,
      onModeChange,
      expandedSize = 288,
      minSize,
      maxSize,
      resizable,
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
    React.useEffect(() => {
      (shell as any).onPanelDefaults?.(expandedSize);
    }, [shell, expandedSize]);
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
    const handleChildren = childArray.filter(
      (el: React.ReactElement) => React.isValidElement(el) && el.type === PanelHandle,
    );
    const contentChildren = childArray.filter(
      (el: React.ReactElement) => !(React.isValidElement(el) && el.type === PanelHandle),
    );

    const isOverlay = shell.leftResolvedPresentation === 'overlay';

    // Derive a default persistence adapter from paneId if none provided
    const persistenceAdapter = React.useMemo(() => {
      if (!paneId || persistence) return persistence;
      const key = `kookie-ui:shell:panel:${paneId}`;
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

    // Load persisted size if configured (only in fixed presentation)
    React.useEffect(() => {
      let mounted = true;
      (async () => {
        if (!resizable || !persistenceAdapter?.load || isOverlay) return;
        const loaded = await persistenceAdapter.load();
        if (mounted && typeof loaded === 'number' && localRef.current) {
          localRef.current.style.setProperty('--panel-size', `${loaded}px`);
          onResize?.(loaded);
        }
      })();
      return () => {
        mounted = false;
      };
    }, [resizable, persistenceAdapter, onResize, isOverlay]);

    // In overlay, ensure panel uses the fixed expandedSize, ignoring any persisted size
    React.useEffect(() => {
      if (!localRef.current) return;
      if (isOverlay) {
        localRef.current.style.setProperty('--panel-size', `${expandedSize}px`);
      }
    }, [isOverlay, expandedSize]);

    // Ensure Left container width is auto whenever Panel is expanded in fixed presentation
    React.useEffect(() => {
      if (!localRef.current) return;
      if (
        shell.leftResolvedPresentation !== 'overlay' &&
        shell.leftMode === 'expanded' &&
        shell.panelMode === 'expanded'
      ) {
        const leftEl = (localRef.current.parentElement as HTMLElement) || null;
        try {
          leftEl?.style.removeProperty('width');
        } catch {}
      }
    }, [shell.leftResolvedPresentation, shell.leftMode, shell.panelMode]);

    const isExpanded = shell.leftMode === 'expanded' && shell.panelMode === 'expanded';

    // Provide resizer handle when fixed (not overlay)
    const handleEl =
      resizable && shell.leftResolvedPresentation !== 'overlay' && isExpanded ? (
        <PaneResizeContext.Provider
          value={{
            containerRef: localRef,
            cssVarName: '--panel-size',
            minSize: typeof minSize === 'number' ? minSize : 100,
            maxSize: typeof maxSize === 'number' ? maxSize : 800,
            defaultSize: expandedSize,
            orientation: 'vertical',
            edge: 'end',
            computeNext: (client, startClient, startSize) => {
              const isRtl = getComputedStyle(localRef.current!).direction === 'rtl';
              const delta = client - startClient;
              return startSize + (isRtl ? -delta : delta);
            },
            onResize,
            onResizeStart: (size) => {
              // Ensure Left container is not stuck with a fixed width in stacked
              const panelEl = localRef.current as HTMLElement | null;
              const leftEl = panelEl?.parentElement as HTMLElement | null;
              try {
                leftEl?.style.removeProperty('width');
              } catch {}
              onResizeStart?.(size);
            },
            onResizeEnd: (size) => {
              onResizeEnd?.(size);
              persistenceAdapter?.save?.(size);
            },
            target: 'panel',
            collapsible: Boolean(collapsible),
            snapPoints,
            snapTolerance: snapTolerance ?? 8,
            collapseThreshold,
            requestCollapse: () => shell.setPanelMode('collapsed'),
            requestToggle: () => shell.togglePane('panel'),
          }}
        >
          {handleChildren.length > 0 ? (
            handleChildren.map((el, i) => React.cloneElement(el, { key: el.key ?? i }))
          ) : (
            <PaneHandle />
          )}
        </PaneResizeContext.Provider>
      ) : null;

    return (
      <div
        {...props}
        ref={setRef}
        className={classNames('rt-ShellPanel', className)}
        data-mode={shell.panelMode}
        data-visible={
          isExpanded ||
          (shell.leftResolvedPresentation !== 'overlay' && shell.peekTarget === 'panel') ||
          undefined
        }
        data-peek={
          (shell.leftResolvedPresentation !== 'overlay' && shell.peekTarget === 'panel') ||
          undefined
        }
        style={{
          ...style,
          ['--panel-size' as any]: `${expandedSize}px`,
        }}
      >
        <div className="rt-ShellPanelContent" data-visible={isExpanded || undefined}>
          {contentChildren}
        </div>
        {handleEl}
      </div>
    );
  },
) as PanelComponent;
Panel.displayName = 'Shell.Panel';
Panel.Handle = PanelHandle;

// Sidebar (alternative to Rail+Panel)
const Sidebar = React.forwardRef<
  HTMLDivElement,
  Omit<PaneProps, 'mode' | 'defaultMode' | 'onModeChange'> & {
    mode?: SidebarMode;
    defaultMode?: ResponsiveSidebarMode;
    onModeChange?: (mode: SidebarMode) => void;
    thinSize?: number;
    toggleModes?: Array<'thin' | 'expanded'>;
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
    const handleChildren = childArray.filter(
      (el: React.ReactElement) => React.isValidElement(el) && el.type === SidebarHandle,
    );
    const contentChildren = childArray.filter(
      (el: React.ReactElement) => !(React.isValidElement(el) && el.type === SidebarHandle),
    );

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

    // Register custom toggle behavior based on toggleModes
    const shellForToggle = useShell();
    React.useEffect(() => {
      if (!shellForToggle.setSidebarToggleComputer) return;
      // Build cycle from provided modes (defaults to both)
      const enabled = (
        toggleModes && toggleModes.length > 0 ? toggleModes : (['thin', 'expanded'] as const)
      ) as Array<'thin' | 'expanded'>;
      const compute = (current: SidebarMode): SidebarMode => {
        if (current === 'collapsed') return enabled[0] ?? 'expanded';
        if (current === 'thin') {
          // if thin not enabled, go to collapsed; else if expanded enabled go expanded; else collapsed
          return enabled.includes('thin')
            ? enabled.includes('expanded')
              ? 'expanded'
              : 'collapsed'
            : 'collapsed';
        }
        // expanded
        if (enabled.length === 2 && enabled.includes('thin') && enabled.includes('expanded')) {
          return 'collapsed';
        }
        // if only expanded enabled, collapse next; if only thin enabled, go thin next
        return enabled.includes('thin') && !enabled.includes('expanded') ? 'thin' : 'collapsed';
      };
      shellForToggle.setSidebarToggleComputer(compute);
      return () => {
        // reset to default sequence when unmounting this Sidebar
        shellForToggle.setSidebarToggleComputer?.((cur) =>
          cur === 'collapsed' ? 'thin' : cur === 'thin' ? 'expanded' : 'collapsed',
        );
      };
    }, [shellForToggle, toggleModes]);

    // Preserve last non-collapsed width for smooth overlay close animation
    const lastOverlayWidthRef = React.useRef<number>(expandedSize);
    const lastOverlayModeRef = React.useRef<SidebarMode>('expanded');
    React.useEffect(() => {
      if (shell.sidebarMode !== 'collapsed') {
        lastOverlayModeRef.current = shell.sidebarMode as SidebarMode;
        lastOverlayWidthRef.current = shell.sidebarMode === 'thin' ? thinSize : expandedSize;
      }
    }, [shell.sidebarMode, thinSize, expandedSize]);

    // Always-follow responsive defaultMode for uncontrolled Sidebar (on breakpoint change only)
    const resolveResponsiveMode = React.useCallback((): SidebarMode => {
      if (typeof defaultMode === 'string') return defaultMode as SidebarMode;
      const dm = defaultMode as Partial<Record<Breakpoint, SidebarMode>> | undefined;
      if (dm && dm[shell.currentBreakpoint as Breakpoint]) {
        return dm[shell.currentBreakpoint as Breakpoint] as SidebarMode;
      }
      const bpKeys = Object.keys(BREAKPOINTS) as Array<keyof typeof BREAKPOINTS>;
      const order: Breakpoint[] = ([...bpKeys].reverse() as Breakpoint[]).concat(
        'initial' as Breakpoint,
      );
      const startIdx = order.indexOf(shell.currentBreakpoint as Breakpoint);
      for (let i = startIdx + 1; i < order.length; i++) {
        const bp = order[i];
        if (dm && dm[bp]) return dm[bp] as SidebarMode;
      }
      return 'collapsed';
    }, [defaultMode, shell.currentBreakpoint]);

    const lastSidebarBpRef = React.useRef<Breakpoint | null>(null);
    React.useEffect(() => {
      if (mode !== undefined) return; // controlled wins
      if (!shell.currentBreakpointReady) return; // avoid SSR mismatch
      if (lastSidebarBpRef.current === shell.currentBreakpoint) return; // only on bp change
      lastSidebarBpRef.current = shell.currentBreakpoint as Breakpoint;
      const next = resolveResponsiveMode();
      if (next !== shell.sidebarMode) shell.setSidebarMode(next);
    }, [
      mode,
      shell.currentBreakpoint,
      shell.currentBreakpointReady,
      resolveResponsiveMode,
      shell.sidebarMode,
      shell.setSidebarMode,
    ]);

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
          {handleChildren.length > 0 ? (
            handleChildren.map((el, i) => React.cloneElement(el, { key: el.key ?? i }))
          ) : (
            <PaneHandle />
          )}
        </PaneResizeContext.Provider>
      ) : null;

    if (isOverlay) {
      const open = shell.sidebarMode !== 'collapsed';
      return (
        <Sheet.Root
          open={open}
          onOpenChange={(o) => shell.setSidebarMode(o ? 'expanded' : 'collapsed')}
        >
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
            {children}
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
        style={{
          ...style,
          ['--sidebar-size' as any]: `${expandedSize}px`,
          ['--sidebar-thin-size' as any]: `${thinSize}px`,
          ['--sidebar-min-size' as any]: `${minSize}px`,
          ['--sidebar-max-size' as any]: `${maxSize}px`,
          // When peeking in fixed presentation, use the next toggle target's width (thin or expanded)
          ...(shell.peekTarget === 'sidebar' && !isOverlay
            ? (() => {
                const enabled = (
                  toggleModes && toggleModes.length > 0
                    ? toggleModes
                    : (['thin', 'expanded'] as const)
                ) as Array<'thin' | 'expanded'>;
                const current = shell.sidebarMode as SidebarMode;
                let next: SidebarMode = 'collapsed';
                if (current === 'collapsed') {
                  next = (enabled[0] ?? 'expanded') as SidebarMode;
                } else if (current === 'thin') {
                  next = enabled.includes('expanded') ? 'expanded' : 'collapsed';
                } else {
                  next = enabled.includes('thin') ? 'thin' : 'collapsed';
                }
                const peekWidth = next === 'thin' ? thinSize : expandedSize;
                return { ['--peek-sidebar-width' as any]: `${peekWidth}px` } as React.CSSProperties;
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

// Content (always required)
interface ShellContentProps extends React.ComponentPropsWithoutRef<'main'> {}

const Content = React.forwardRef<HTMLElement, ShellContentProps>(({ className, ...props }, ref) => (
  <main {...props} ref={ref} className={classNames('rt-ShellContent', className)} />
));
Content.displayName = 'Shell.Content';

// Inspector
const Inspector = React.forwardRef<HTMLDivElement, PaneProps>(
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
    const handleChildren = childArray.filter(
      (el: React.ReactElement) => React.isValidElement(el) && el.type === InspectorHandle,
    );
    const contentChildren = childArray.filter(
      (el: React.ReactElement) => !(React.isValidElement(el) && el.type === InspectorHandle),
    );

    // Apply responsive defaultMode only on mount and when breakpoint changes (uncontrolled Inspector)
    const resolveResponsiveMode = React.useCallback((): PaneMode => {
      if (typeof defaultMode === 'string') return defaultMode as PaneMode;
      const dm = defaultMode as Partial<Record<Breakpoint, PaneMode>> | undefined;
      if (dm && dm[shell.currentBreakpoint as Breakpoint]) {
        return dm[shell.currentBreakpoint as Breakpoint] as PaneMode;
      }
      const bpKeys = Object.keys(BREAKPOINTS) as Array<keyof typeof BREAKPOINTS>;
      const order: Breakpoint[] = ([...bpKeys].reverse() as Breakpoint[]).concat(
        'initial' as Breakpoint,
      );
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
      if (mode !== undefined) return; // controlled wins
      if (!shell.currentBreakpointReady) return; // avoid SSR mismatch
      if (lastInspectorBpRef.current === shell.currentBreakpoint) return; // only on bp change
      lastInspectorBpRef.current = shell.currentBreakpoint as Breakpoint;
      const next = resolveResponsiveMode();
      if (next !== shell.inspectorMode) {
        shell.setInspectorMode(next);
      }
    }, [
      mode,
      shell.currentBreakpoint,
      shell.currentBreakpointReady,
      resolveResponsiveMode,
      shell.inspectorMode,
      shell.setInspectorMode,
    ]);

    // Sync controlled mode
    React.useEffect(() => {
      if (mode !== undefined && shell.inspectorMode !== mode) {
        shell.setInspectorMode(mode);
      }
    }, [mode, shell]);

    // Emit mode changes
    React.useEffect(() => {
      if (mode === undefined) {
        onModeChange?.(shell.inspectorMode);
      }
    }, [shell.inspectorMode, mode, onModeChange]);

    // Emit expand/collapse events
    React.useEffect(() => {
      if (shell.inspectorMode === 'expanded') {
        onExpand?.();
      } else {
        onCollapse?.();
      }
    }, [shell.inspectorMode, onExpand, onCollapse]);

    const isExpanded = shell.inspectorMode === 'expanded';

    // Default persistence if paneId provided and none supplied (fixed only)
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
              // start edge; reverse for LTR
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
          {handleChildren.length > 0 ? (
            handleChildren.map((el, i) => React.cloneElement(el, { key: el.key ?? i }))
          ) : (
            <PaneHandle />
          )}
        </PaneResizeContext.Provider>
      ) : null;

    if (isOverlay) {
      const open = shell.inspectorMode === 'expanded';
      return (
        <Sheet.Root
          open={open}
          onOpenChange={(o) => shell.setInspectorMode(o ? 'expanded' : 'collapsed')}
        >
          <Sheet.Content side="end" style={{ padding: 0 }} width={{ initial: `${expandedSize}px` }}>
            <VisuallyHidden>
              <Sheet.Title>Inspector</Sheet.Title>
            </VisuallyHidden>
            {children}
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

// Bottom
const Bottom = React.forwardRef<HTMLDivElement, PaneProps>(
  (
    {
      className,
      presentation = 'fixed', // Bottom is usually fixed
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
    const handleChildren = childArray.filter(
      (el: React.ReactElement) => React.isValidElement(el) && el.type === BottomHandle,
    );
    const contentChildren = childArray.filter(
      (el: React.ReactElement) => !(React.isValidElement(el) && el.type === BottomHandle),
    );

    // Honor defaultMode on mount when uncontrolled
    const didInitRef = React.useRef(false);
    React.useEffect(() => {
      if (didInitRef.current) return;
      didInitRef.current = true;
      if (mode === undefined && shell.bottomMode !== (defaultMode as PaneMode)) {
        shell.setBottomMode(defaultMode as PaneMode);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Sync controlled mode
    React.useEffect(() => {
      if (mode !== undefined && shell.bottomMode !== mode) {
        shell.setBottomMode(mode);
      }
    }, [mode, shell]);

    // Emit mode changes
    React.useEffect(() => {
      if (mode === undefined) {
        onModeChange?.(shell.bottomMode);
      }
    }, [shell.bottomMode, mode, onModeChange]);

    // Emit expand/collapse events
    React.useEffect(() => {
      if (shell.bottomMode === 'expanded') {
        onExpand?.();
      } else {
        onCollapse?.();
      }
    }, [shell.bottomMode, onExpand, onCollapse]);

    const isExpanded = shell.bottomMode === 'expanded';

    // Default persistence if paneId provided and none supplied (fixed only)
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
              return startSize - delta; // drag up reduces size
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
          {handleChildren.length > 0 ? (
            handleChildren.map((el, i) => React.cloneElement(el, { key: el.key ?? i }))
          ) : (
            <PaneHandle />
          )}
        </PaneResizeContext.Provider>
      ) : null;

    if (isOverlay) {
      const open = shell.bottomMode === 'expanded';
      return (
        <Sheet.Root
          open={open}
          onOpenChange={(o) => shell.setBottomMode(o ? 'expanded' : 'collapsed')}
        >
          <Sheet.Content
            side="bottom"
            style={{ padding: 0 }}
            height={{ initial: `${expandedSize}px` }}
          >
            <VisuallyHidden>
              <Sheet.Title>Bottom panel</Sheet.Title>
            </VisuallyHidden>
            {children}
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

// Trigger
type PaneTarget = 'left' | 'rail' | 'panel' | 'sidebar' | 'inspector' | 'bottom';
type TriggerAction = 'toggle' | 'expand' | 'collapse';

interface TriggerProps extends React.ComponentPropsWithoutRef<'button'> {
  target: PaneTarget;
  action?: TriggerAction;
  /**
   * If true, peeks the target on hover and clears on leave.
   * If set to 'collapsed', only peeks when the target is currently collapsed (recommended).
   */
  peekOnHover?: boolean | 'collapsed';
}

const Trigger = React.forwardRef<HTMLButtonElement, TriggerProps>(
  (
    {
      target,
      action = 'toggle',
      peekOnHover,
      onClick,
      onMouseEnter,
      onMouseLeave,
      children,
      ...props
    },
    ref,
  ) => {
    const shell = useShell();

    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);

        switch (action) {
          case 'toggle':
            shell.togglePane(target);
            break;
          case 'expand':
            shell.expandPane(target);
            break;
          case 'collapse':
            shell.collapsePane(target);
            break;
        }
      },
      [shell, target, action, onClick],
    );

    const isCollapsed = (() => {
      switch (target) {
        case 'left':
        case 'rail':
          return shell.leftMode === 'collapsed';
        case 'panel':
          return shell.leftMode === 'collapsed' || shell.panelMode === 'collapsed';
        case 'sidebar':
          return shell.sidebarMode === 'collapsed';
        case 'inspector':
          return shell.inspectorMode === 'collapsed';
        case 'bottom':
          return shell.bottomMode === 'collapsed';
      }
    })();

    const handleMouseEnter = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onMouseEnter?.(event);
        if (!peekOnHover) return;
        const shouldPeek = peekOnHover === 'collapsed' ? isCollapsed : true;
        if (shouldPeek) {
          // Use the actual target for peek behavior (not mapped to left)
          shell.peekPane(target);
        }
      },
      [onMouseEnter, peekOnHover, isCollapsed, shell, target],
    );

    const handleMouseLeave = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onMouseLeave?.(event);
        if (!peekOnHover) return;
        if ((shell as any).peekTarget === target) {
          shell.clearPeek();
        }
      },
      [onMouseLeave, peekOnHover, shell, target],
    );

    return (
      <button
        {...props}
        ref={ref}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        data-shell-trigger={target}
        data-shell-action={action}
      >
        {children}
      </button>
    );
  },
);
Trigger.displayName = 'Shell.Trigger';

// Exports
export {
  Root,
  Header,
  Left,
  Rail,
  Panel,
  Sidebar,
  Content,
  Inspector,
  Bottom,
  Trigger,
  useShell,
  useResponsivePresentation,
  type PaneMode,
  type SidebarMode,
  type ResponsivePresentation,
  type PaneTarget,
  type TriggerAction,
};
