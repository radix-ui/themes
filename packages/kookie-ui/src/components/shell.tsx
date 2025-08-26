/**
 * Shell component
 *
 * High-level application layout primitive with optional global header/footer and
 * one or two sidebars. Each sidebar supports two composition patterns:
 *
 * 1) Split pattern (preferred for interactive rails):
 *    <Shell.Sidebar>
 *      <Shell.Sidebar.Rail />
 *      <Shell.Sidebar.Panel />
 *    </Shell.Sidebar>
 *
 * 2) Single-markup morphing (compact):
 *    <Shell.Sidebar> ...single content that morphs between rail/panel/collapsed </Shell.Sidebar>
 *
 * The component handles:
 * - RTL/LTR ordering for start/end sidebars
 * - Sticky panel intent in split mode (panel stays requested, visibility depends on rail open state)
 * - Controlled/uncontrolled state for both split (rail value) and single-markup (view)
 * - ARIA relationships and inert for hidden regions
 * - CSS custom properties for sizing with sensible defaults
 *
 * Layout guidance:
 * - Use flex/grid and spacing tokens; avoid margins in layout containers.
 * - Width transitions for rail/panel are CSS-driven; content scroll is confined to Content only.
 */
'use client';

import * as React from 'react';
import classNames from 'classnames';

import { IconButton } from './icon-button.js';
import { ChevronDownIcon } from './icons.js';
import { inert } from '../helpers/inert.js';
import * as Sheet from './sheet.js';
import { VisuallyHidden } from './visually-hidden.js';
import { ShellSidebarSectionContext } from './sidebar.js';

import type { ShellSidebarSectionContextValue } from './sidebar.js';

/** Logical document direction. Derived from document root unless `rtl` is passed. */
type ShellDirection = 'ltr' | 'rtl';
/** Logical side, independent of physical left/right and aware of RTL. */
type ShellSide = 'start' | 'end';
/** Section slot identifiers inside a sidebar. */
type SidebarSection = 'rail' | 'panel';

/** Split-mode rail state. */
type RailValue = 'open' | 'collapsed';
/** Single-markup view for morphing sidebars. */
type SingleView = 'panel' | 'rail' | 'collapsed';

/**
 * Shared shell state across all subcomponents.
 *
 * We centralize both split-mode and single-markup state to allow triggers,
 * meters, and other UI to observe/modify layout consistently.
 */
type ShellContextValue = {
  dir: ShellDirection;
  headerHeight: string;
  zHeader?: number;
  // Split pattern state (rail + panel)
  railBySide: Record<ShellSide, RailValue>;
  setRailBySide: (side: ShellSide, value: RailValue) => void;
  toggleRail: (side: ShellSide) => void;
  panelRequestedBySide: Record<ShellSide, boolean>;
  setPanelRequestedBySide: (side: ShellSide, requested: boolean) => void;
  // Pattern detection per side so triggers behave correctly
  patternBySide: Record<ShellSide, 'single' | 'split'>;
  setPatternForSide: (side: ShellSide, pattern: 'single' | 'split') => void;
  // Single-markup morph state (panel/rail/collapsed)
  singleViewBySide: Record<ShellSide, SingleView>;
  setSingleViewBySide: (side: ShellSide, view: SingleView) => void;
  cycleSingleView: (side: ShellSide) => void;
  // Active tool coordination state
  activeToolBySide: Record<ShellSide, string | null>;
  setActiveTool: (side: ShellSide, tool: string | null) => void;
  onItemSelected: (side: ShellSide, item: string) => void;
  // Context (panel-level) coordination state
  activeContextBySide: Record<ShellSide, string | null>;
  setActiveContext: (side: ShellSide, context: string | null) => void;
  getRegionId: (side: ShellSide) => string;
  getPanelId: (side: ShellSide) => string;
  getRailId: (side: ShellSide) => string;
};

const ShellContext = React.createContext<ShellContextValue | null>(null);

/** Access the shell context (internal wiring for subcomponents). */
function useShell() {
  const ctx = React.useContext(ShellContext);
  if (!ctx) throw new Error('Shell components must be used within <Shell.Root>.');
  return ctx;
}

// Local context to communicate section (rail/panel) and side to presentational children
type SidebarSectionContextValue = {
  side: ShellSide;
  section: SidebarSection;
};
const SidebarSectionContext = React.createContext<SidebarSectionContextValue | null>(null);
function useSidebarSection() {
  return React.useContext(SidebarSectionContext);
}

// Rail context for event emission pattern
type RailContextValue = {
  onItemSelected: (item: string) => void;
};
const RailContext = React.createContext<RailContextValue | null>(null);

/** Hook to emit rail selection events. Use this in Rail children to emit item selection. */
function useRailEvents() {
  const ctx = React.useContext(RailContext);
  if (!ctx) throw new Error('useRailEvents must be used within <Shell.Sidebar.Rail>');
  return ctx;
}

// Panel context for active tool consumption
type PanelContextValue = {
  activeTool: string | null;
  activeContext: string | null;
};
const PanelContext = React.createContext<PanelContextValue | null>(null);

/** Hook to access active tool state. Use this in Panel children to render based on active tool. */
function usePanelState() {
  const ctx = React.useContext(PanelContext);
  if (!ctx) throw new Error('usePanelState must be used within <Shell.Sidebar.Panel>');
  return ctx;
}

// Utilities
/**
 * Read the document `dir` attribute. Defaults to `ltr` on server.
 */
function getDocumentDirection(): ShellDirection {
  if (typeof document === 'undefined') return 'ltr';
  const dir = document.documentElement.getAttribute('dir');
  return dir === 'rtl' ? 'rtl' : 'ltr';
}

// Root
/**
 * Props for `Shell.Root`.
 *
 * - `minContentWidth`: CSS length to enforce a minimum inline-size for content
 *   area. This prevents content from collapsing too far when sidebars are open.
 * - `rtl`: Force RTL/LTR independent of document; otherwise derived from root.
 * - `headerHeight`: Sticky header block-size.
 * - `zHeader`: z-index for sticky header stacking.
 */
interface ShellRootProps extends React.ComponentPropsWithoutRef<'div'> {
  minContentWidth?: string;
  rtl?: boolean;
  headerHeight?: string;
  zHeader?: number;
  cascadeSide?: ShellSide;
  activeTool?: string | null;
  onToolChange?: (id: string | null) => void;
  activeContext?: string | null;
  onContextChange?: (id: string | null) => void;
}

const Root = React.forwardRef<HTMLDivElement, ShellRootProps>(
  (
    {
      minContentWidth = '640px',
      rtl,
      headerHeight = '64px',
      zHeader,
      cascadeSide = 'start',
      activeTool: activeToolProp,
      onToolChange,
      activeContext: activeContextProp,
      onContextChange,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    // Determine logical direction once, overriding document if `rtl` provided
    const computedDir = React.useMemo<ShellDirection>(() => {
      if (typeof rtl === 'boolean') return rtl ? 'rtl' : 'ltr';
      return getDocumentDirection();
    }, [rtl]);

    // === Split-mode and single-markup state model ===
    // In split-mode, a sidebar has both Rail and Panel slots. We track:
    // - rail open/collapsed state per side
    // - a sticky panel intent per side (requested or not)
    // In single-markup, we track a single `view` morphing between panel/rail/collapsed
    const [railBySide, setRailBySideState] = React.useState<Record<ShellSide, RailValue>>({
      start: 'open',
      end: 'collapsed',
    });
    const setRailBySide = React.useCallback((side: ShellSide, value: RailValue) => {
      setRailBySideState((prev) => (prev[side] === value ? prev : { ...prev, [side]: value }));
    }, []);
    const toggleRail = React.useCallback((side: ShellSide) => {
      setRailBySideState((prev) => {
        const next = prev[side] === 'open' ? 'collapsed' : 'open';
        return { ...prev, [side]: next };
      });
      // Keep panelRequested sticky across rail collapse/expand
    }, []);
    const [panelRequestedBySide, setPanelRequestedBySideState] = React.useState<
      Record<ShellSide, boolean>
    >({ start: false, end: false });
    const setPanelRequestedBySide = React.useCallback((side: ShellSide, requested: boolean) => {
      setPanelRequestedBySideState((prev) =>
        prev[side] === requested ? prev : { ...prev, [side]: requested },
      );
    }, []);
    // Pattern per side and single-markup state
    // We detect pattern per side based on presence of slots (registered by Sidebar)
    const [patternBySide, setPatternBySide] = React.useState<Record<ShellSide, 'single' | 'split'>>(
      {
        start: 'single',
        end: 'single',
      },
    );
    const setPatternForSide = React.useCallback((side: ShellSide, pattern: 'single' | 'split') => {
      setPatternBySide((prev) => (prev[side] === pattern ? prev : { ...prev, [side]: pattern }));
    }, []);
    const [singleViewBySide, setSingleViewBySideState] = React.useState<
      Record<ShellSide, SingleView>
    >({
      start: 'panel',
      end: 'collapsed',
    });
    const setSingleViewBySide = React.useCallback((side: ShellSide, view: SingleView) => {
      setSingleViewBySideState((prev) => (prev[side] === view ? prev : { ...prev, [side]: view }));
    }, []);
    const cycleSingleView = React.useCallback(
      (side: ShellSide) => {
        const order: SingleView[] = ['panel', 'rail', 'collapsed'];
        const current = singleViewBySide[side];
        const idx = order.indexOf(current);
        const next = order[(idx + 1) % order.length];
        setSingleViewBySide(side, next);
      },
      [singleViewBySide, setSingleViewBySide],
    );

    // === Active tool coordination state ===
    // Track which tool/mode is active per side for coordinated rail/panel communication
    const [activeToolBySide, setActiveToolBySideState] = React.useState<
      Record<ShellSide, string | null>
    >({
      start: null,
      end: null,
    });
    const setActiveTool = React.useCallback(
      (side: ShellSide, tool: string | null) => {
        setActiveToolBySideState((prev) =>
          prev[side] === tool ? prev : { ...prev, [side]: tool },
        );
        // Auto-hide panel when no tool is active
        if (tool === null) {
          setPanelRequestedBySide(side, false);
        }
      },
      [setPanelRequestedBySide],
    );
    const onItemSelected = React.useCallback(
      (side: ShellSide, item: string) => {
        setActiveTool(side, item);
        // Auto-show panel when item is selected
        setPanelRequestedBySide(side, true);
      },
      [setActiveTool, setPanelRequestedBySide],
    );

    // === Active context coordination state ===
    const [activeContextBySide, setActiveContextBySideState] = React.useState<
      Record<ShellSide, string | null>
    >({ start: null, end: null });
    const setActiveContext = React.useCallback(
      (side: ShellSide, context: string | null) => {
        setActiveContextBySideState((prev) =>
          prev[side] === context ? prev : { ...prev, [side]: context },
        );
        if (side === cascadeSide) onContextChange?.(context);
      },
      [cascadeSide, onContextChange],
    );

    // === Controlled prop sync (cascade side) ===
    React.useEffect(() => {
      if (activeToolProp !== undefined && activeToolBySide[cascadeSide] !== activeToolProp) {
        setActiveToolBySideState((prev) => ({ ...prev, [cascadeSide]: activeToolProp }));
      }
    }, [activeToolProp, cascadeSide, activeToolBySide]);
    React.useEffect(() => {
      if (
        activeContextProp !== undefined &&
        activeContextBySide[cascadeSide] !== activeContextProp
      ) {
        setActiveContextBySideState((prev) => ({ ...prev, [cascadeSide]: activeContextProp }));
      }
    }, [activeContextProp, cascadeSide, activeContextBySide]);

    // === Stable ids per side ===
    // These IDs are used to wire aria-controls and aria-expanded for triggers,
    // and to scope region/panel/rail DOM nodes for measurement.
    const startRegionId = React.useId();
    const endRegionId = React.useId();
    const startPanelId = React.useId();
    const endPanelId = React.useId();
    const startRailId = React.useId();
    const endRailId = React.useId();
    const getRegionId = React.useCallback(
      (side: ShellSide) =>
        side === 'start' ? `kui-shell-region-${startRegionId}` : `kui-shell-region-${endRegionId}`,
      [startRegionId, endRegionId],
    );
    const getPanelId = React.useCallback(
      (side: ShellSide) =>
        side === 'start' ? `kui-shell-panel-${startPanelId}` : `kui-shell-panel-${endPanelId}`,
      [startPanelId, endPanelId],
    );
    const getRailId = React.useCallback(
      (side: ShellSide) =>
        side === 'start' ? `kui-shell-rail-${startRailId}` : `kui-shell-rail-${endRailId}`,
      [startRailId, endRailId],
    );

    const ctx = React.useMemo<ShellContextValue>(
      () => ({
        dir: computedDir,
        headerHeight,
        zHeader,
        railBySide,
        setRailBySide,
        toggleRail,
        panelRequestedBySide,
        setPanelRequestedBySide,
        patternBySide,
        setPatternForSide,
        singleViewBySide,
        setSingleViewBySide,
        cycleSingleView,
        activeToolBySide,
        setActiveTool,
        onItemSelected,
        activeContextBySide,
        setActiveContext,
        getRegionId,
        getPanelId,
        getRailId,
      }),
      [
        computedDir,
        headerHeight,
        zHeader,
        railBySide,
        setRailBySide,
        toggleRail,
        panelRequestedBySide,
        setPanelRequestedBySide,
        patternBySide,
        setPatternForSide,
        singleViewBySide,
        setSingleViewBySide,
        cycleSingleView,
        activeToolBySide,
        setActiveTool,
        onItemSelected,
        activeContextBySide,
        setActiveContext,
        getRegionId,
        getPanelId,
        getRailId,
      ],
    );

    // === Composition: order children based on direction ===
    const childArray = React.Children.toArray(children) as React.ReactElement[];
    const isType = (el: React.ReactElement, comp: any) =>
      React.isValidElement(el) && el.type === comp;
    const headerEls = childArray.filter((el) => isType(el, Header));
    const footerEls = childArray.filter((el) => isType(el, Footer));
    const contentEls = childArray.filter((el) => isType(el, Content));
    const sidebarEls = childArray.filter((el) => isType(el, Sidebar));

    // Partition sidebars by side
    const startSidebars = sidebarEls.filter((el) => (el.props as any).side === 'start');
    const endSidebars = sidebarEls.filter((el) => (el.props as any).side === 'end');

    const bodyChildren =
      computedDir === 'rtl'
        ? [...endSidebars, ...contentEls, ...startSidebars]
        : [...startSidebars, ...contentEls, ...endSidebars];

    return (
      <div
        {...props}
        ref={ref}
        className={classNames('rt-ShellRoot', className)}
        style={{
          ...style,
          // Internal CSS custom props for sizing
          ['--shell-min-content-width' as any]: minContentWidth,
          ['--shell-header-height' as any]: headerHeight,
        }}
        dir={computedDir}
      >
        <ShellContext.Provider value={ctx}>
          {headerEls}
          <div className="rt-ShellBody">{bodyChildren}</div>
          {footerEls}
        </ShellContext.Provider>
      </div>
    );
  },
);
Root.displayName = 'Shell.Root';

// Global Header
/** Props for `Shell.Header`. Sticky by default and respects `--shell-header-height`. */
interface ShellHeaderProps extends React.ComponentPropsWithoutRef<'header'> {}
const Header = React.forwardRef<HTMLElement, ShellHeaderProps>(
  ({ className, style, ...props }, ref) => {
    const { headerHeight, zHeader } = useShell();
    return (
      <header
        {...props}
        ref={ref}
        role="banner"
        className={classNames('rt-ShellHeader', className)}
        style={{
          ['--shell-header-height' as any]: headerHeight,
          ['--shell-z-header' as any]: zHeader,
          ...style,
        }}
      />
    );
  },
);
Header.displayName = 'Shell.Header';

// Global Footer
/** Props for `Shell.Footer`. Rendered after body and outside the content scroll. */
interface ShellFooterProps extends React.ComponentPropsWithoutRef<'footer'> {}
const Footer = React.forwardRef<HTMLElement, ShellFooterProps>(({ className, ...props }, ref) => (
  <footer
    {...props}
    ref={ref}
    role="contentinfo"
    className={classNames('rt-ShellFooter', className)}
  />
));
Footer.displayName = 'Shell.Footer';

// Content
/** Props for `Shell.Content`. The only scrollable area of the Shell. */
interface ShellContentProps extends React.ComponentPropsWithoutRef<'main'> {}
const ContentBase = React.forwardRef<HTMLElement, ShellContentProps>(
  ({ className, ...props }, ref) => (
    <main {...props} ref={ref} className={classNames('rt-ShellContent', className)} />
  ),
);
ContentBase.displayName = 'Shell.Content';

const Content = ContentBase;

// Sidebar (stateful owner)
/**
 * `Shell.Sidebar` controls one logical side. It supports two patterns:
 * - Split pattern by providing both `Sidebar.Rail` and `Sidebar.Panel` children
 * - Single-markup morphing when no slots are provided
 *
 * Controlled/uncontrolled:
 * - Split: `value`/`defaultValue` reflect rail `open|collapsed`
 * - Single: `view`/`defaultView` reflect `panel|rail|collapsed`
 */
interface ShellSidebarProps extends React.ComponentPropsWithoutRef<'div'> {
  side: ShellSide;
  // Overlay: render as a top sheet rather than inline. Responsiveness handled separately.
  overlay?: boolean | Partial<Record<'initial' | 'xs' | 'sm' | 'md' | 'lg' | 'xl', boolean>>;
  overlaySide?: 'start' | 'end' | 'top' | 'bottom';
  // Split: rail control
  value?: RailValue;
  defaultValue?: RailValue;
  onValueChange?: (value: RailValue) => void;
  // Single-markup view control
  view?: SingleView;
  defaultView?: SingleView;
  onViewChange?: (view: SingleView) => void;
  as?: 'nav' | 'aside' | 'div';
  'aria-label'?: string;
}

// Rail
/** Rail component that provides event emission context for stateless navigation. */
interface RailProps extends React.ComponentPropsWithoutRef<'div'> {}
const Rail = Object.assign(
  React.forwardRef<HTMLDivElement, RailProps>(({ children }, _ref) => {
    const sidebarSection = useSidebarSection();
    const shell = useShell();
    const side = sidebarSection?.side ?? 'start';

    const railContext = React.useMemo<RailContextValue>(
      () => ({
        onItemSelected: (item: string) => shell.onItemSelected(side, item),
      }),
      [shell, side],
    );

    const sidebarSectionContext = React.useMemo<ShellSidebarSectionContextValue>(
      () => ({
        side,
        section: 'rail',
      }),
      [side],
    );

    return (
      <RailContext.Provider value={railContext}>
        <ShellSidebarSectionContext.Provider value={sidebarSectionContext}>
          {children}
        </ShellSidebarSectionContext.Provider>
      </RailContext.Provider>
    );
  }),
  { displayName: 'Shell.Sidebar.Rail', __shellSlot: 'rail' as const },
);

// Panel
/** Panel component that provides active tool context for stateless content rendering. */
interface PanelProps extends React.ComponentPropsWithoutRef<'div'> {}
const Panel = Object.assign(
  React.forwardRef<HTMLDivElement, PanelProps>(({ children }, _ref) => {
    const sidebarSection = useSidebarSection();
    const shell = useShell();
    const side = sidebarSection?.side ?? 'start';

    const panelContext = React.useMemo<PanelContextValue>(
      () => ({
        activeTool: shell.activeToolBySide[side],
        activeContext: shell.activeContextBySide[side],
      }),
      [shell.activeToolBySide, shell.activeContextBySide, side],
    );

    const sidebarSectionContext = React.useMemo<ShellSidebarSectionContextValue>(
      () => ({
        side,
        section: 'panel',
      }),
      [side],
    );

    return (
      <PanelContext.Provider value={panelContext}>
        <ShellSidebarSectionContext.Provider value={sidebarSectionContext}>
          {children}
        </ShellSidebarSectionContext.Provider>
      </PanelContext.Provider>
    );
  }),
  { displayName: 'Shell.Sidebar.Panel', __shellSlot: 'panel' as const },
);

type ShellSidebarComponent = React.ForwardRefExoticComponent<
  ShellSidebarProps & React.RefAttributes<HTMLDivElement>
> & {
  Rail: typeof Rail;
  Panel: typeof Panel;
  Trigger: typeof LocalTrigger;
};

const SidebarInner = (
  {
    side,
    overlay,
    overlaySide,
    value,
    defaultValue,
    onValueChange,
    view,
    defaultView,
    onViewChange,
    as = 'nav',
    className,
    style,
    children,
    ...props
  }: ShellSidebarProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) => {
  const shell = useShell();
  const Comp = as as any;

  const regionId = shell.getRegionId(side);
  const panelId = shell.getPanelId(side);
  const railId = shell.getRailId(side);

  const railChildren = childrenArrayOf(children, 'rail');
  const panelChildren = childrenArrayOf(children, 'panel');
  const hasRail = railChildren.length > 0;
  const hasPanel = panelChildren.length > 0;
  const hasSlots = hasRail || hasPanel;

  // Pattern registration per side
  React.useEffect(() => {
    shell.setPatternForSide(side, hasSlots && hasRail && hasPanel ? 'split' : 'single');
  }, [shell, side, hasSlots, hasRail, hasPanel]);

  // Initialize defaults (run once)
  const didInitRef = React.useRef(false);
  React.useEffect(() => {
    if (didInitRef.current) return;
    didInitRef.current = true;
    if (hasSlots) {
      // split: rail value
      const initial = value ?? defaultValue ?? (overlay ? 'collapsed' : 'open');
      shell.setRailBySide(side, initial);
      if (overlay) shell.setPanelRequestedBySide(side, false);
    } else {
      // single: view
      const initialView = view ?? defaultView ?? (overlay ? 'collapsed' : 'panel');
      shell.setSingleViewBySide(side, initialView);
    }
  }, [hasSlots, value, defaultValue, view, defaultView, shell, side, overlay]);

  // Keep context in sync for controlled
  React.useEffect(() => {
    if (!hasSlots) return;
    if (value !== undefined && shell.railBySide[side] !== value) {
      shell.setRailBySide(side, value);
    }
  }, [value, hasSlots, shell, side]);
  React.useEffect(() => {
    if (hasSlots) return;
    if (view !== undefined && shell.singleViewBySide[side] !== view) {
      shell.setSingleViewBySide(side, view);
    }
  }, [view, hasSlots, shell, side]);

  const railValue = shell.railBySide[side];
  const panelRequested = shell.panelRequestedBySide[side];
  const singleView = shell.singleViewBySide[side];
  const activeTool = shell.activeToolBySide[side];

  // Emit changes for uncontrolled
  const prevRailRef = React.useRef<RailValue | null>(null);
  React.useEffect(() => {
    if (!hasSlots) return;
    if (value !== undefined) return;
    if (prevRailRef.current !== railValue) {
      prevRailRef.current = railValue;
      onValueChange?.(railValue);
    }
  }, [hasSlots, railValue, value, onValueChange]);
  const prevViewRef = React.useRef<SingleView | null>(null);
  React.useEffect(() => {
    if (hasSlots) return;
    if (view !== undefined) return;
    if (prevViewRef.current !== singleView) {
      prevViewRef.current = singleView;
      onViewChange?.(singleView);
    }
  }, [hasSlots, singleView, view, onViewChange]);

  // Derived visibility:
  // - Split (rail+panel): panel shows when rail is open, panel is requested, and a tool is active
  // - Panel-only (no rail): panel shows unconditionally (no tool gating)
  // - Single-markup: shows when view === 'panel' and a tool is active
  const railVisible = hasSlots ? hasRail && railValue === 'open' : singleView === 'rail';
  const panelVisible = hasSlots
    ? hasPanel && (hasRail ? railValue === 'open' && panelRequested && activeTool !== null : true)
    : singleView === 'panel';

  // Overlay behavior (non-inline): mount as a Sheet from the top (default)
  // Resolve overlay responsively: built-in defaults overruled by prop
  // Defaults: overlay on initial/xs/sm; inline on md+
  const defaultOverlay = { initial: true, xs: true, sm: true, md: false, lg: false, xl: false };
  const mergedOverlay = React.useMemo(() => {
    if (typeof overlay === 'boolean') {
      return { initial: overlay } as Partial<
        Record<'initial' | 'xs' | 'sm' | 'md' | 'lg' | 'xl', boolean>
      >;
    }
    return { ...defaultOverlay, ...(overlay || {}) } as Partial<
      Record<'initial' | 'xs' | 'sm' | 'md' | 'lg' | 'xl', boolean>
    >;
  }, [overlay, defaultOverlay]);

  const [currentBp, setCurrentBp] = React.useState<'initial' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'>(
    'initial',
  );

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const queries: [key: 'xs' | 'sm' | 'md' | 'lg' | 'xl', query: string][] = [
      ['xs', '(min-width: 520px)'],
      ['sm', '(min-width: 768px)'],
      ['md', '(min-width: 1024px)'],
      ['lg', '(min-width: 1280px)'],
      ['xl', '(min-width: 1640px)'],
    ];
    const mqls = queries.map(([k, q]) => [k, window.matchMedia(q)] as const);
    const compute = () => {
      // Highest matched wins
      const matched = mqls.filter(([, m]) => m.matches).map(([k]) => k);
      const next = (matched[matched.length - 1] as typeof currentBp | undefined) ?? 'initial';
      setCurrentBp(next);
    };
    compute();
    mqls.forEach(([, m]) => m.addEventListener('change', compute));
    return () => {
      mqls.forEach(([, m]) => m.removeEventListener('change', compute));
    };
  }, []);

  const isOverlay = (() => {
    const val = mergedOverlay[currentBp];
    if (typeof val === 'boolean') return val;
    // Fallback cascade: if current not set, try smaller breakpoints, then initial
    const order: (typeof currentBp)[] = ['xl', 'lg', 'md', 'sm', 'xs', 'initial'];
    const idx = order.indexOf(currentBp);
    for (let i = idx + 1; i < order.length; i++) {
      const v = mergedOverlay[order[i]];
      if (typeof v === 'boolean') return v;
    }
    return mergedOverlay.initial ?? false;
  })();

  if (isOverlay) {
    const open = hasSlots ? railValue === 'open' || panelRequested : singleView !== 'collapsed';
    const onOpenChange = (next: boolean) => {
      if (hasSlots) {
        if (!next) {
          shell.setRailBySide(side, 'collapsed');
          shell.setPanelRequestedBySide(side, false);
        } else {
          shell.setRailBySide(side, 'open');
        }
      } else {
        if (!next) shell.setSingleViewBySide(side, 'collapsed');
        else shell.setSingleViewBySide(side, 'panel');
      }
    };

    const sheetSide = overlaySide ?? side;

    // Choose what to render in overlay
    // Split pattern: default to combined (rail + panel). Panel visibility follows panel intent and active tool.
    // Single-markup: render the provided children as-is.
    const overlayPanelVisible = hasSlots
      ? hasPanel && (hasRail ? panelRequested && activeTool !== null : true)
      : false;
    const overlayContent = hasSlots ? (
      <div style={{ display: 'flex', height: '100%', minBlockSize: 0 }}>
        {hasRail ? (
          <div
            id={railId}
            className="rt-ShellSidebarRail"
            data-section="rail"
            data-visible
            style={{ inlineSize: 'var(--shell-sidebar-rail-width, 64px)', overflow: 'hidden' }}
          >
            {railChildren}
          </div>
        ) : null}
        {hasPanel ? (
          <div
            id={panelId}
            className="rt-ShellSidebarPanel"
            data-section="panel"
            data-visible={overlayPanelVisible || undefined}
            aria-hidden={overlayPanelVisible ? undefined : true}
            {...(overlayPanelVisible ? {} : { inert })}
            style={{
              inlineSize: overlayPanelVisible ? 'var(--shell-sidebar-panel-width, 288px)' : '0px',
              overflow: 'hidden',
            }}
          >
            {panelChildren}
          </div>
        ) : null}
      </div>
    ) : (
      children
    );

    // Compute sheet width based on split/single pattern using CSS tokens
    const computedWidth =
      sheetSide === 'start' || sheetSide === 'end'
        ? hasSlots
          ? overlayPanelVisible
            ? 'var(--shell-sidebar-combined-width)'
            : 'var(--shell-sidebar-rail-width)'
          : singleView === 'rail'
            ? 'var(--shell-sidebar-rail-width)'
            : 'var(--shell-sidebar-panel-width)'
        : '100vw';

    return (
      <>
        <Sheet.Root open={open} onOpenChange={onOpenChange}>
          <Sheet.Content
            id={regionId}
            side={sheetSide}
            height={{ initial: '100vh' }}
            width={{ initial: computedWidth }}
            style={{ ['--dialog-content-padding' as any]: '0px' }}
          >
            <Sheet.Title>
              <VisuallyHidden>Sidebar</VisuallyHidden>
            </Sheet.Title>
            {overlayContent}
          </Sheet.Content>
        </Sheet.Root>
      </>
    );
  }

  return (
    <Comp
      {...props}
      ref={ref}
      id={regionId}
      className={classNames('rt-ShellSidebar', className)}
      data-side={side}
      data-rail={hasSlots ? railValue : undefined}
      data-panel={hasSlots ? (panelVisible ? 'visible' : 'hidden') : undefined}
      data-state={!hasSlots ? singleView : undefined}
      aria-label={props['aria-label']}
      style={{ ...style }}
    >
      {hasSlots ? (
        <>
          <SidebarSectionContext.Provider value={{ side, section: 'rail' }}>
            {hasRail ? (
              <div
                id={railId}
                className="rt-ShellSidebarRail"
                data-section="rail"
                data-visible={railVisible || undefined}
                aria-hidden={railVisible ? undefined : true}
                {...(railVisible ? {} : { inert })}
                style={{
                  inlineSize: railVisible ? 'var(--shell-sidebar-rail-width, 64px)' : '0px',
                  overflow: 'hidden',
                }}
              >
                {railChildren}
              </div>
            ) : null}
          </SidebarSectionContext.Provider>
          <SidebarSectionContext.Provider value={{ side, section: 'panel' }}>
            {hasPanel ? (
              <div
                id={panelId}
                className="rt-ShellSidebarPanel"
                data-section="panel"
                data-visible={panelVisible || undefined}
                aria-hidden={panelVisible ? undefined : true}
                {...(panelVisible ? {} : { inert })}
                style={{
                  inlineSize: panelVisible ? 'var(--shell-sidebar-panel-width, 288px)' : '0px',
                  overflow: 'hidden',
                }}
              >
                {panelChildren}
              </div>
            ) : null}
          </SidebarSectionContext.Provider>
        </>
      ) : (
        // Single-markup morphing
        <div
          className="rt-ShellSidebarSingle"
          data-visible={singleView !== 'collapsed' || undefined}
          aria-hidden={singleView === 'collapsed' ? true : undefined}
          style={{
            inlineSize:
              singleView === 'collapsed'
                ? '0px'
                : singleView === 'rail'
                  ? 'var(--shell-sidebar-rail-width, 64px)'
                  : 'var(--shell-sidebar-panel-width, 288px)',
            overflow: 'hidden',
          }}
        >
          {children}
        </div>
      )}
    </Comp>
  );
};

const Sidebar = React.forwardRef<HTMLDivElement, ShellSidebarProps>(
  SidebarInner,
) as ShellSidebarComponent;
Sidebar.displayName = 'Shell.Sidebar';

// Helper to pick rail/panel children by marker components
function childrenArrayOf(children: React.ReactNode, slot: 'rail' | 'panel') {
  const arr = React.Children.toArray(children) as React.ReactElement[];
  return arr.filter((el) => React.isValidElement(el) && (el.type as any)?.['__shellSlot'] === slot);
}

Sidebar.Rail = Rail;
Sidebar.Panel = Panel;

// Local Trigger (inside a sidebar)
import type { IconButtonProps } from './icon-button.js';
type LocalTriggerProps = IconButtonProps<'button'>;
/**
 * `Shell.Sidebar.Trigger` toggles the sidebar where it is rendered.
 * - In split-mode: toggles rail open/collapsed
 * - In single-markup: cycles through panel → rail → collapsed
 */
const LocalTrigger = React.forwardRef<React.ElementRef<typeof IconButton>, LocalTriggerProps>(
  ({ onClick, children, ...props }, ref) => {
    const section = useSidebarSection();
    const shell = useShell();
    const side = section?.side ?? 'start';
    const controlsId = shell.getRegionId(side);
    const expanded =
      shell.patternBySide[side] === 'split'
        ? shell.railBySide[side] === 'open'
        : shell.singleViewBySide[side] !== 'collapsed';
    return (
      <IconButton
        {...props}
        ref={ref}
        variant="soft"
        aria-controls={controlsId}
        aria-expanded={expanded}
        onClick={(e) => {
          onClick?.(e);
          if (shell.patternBySide[side] === 'split') shell.toggleRail(side);
          else shell.cycleSingleView(side);
        }}
      >
        {children || <ChevronDownIcon />}
      </IconButton>
    );
  },
);
LocalTrigger.displayName = 'Shell.Sidebar.Trigger';

// Global Trigger
type GlobalTriggerProps = IconButtonProps<'button'> & { side: ShellSide };
/**
 * `Shell.Trigger` controls a specific `side` from anywhere inside `Shell.Root`.
 * Mirrors behavior of the local trigger, but with explicit side.
 */
const Trigger = React.forwardRef<React.ElementRef<typeof IconButton>, GlobalTriggerProps>(
  ({ side, onClick, children, ...props }, ref) => {
    const shell = useShell();
    const controlsId = shell.getRegionId(side);
    const expanded =
      shell.patternBySide[side] === 'split'
        ? shell.railBySide[side] === 'open'
        : shell.singleViewBySide[side] !== 'collapsed';
    return (
      <IconButton
        {...props}
        ref={ref}
        variant="ghost"
        aria-controls={controlsId}
        aria-expanded={expanded}
        onClick={(e) => {
          onClick?.(e);
          if (shell.patternBySide[side] === 'split') shell.toggleRail(side);
          else shell.cycleSingleView(side);
        }}
      >
        {children || <ChevronDownIcon />}
      </IconButton>
    );
  },
);
Trigger.displayName = 'Shell.Trigger';

// Attach slots to Sidebar for namespaced API
(Sidebar as any).Rail = Rail;
(Sidebar as any).Panel = Panel;
(Sidebar as any).Trigger = LocalTrigger;

export { Root, Header, Footer, Content, Sidebar, Trigger, useShell, useRailEvents, usePanelState };
// Convenience per-side API
/**
 * Convenience hook to interrogate and control one sidebar.
 * - `rail`: open/collapsed helpers for split pattern
 * - `panel`: show/hide helpers; visibility is conditional on rail open in split pattern
 * - `single`: view control for single-markup pattern
 * - `activeTool`: active tool coordination state
 */
function useSidebar(side: ShellSide): {
  side: ShellSide;
  isSplit: boolean;
  rail: {
    value: RailValue;
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
    onItemSelected: (item: string) => void;
  };
  panel: {
    isVisible: boolean;
    show: () => void;
    hide: () => void;
    activeTool: string | null;
    activeContext: string | null;
  };
  single: { view: SingleView; setView: (view: SingleView) => void; cycle: () => void };
  activeTool: string | null;
  setActiveTool: (tool: string | null) => void;
  activeContext: string | null;
  setActiveContext: (context: string | null) => void;
} {
  const shell = useShell();
  const isSplit = shell.patternBySide[side] === 'split';
  const railValue = shell.railBySide[side];
  const activeTool = shell.activeToolBySide[side];

  const panelVisible =
    shell.panelRequestedBySide[side] && railValue === 'open' && activeTool !== null;
  return {
    side,
    isSplit,
    rail: {
      value: railValue,
      isOpen: railValue === 'open',
      open: () => shell.setRailBySide(side, 'open'),
      close: () => {
        shell.setRailBySide(side, 'collapsed');
        shell.setPanelRequestedBySide(side, false);
      },
      toggle: () => shell.toggleRail(side),
      onItemSelected: (item: string) => shell.onItemSelected(side, item),
    },
    panel: {
      isVisible: panelVisible,
      show: () => shell.setPanelRequestedBySide(side, true),
      hide: () => shell.setPanelRequestedBySide(side, false),
      activeTool: shell.activeToolBySide[side],
      activeContext: shell.activeContextBySide[side],
    },
    single: {
      view: shell.singleViewBySide[side],
      setView: (view: SingleView) => shell.setSingleViewBySide(side, view),
      cycle: () => shell.cycleSingleView(side),
    },
    activeTool: shell.activeToolBySide[side],
    setActiveTool: (tool: string | null) => shell.setActiveTool(side, tool),
    activeContext: shell.activeContextBySide[side],
    setActiveContext: (context: string | null) => shell.setActiveContext(side, context),
  };
}

export { useSidebar };
