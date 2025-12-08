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
import { VisuallyHidden } from './visually-hidden.js';
import { useResponsivePresentation, useResponsiveInitialState } from './shell.hooks.js';
import { PaneResizeContext } from './_internal/shell-resize.js';
import { PaneHandle, PanelHandle } from './_internal/shell-handles.js';
import { omitPaneProps, extractPaneDomProps, mapResponsiveBooleanToPaneMode } from './_internal/shell-prop-helpers.js';
import { Sidebar } from './_internal/shell-sidebar.js';
import { Bottom } from './_internal/shell-bottom.js';
import { Inspector } from './_internal/shell-inspector.js';
import type { PresentationValue, ResponsivePresentation, PaneMode, SidebarMode, PaneSizePersistence, Breakpoint, PaneTarget, Responsive, PaneBaseProps } from './shell.types.js';
import { _BREAKPOINTS } from './shell.types.js';
import {
  ShellProvider,
  useShell,
  LeftModeContext,
  PanelModeContext,
  SidebarModeContext,
  InspectorModeContext,
  BottomModeContext,
  PresentationContext,
  PeekContext,
  ActionsContext,
  CompositionContext,
} from './shell.context.js';

// Shell context is provided via ShellProvider (see shell.context.tsx)

// Pane resize context moved to ./_internal/shell-resize

// Local PaneHandle moved to ./_internal/shell-handles
// Removed local PaneHandle implementation; using internal PaneHandle

// Composed Handle wrappers per pane
// Handles moved to ./_internal/shell-handles

// Hook to resolve responsive presentation
// useResponsivePresentation moved to shell.hooks.ts

// Hook to resolve responsive mode defaults
// Removed: defaultMode responsiveness

// Hook to get current breakpoint
function useBreakpoint(): { bp: Breakpoint; ready: boolean } {
  const [currentBp, setCurrentBp] = React.useState<Breakpoint>('initial');
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const queries: [key: keyof typeof _BREAKPOINTS, query: string][] = Object.entries(_BREAKPOINTS) as any;
    const mqls = queries.map(([k, q]) => [k, window.matchMedia(q)] as const);

    const compute = () => {
      // Highest matched wins
      const matched = mqls.filter(([, m]) => m.matches).map(([k]) => k);
      const next = (matched[matched.length - 1] as Breakpoint | undefined) ?? 'initial';
      setCurrentBp(next);
      setReady(true);
    };

    compute();
    const cleanups: Array<() => void> = [];
    mqls.forEach(([, m]) => {
      const mm = m as MediaQueryList & {
        addEventListener?: (type: 'change', listener: (e: MediaQueryListEvent) => void) => void;
        removeEventListener?: (type: 'change', listener: (e: MediaQueryListEvent) => void) => void;
        addListener?: (listener: (e: MediaQueryListEvent) => void) => void;
        removeListener?: (listener: (e: MediaQueryListEvent) => void) => void;
      };
      if (typeof mm.addEventListener === 'function' && typeof mm.removeEventListener === 'function') {
        mm.addEventListener('change', compute as any);
        cleanups.push(() => mm.removeEventListener?.('change', compute as any));
      } else if (typeof mm.addListener === 'function' && typeof mm.removeListener === 'function') {
        mm.addListener(compute as any);
        cleanups.push(() => mm.removeListener?.(compute as any));
      }
    });

    return () => {
      cleanups.forEach((fn) => {
        try {
          fn();
        } catch {}
      });
    };
  }, []);

  return { bp: currentBp, ready };
}

// Reducer-based pane state management to simplify cascading rules
type PaneState = {
  leftMode: PaneMode;
  panelMode: PaneMode;
  sidebarMode: SidebarMode;
  inspectorMode: PaneMode;
  bottomMode: PaneMode;
};

type PaneAction =
  | { type: 'SET_LEFT_MODE'; mode: PaneMode }
  | { type: 'SET_PANEL_MODE'; mode: PaneMode }
  | { type: 'SET_SIDEBAR_MODE'; mode: SidebarMode }
  | { type: 'SET_INSPECTOR_MODE'; mode: PaneMode }
  | { type: 'SET_BOTTOM_MODE'; mode: PaneMode }
  | { type: 'TOGGLE_PANE'; target: PaneTarget }
  | { type: 'EXPAND_PANE'; target: PaneTarget }
  | { type: 'COLLAPSE_PANE'; target: PaneTarget };

const SHELL_SLOT = Symbol('rtShellSlot');

function assignShellSlot<T extends React.ComponentType<any>>(component: T, slot: string): T {
  (component as any)[SHELL_SLOT] = slot;
  return component;
}

function isShellComponent(element: React.ReactElement, component: any): boolean {
  if (!React.isValidElement(element)) return false;
  const type: any = element.type;
  if (type === component) return true;
  const targetSlot = (component as any)?.[SHELL_SLOT];
  return Boolean(type?.[SHELL_SLOT] && targetSlot && type[SHELL_SLOT] === targetSlot);
}

// Tag imported slot components so isType remains stable after minification
assignShellSlot(Sidebar as any, 'Shell.Sidebar');
assignShellSlot(Inspector as any, 'Shell.Inspector');
assignShellSlot(Bottom as any, 'Shell.Bottom');

function paneReducer(state: PaneState, action: PaneAction): PaneState {
  switch (action.type) {
    case 'SET_LEFT_MODE': {
      // Collapsing left cascades to panel collapse
      if (action.mode === 'collapsed') {
        return { ...state, leftMode: 'collapsed', panelMode: 'collapsed' };
      }
      return { ...state, leftMode: action.mode };
    }
    case 'SET_PANEL_MODE': {
      // Expanding panel ensures left is expanded
      if (action.mode === 'expanded' && state.leftMode !== 'expanded') {
        return { ...state, leftMode: 'expanded', panelMode: 'expanded' };
      }
      return { ...state, panelMode: action.mode };
    }
    case 'SET_SIDEBAR_MODE':
      return { ...state, sidebarMode: action.mode };
    case 'SET_INSPECTOR_MODE':
      return { ...state, inspectorMode: action.mode };
    case 'SET_BOTTOM_MODE':
      return { ...state, bottomMode: action.mode };
    case 'TOGGLE_PANE': {
      switch (action.target) {
        case 'left':
        case 'rail':
          return { ...state, leftMode: state.leftMode === 'expanded' ? 'collapsed' : 'expanded', panelMode: state.leftMode === 'expanded' ? 'collapsed' : state.panelMode };
        case 'panel': {
          if (state.leftMode === 'collapsed') {
            return { ...state, leftMode: 'expanded', panelMode: 'expanded' };
          }
          return { ...state, panelMode: state.panelMode === 'expanded' ? 'collapsed' : 'expanded' };
        }
        case 'sidebar': {
          // Sidebar toggle sequencing is handled externally via setSidebarToggleComputer
          // This reducer only flips between expanded<->collapsed by default; thin is set by caller
          const next: SidebarMode = state.sidebarMode === 'collapsed' ? 'expanded' : state.sidebarMode === 'expanded' ? 'collapsed' : 'expanded';
          return { ...state, sidebarMode: next };
        }
        case 'inspector':
          return { ...state, inspectorMode: state.inspectorMode === 'expanded' ? 'collapsed' : 'expanded' };
        case 'bottom':
          return { ...state, bottomMode: state.bottomMode === 'expanded' ? 'collapsed' : 'expanded' };
        default:
          return state;
      }
      // Fallback to satisfy no-fallthrough in some environments
      return state;
    }
    case 'EXPAND_PANE': {
      switch (action.target) {
        case 'left':
        case 'rail':
          return { ...state, leftMode: 'expanded' };
        case 'panel':
          return { ...state, leftMode: 'expanded', panelMode: 'expanded' };
        case 'sidebar':
          return { ...state, sidebarMode: 'expanded' };
        case 'inspector':
          return { ...state, inspectorMode: 'expanded' };
        case 'bottom':
          return { ...state, bottomMode: 'expanded' };
        default:
          return state;
      }
      // Fallback to satisfy no-fallthrough in some environments
      return state;
    }
    case 'COLLAPSE_PANE': {
      switch (action.target) {
        case 'left':
        case 'rail':
          return { ...state, leftMode: 'collapsed', panelMode: 'collapsed' };
        case 'panel':
          return { ...state, panelMode: 'collapsed' };
        case 'sidebar':
          return { ...state, sidebarMode: 'collapsed' };
        case 'inspector':
          return { ...state, inspectorMode: 'collapsed' };
        case 'bottom':
          return { ...state, bottomMode: 'collapsed' };
        default:
          return state;
      }
      // Fallback to satisfy no-fallthrough in some environments
      return state;
    }
  }
  return state;
}

// Root Component
interface ShellRootProps extends React.ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode;
  height?: 'full' | 'auto' | string | number;
}

const Root = React.forwardRef<HTMLDivElement, ShellRootProps>(({ className, children, height = 'full', ...props }, ref) => {
  const { bp: currentBreakpoint, ready: currentBreakpointReady } = useBreakpoint();

  // Compute initial defaults from immediate children (one-time, uncontrolled defaults)
  const initialChildren = React.Children.toArray(children) as React.ReactElement[];
  const hasPanelDefaultOpen = initialChildren.some((el) => React.isValidElement(el) && (el as any).type?.displayName === 'Shell.Panel' && Boolean((el as any).props?.defaultOpen));
  const hasRailDefaultOpen = initialChildren.some((el) => React.isValidElement(el) && (el as any).type?.displayName === 'Shell.Rail' && Boolean((el as any).props?.defaultOpen));
  const hasInspectorDefaultOpen = initialChildren.some((el) => React.isValidElement(el) && (el as any).type?.displayName === 'Shell.Inspector' && Boolean((el as any).props?.defaultOpen));
  const hasInspectorOpenControlled = initialChildren.some(
    (el) => React.isValidElement(el) && (el as any).type?.displayName === 'Shell.Inspector' && typeof (el as any).props?.open !== 'undefined' && Boolean((el as any).props?.open),
  );

  // Pane state management via reducer
  const [paneState, dispatchPane] = React.useReducer(paneReducer, {
    leftMode: hasPanelDefaultOpen || hasRailDefaultOpen ? 'expanded' : 'collapsed',
    panelMode: hasPanelDefaultOpen ? 'expanded' : 'collapsed',
    sidebarMode: 'expanded',
    inspectorMode: hasInspectorDefaultOpen || hasInspectorOpenControlled ? 'expanded' : 'collapsed',
    bottomMode: 'collapsed',
  });
  const setLeftMode = React.useCallback((mode: PaneMode) => dispatchPane({ type: 'SET_LEFT_MODE', mode }), []);
  const setPanelMode = React.useCallback((mode: PaneMode) => dispatchPane({ type: 'SET_PANEL_MODE', mode }), []);
  const setSidebarMode = React.useCallback((mode: SidebarMode) => dispatchPane({ type: 'SET_SIDEBAR_MODE', mode }), []);
  const setInspectorMode = React.useCallback((mode: PaneMode) => dispatchPane({ type: 'SET_INSPECTOR_MODE', mode }), []);
  const setBottomMode = React.useCallback((mode: PaneMode) => dispatchPane({ type: 'SET_BOTTOM_MODE', mode }), []);

  // Removed: defaultMode responsiveness and manual change tracking

  // Composition detection
  const [hasLeft, setHasLeft] = React.useState(false);
  const [hasSidebar, setHasSidebar] = React.useState(false);

  // Customizable sidebar toggle sequencing
  const sidebarToggleComputerRef = React.useRef<(current: SidebarMode) => SidebarMode>((current) => (current === 'collapsed' ? 'thin' : current === 'thin' ? 'expanded' : 'collapsed'));
  const setSidebarToggleComputer = React.useCallback((fn: (current: SidebarMode) => SidebarMode) => {
    sidebarToggleComputerRef.current = fn;
  }, []);

  // Reducer handles left→panel cascade; no effect needed

  // Composition validation
  React.useEffect(() => {
    if (hasSidebar && hasLeft) {
      console.warn('Shell: Sidebar cannot coexist with Rail or Panel. Use either Rail+Panel OR Sidebar.');
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
    const isType = (el: React.ReactElement, comp: any) => React.isValidElement(el) && (el.type === comp || (el as any).type?.displayName === comp.displayName);
    return childArray.some((el) => isType(el, Rail) || isType(el, Panel));
  }, [children]);

  const hasSidebarChildren = React.useMemo(() => {
    const childArray = React.Children.toArray(children) as React.ReactElement[];
    const isType = (el: React.ReactElement, comp: any) => React.isValidElement(el) && (el.type === comp || (el as any).type?.displayName === comp.displayName);
    return childArray.some((el) => isType(el, Sidebar));
  }, [children]);

  const togglePane = React.useCallback(
    (target: PaneTarget) => {
      if (target === 'sidebar') {
        const next = sidebarToggleComputerRef.current(paneState.sidebarMode as SidebarMode);
        setSidebarMode(next);
        return;
      }
      dispatchPane({ type: 'TOGGLE_PANE', target });
    },
    [paneState.sidebarMode, setSidebarMode],
  );

  const expandPane = React.useCallback(
    (target: PaneTarget) => {
      if (target === 'sidebar') return setSidebarMode('expanded');
      dispatchPane({ type: 'EXPAND_PANE', target });
    },
    [setSidebarMode],
  );

  const collapsePane = React.useCallback(
    (target: PaneTarget) => {
      if (target === 'sidebar') return setSidebarMode('collapsed');
      dispatchPane({ type: 'COLLAPSE_PANE', target });
    },
    [setSidebarMode],
  );

  const baseContextValue = React.useMemo(
    () => ({
      leftMode: paneState.leftMode,
      setLeftMode,
      panelMode: paneState.panelMode,
      setPanelMode,
      sidebarMode: paneState.sidebarMode,
      setSidebarMode,
      inspectorMode: paneState.inspectorMode,
      setInspectorMode,
      bottomMode: paneState.bottomMode,
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
      paneState.leftMode,
      setLeftMode,
      paneState.panelMode,
      setPanelMode,
      paneState.sidebarMode,
      setSidebarMode,
      paneState.inspectorMode,
      setInspectorMode,
      paneState.bottomMode,
      setBottomMode,
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
  const isType = (el: React.ReactElement, comp: any) => React.isValidElement(el) && (el.type === comp || (el as any).type?.displayName === comp.displayName);

  const headerEls = childArray.filter((el) => isType(el, Header));
  const railEls = childArray.filter((el) => isType(el, Rail));
  const panelEls = childArray.filter((el) => isType(el, Panel));
  const sidebarEls = childArray.filter((el) => isType(el, Sidebar));
  const contentEls = childArray.filter((el) => isType(el, Content));
  const inspectorEls = childArray.filter((el) => isType(el, Inspector));
  const bottomEls = childArray.filter((el) => isType(el, Bottom));

  // Controlled sync in Root: mirror first Rail.open if provided
  const firstRailOpen = (railEls[0] as any)?.props?.open;
  React.useEffect(() => {
    if (typeof firstRailOpen === 'undefined') return;
    const shouldOpen = Boolean(firstRailOpen);
    setLeftMode(shouldOpen ? 'expanded' : 'collapsed');
  }, [firstRailOpen, setLeftMode]);

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

  // Memoized slice context values to avoid notifying unrelated consumers
  const presentationCtxValue = React.useMemo(() => ({ currentBreakpoint, currentBreakpointReady, leftResolvedPresentation: devLeftPres }), [currentBreakpoint, currentBreakpointReady, devLeftPres]);
  const leftModeCtxValue = React.useMemo(() => ({ leftMode: paneState.leftMode, setLeftMode }), [paneState.leftMode, setLeftMode]);
  const panelModeCtxValue = React.useMemo(() => ({ panelMode: paneState.panelMode, setPanelMode }), [paneState.panelMode, setPanelMode]);
  const sidebarModeCtxValue = React.useMemo(() => ({ sidebarMode: paneState.sidebarMode, setSidebarMode }), [paneState.sidebarMode, setSidebarMode]);
  const inspectorModeCtxValue = React.useMemo(() => ({ inspectorMode: paneState.inspectorMode, setInspectorMode }), [paneState.inspectorMode, setInspectorMode]);
  const bottomModeCtxValue = React.useMemo(() => ({ bottomMode: paneState.bottomMode, setBottomMode }), [paneState.bottomMode, setBottomMode]);
  const compositionCtxValue = React.useMemo(() => ({ hasLeft, setHasLeft, hasSidebar, setHasSidebar }), [hasLeft, setHasLeft, hasSidebar, setHasSidebar]);
  const peekCtxValue = React.useMemo(() => ({ peekTarget, setPeekTarget, peekPane, clearPeek }), [peekTarget, setPeekTarget, peekPane, clearPeek]);
  const actionsCtxValue = React.useMemo(() => ({ togglePane, expandPane, collapsePane, setSidebarToggleComputer }), [togglePane, expandPane, collapsePane, setSidebarToggleComputer]);

  return (
    <div {...props} ref={ref} className={classNames('rt-ShellRoot', className)} style={{ ...heightStyle, ...props.style }}>
      <ShellProvider
        value={{
          ...baseContextValue,
          peekTarget,
          setPeekTarget,
          peekPane,
          clearPeek,
        }}
      >
        <PresentationContext.Provider value={presentationCtxValue}>
          <LeftModeContext.Provider value={leftModeCtxValue}>
            <PanelModeContext.Provider value={panelModeCtxValue}>
              <SidebarModeContext.Provider value={sidebarModeCtxValue}>
                <InspectorModeContext.Provider value={inspectorModeCtxValue}>
                  <BottomModeContext.Provider value={bottomModeCtxValue}>
                    <CompositionContext.Provider value={compositionCtxValue}>
                      <PeekContext.Provider value={peekCtxValue}>
                        <ActionsContext.Provider value={actionsCtxValue}>
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
                                        // Notification passthrough used by Left; not spread to DOM in Left
                                        onOpenChange: firstRail.props?.onOpenChange,
                                        open: firstRail.props?.open,
                                        defaultOpen: firstRail.props?.defaultOpen,
                                        presentation: firstRail.props?.presentation,
                                        collapsible: firstRail.props?.collapsible,
                                        onExpand: firstRail.props?.onExpand,
                                        onCollapse: firstRail.props?.onCollapse,
                                      }
                                    : { defaultOpen: hasPanelDefaultOpen ? true : undefined };
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
                        </ActionsContext.Provider>
                      </PeekContext.Provider>
                    </CompositionContext.Provider>
                  </BottomModeContext.Provider>
                </InspectorModeContext.Provider>
              </SidebarModeContext.Provider>
            </PanelModeContext.Provider>
          </LeftModeContext.Provider>
        </PresentationContext.Provider>
      </ShellProvider>
    </div>
  );
}) as PanelComponent;
Root.displayName = 'Shell.Root';

// Header
interface ShellHeaderProps extends React.ComponentPropsWithoutRef<'header'> {
  height?: number;
}

const Header = React.forwardRef<HTMLElement, ShellHeaderProps>(({ className, height = 64, style, ...props }, ref) => (
  <header
    {...props}
    ref={ref}
    className={classNames('rt-ShellHeader', className)}
    style={{
      ...style,
      ['--shell-header-height' as any]: `${height}px`,
    }}
  />
));
Header.displayName = 'Shell.Header';

// Pane Props Interface (shared by Panel, Sidebar, Inspector, Bottom)
type PaneProps = PaneBaseProps;

// Left container (auto-created for Rail+Panel)
interface LeftProps extends React.ComponentPropsWithoutRef<'div'> {
  presentation?: ResponsivePresentation;
  // New: passthrough from Rail
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean, meta: { reason: 'init' | 'toggle' | 'panel' | 'responsive' }) => void;
  collapsible?: boolean;
  onExpand?: () => void;
  onCollapse?: () => void;
  mode?: never;
  defaultMode?: never;
  onModeChange?: never;
}

// Rail (special case)
type LeftOpenChangeMeta = { reason: 'init' | 'toggle' | 'responsive' | 'panel' };

type RailControlledProps = { open: boolean; onOpenChange?: (open: boolean, meta: LeftOpenChangeMeta) => void; defaultOpen?: never };
type RailUncontrolledProps = { defaultOpen?: boolean; onOpenChange?: (open: boolean, meta: LeftOpenChangeMeta) => void; open?: never };

type RailProps = React.ComponentPropsWithoutRef<'div'> & {
  presentation?: ResponsivePresentation;
  expandedSize?: number;
  collapsible?: boolean;
  onExpand?: () => void;
  onCollapse?: () => void;
} & (RailControlledProps | RailUncontrolledProps);

// Left container - behaves like Inspector but contains Rail+Panel
const LEFT_DOM_OMIT_PROPS = ['open', 'defaultOpen', 'onOpenChange', 'mode', 'defaultMode', 'onModeChange'] as const;

const Left = React.forwardRef<HTMLDivElement, LeftProps>((initialProps, ref) => {
  const { className, presentation = { initial: 'fixed', sm: 'fixed' }, collapsible: _collapsible = true, onExpand, onCollapse, children, style, ...restProps } = initialProps;
  const propsOpen = restProps.open;
  const propsDefaultOpen = restProps.defaultOpen;
  const propsOnOpenChange = restProps.onOpenChange;
  const domProps = omitPaneProps(restProps, LEFT_DOM_OMIT_PROPS);
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

  const lastLeftModeRef = React.useRef<PaneMode | null>(null);
  const initNotifiedRef = React.useRef(false);
  const normalizedLeftControlled = React.useMemo(() => {
    if (typeof propsOpen === 'undefined') return undefined;
    return propsOpen ? 'expanded' : 'collapsed';
  }, [propsOpen]);
  const normalizedLeftDefault = React.useMemo(() => mapResponsiveBooleanToPaneMode(propsDefaultOpen), [propsDefaultOpen]);
  useResponsiveInitialState<PaneMode>({
    controlledValue: normalizedLeftControlled,
    defaultValue: normalizedLeftDefault,
    currentValue: shell.leftMode,
    setValue: shell.setLeftMode,
    breakpointReady: shell.currentBreakpointReady,
    onInit: (initial) => propsOnOpenChange?.(initial === 'expanded', { reason: 'init' }),
  });

  // Emit mode changes (uncontrolled toggles + init)
  React.useEffect(() => {
    if (typeof propsOpen !== 'undefined') return; // controlled, notifications only via parent changes
    if (lastLeftModeRef.current !== null && lastLeftModeRef.current !== shell.leftMode) {
      propsOnOpenChange?.(shell.leftMode === 'expanded', { reason: 'toggle' });
    }
    lastLeftModeRef.current = shell.leftMode;
  }, [shell, propsOnOpenChange, propsOpen]);

  // Emit expand/collapse events
  React.useEffect(() => {
    if (shell.leftMode === 'expanded') {
      onExpand?.();
    } else {
      onCollapse?.();
    }
  }, [shell.leftMode, onExpand, onCollapse]);

  const _isExpanded = shell.leftMode === 'expanded';

  // Left is not resizable; width derives from Rail/Panel.

  if (isOverlay) {
    const open = shell.leftMode === 'expanded';
    // Compute overlay width from child Rail/Panel expanded sizes
    const childArray = React.Children.toArray(children) as React.ReactElement[];
    const isType = (el: React.ReactElement, comp: any) => React.isValidElement(el) && el.type === comp;
    const railEl = childArray.find((el) => isType(el, Rail));
    const panelEl = childArray.find((el) => isType(el, Panel));
    const railSize = typeof (railEl as any)?.props?.expandedSize === 'number' ? (railEl as any).props.expandedSize : 64;
    const panelSize = typeof (panelEl as any)?.props?.expandedSize === 'number' ? (panelEl as any).props.expandedSize : 288;
    const hasRail = Boolean(railEl);
    const hasPanel = Boolean(panelEl);
    const overlayPx = (hasRail ? railSize : 0) + (shell.panelMode === 'expanded' && hasPanel ? panelSize : 0);
    return (
      <Sheet.Root open={open} onOpenChange={(o) => shell.setLeftMode(o ? 'expanded' : 'collapsed')}>
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
    const isType = (el: React.ReactElement, comp: any) => React.isValidElement(el) && el.type === comp;
    const railEl = childArray.find((el) => isType(el, Rail));
    const panelEl = childArray.find((el) => isType(el, Panel));
    const _railSize = typeof (railEl as any)?.props?.expandedSize === 'number' ? (railEl as any).props.expandedSize : 64;
    const _panelSize = typeof (panelEl as any)?.props?.expandedSize === 'number' ? (panelEl as any).props.expandedSize : 288;
    const _hasRail = Boolean(railEl);
    const _hasPanel = Boolean(panelEl);
    const _includePanel = _hasPanel && (shell.panelMode === 'expanded' || shell.peekTarget === 'panel');

    // Strip control props from DOM spread
    return (
      <div
        {...domProps}
        ref={setRef}
        className={classNames('rt-ShellLeft', className)}
        data-mode={shell.leftMode}
        data-peek={shell.peekTarget === 'left' || shell.peekTarget === 'rail' || shell.peekTarget === 'panel' || undefined}
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

  // Strip control/legacy props from DOM spread
  return (
    <div
      {...domProps}
      ref={setRef}
      className={classNames('rt-ShellLeft', className)}
      data-mode={shell.leftMode}
      data-peek={shell.peekTarget === 'left' || shell.peekTarget === 'rail' || shell.peekTarget === 'panel' || undefined}
      data-presentation={resolvedPresentation}
      style={{
        ...style,
      }}
    >
      {children}
    </div>
  );
});
Left.displayName = 'Shell.Left';
assignShellSlot(Left as any, 'Shell.Left');

const Rail = React.forwardRef<HTMLDivElement, RailProps>((initialProps, ref) => {
  const { className, presentation, expandedSize = 64, collapsible, onExpand, onCollapse, children, style, open, defaultOpen, onOpenChange, ...domProps } = initialProps;
  const shell = useShell();

  // Dev guards
  const wasControlledRef = React.useRef<boolean | null>(null);
  if (process.env.NODE_ENV !== 'production') {
    if (typeof open !== 'undefined' && typeof defaultOpen !== 'undefined') {
      console.error('Shell.Rail: Do not pass both `open` and `defaultOpen`. Choose one.');
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
      console.warn('Shell.Rail: Switching between controlled and uncontrolled `open` is not supported.');
      wasControlledRef.current = isControlled;
    }
  }, [open]);

  // Register expanded size with Left container
  React.useEffect(() => {
    (shell as any).onRailDefaults?.(expandedSize);
  }, [shell, expandedSize]);

  const isExpanded = shell.leftMode === 'expanded';

  // Strip unknown open/defaultOpen props from DOM by not spreading them
  return (
    <div
      {...domProps}
      ref={ref}
      className={classNames('rt-ShellRail', className)}
      data-mode={shell.leftMode}
      data-peek={(shell.currentBreakpointReady && shell.leftResolvedPresentation !== 'overlay' && shell.peekTarget === 'rail') || undefined}
      style={{
        ...style,
        ['--rail-size' as any]: `${expandedSize}px`,
      }}
    >
      <div className="rt-ShellRailContent" data-visible={(shell.currentBreakpointReady && (isExpanded || (shell.leftResolvedPresentation !== 'overlay' && shell.peekTarget === 'rail'))) || undefined}>
        {children}
      </div>
    </div>
  );
});
Rail.displayName = 'Shell.Rail';
assignShellSlot(Rail as any, 'Shell.Rail');

// Panel
type HandleComponent = React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'div'> & React.RefAttributes<HTMLDivElement>>;

type PanelOpenChangeMeta = { reason: 'toggle' | 'left' | 'init' };
type PanelControlledProps = { open: boolean; onOpenChange?: (open: boolean, meta: PanelOpenChangeMeta) => void; defaultOpen?: never };
type PanelUncontrolledProps = { defaultOpen?: boolean; onOpenChange?: (open: boolean, meta: PanelOpenChangeMeta) => void; open?: never };

type PanelSizeControlledProps = { size: number | string; defaultSize?: never };
type PanelSizeUncontrolledProps = { defaultSize?: number | string; size?: never };

type PanelSizeChangeMeta = { reason: 'init' | 'resize' | 'controlled' };
type PanelPublicProps = Omit<PaneProps, 'presentation' | 'defaultMode'> &
  (PanelControlledProps | PanelUncontrolledProps) &
  (PanelSizeControlledProps | PanelSizeUncontrolledProps) & {
    onSizeChange?: (size: number, meta: PanelSizeChangeMeta) => void;
    sizeUpdate?: 'throttle' | 'debounce';
    sizeUpdateMs?: number;
  };
type PanelComponent = React.ForwardRefExoticComponent<PanelPublicProps & React.RefAttributes<HTMLDivElement>> & {
  Handle: HandleComponent;
};

type _SidebarComponent = React.ForwardRefExoticComponent<
  (Omit<PaneProps, 'mode' | 'defaultMode' | 'onModeChange'> & {
    state?: Responsive<SidebarMode>;
    defaultState?: SidebarMode;
    onStateChange?: (mode: SidebarMode) => void;
    thinSize?: number;
    toggleModes?: 'both' | 'single';
  }) &
    React.RefAttributes<HTMLDivElement>
> & { Handle: HandleComponent };

type _InspectorComponent = React.ForwardRefExoticComponent<PaneProps & React.RefAttributes<HTMLDivElement>> & { Handle: HandleComponent };

type _BottomComponent = React.ForwardRefExoticComponent<PaneProps & React.RefAttributes<HTMLDivElement>> & { Handle: HandleComponent };

const PANEL_DOM_PROP_KEYS = [
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
] as const satisfies readonly (keyof PanelPublicProps)[];

const Panel = assignShellSlot(
  React.forwardRef<HTMLDivElement, PanelPublicProps>((initialProps, ref) => {
    const {
      className,
      defaultOpen,
      open,
      onOpenChange,
      size,
      defaultSize,
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
      onSizeChange,
      sizeUpdate,
      sizeUpdateMs = 50,
    } = initialProps;
    const panelDomProps = extractPaneDomProps(initialProps, PANEL_DOM_PROP_KEYS);
    // Throttled/debounced emitter for onSizeChange
    const emitSizeChange = React.useMemo(() => {
      if (!onSizeChange) return () => {};
      if (sizeUpdate === 'debounce') {
        let t: any = null;
        const fn = (s: number, meta: PanelSizeChangeMeta) => {
          if (t) clearTimeout(t);
          t = setTimeout(() => {
            onSizeChange?.(s, meta);
          }, sizeUpdateMs);
        };
        return fn;
      }
      if (sizeUpdate === 'throttle') {
        let last = 0;
        return (s: number, meta: PanelSizeChangeMeta) => {
          const now = Date.now();
          if (now - last >= sizeUpdateMs) {
            last = now;
            onSizeChange?.(s, meta);
          }
        };
      }
      return (s: number, meta: PanelSizeChangeMeta) => onSizeChange?.(s, meta);
    }, [onSizeChange, sizeUpdate, sizeUpdateMs]);
    const shell = useShell();
    const prevPanelModeRef = React.useRef<PaneMode | null>(null);
    const prevLeftModeRef = React.useRef<PaneMode | null>(null);
    const initNotifiedRef = React.useRef(false);

    // Dev-only runtime guard
    if (process.env.NODE_ENV !== 'production') {
      if (typeof open !== 'undefined' && typeof defaultOpen !== 'undefined') {
        console.error('Shell.Panel: Do not pass both `open` and `defaultOpen`. Choose one.');
      }
      if (typeof size !== 'undefined' && typeof defaultSize !== 'undefined') {
        console.error('Shell.Panel: Do not pass both `size` and `defaultSize`. Choose one.');
      }
    }

    // Initialize uncontrolled open state from defaultOpen on first mount
    React.useEffect(() => {
      if (typeof open === 'undefined' && typeof defaultOpen === 'boolean') {
        if (defaultOpen) {
          // Ensure Left is expanded before expanding Panel
          shell.setLeftMode('expanded');
          shell.setPanelMode('expanded');
        } else {
          shell.setPanelMode('collapsed');
        }
      }
      // run only on mount
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Controlled sync: mirror shell state when `open` is provided
    React.useEffect(() => {
      if (typeof open === 'undefined') return;
      if (open) {
        if (shell.leftMode !== 'expanded') shell.setLeftMode('expanded');
        if (shell.panelMode !== 'expanded') shell.setPanelMode('expanded');
      } else {
        if (shell.panelMode !== 'collapsed') shell.setPanelMode('collapsed');
      }
    }, [shell, open]);

    // Dev-only warning if switching controlled/uncontrolled between renders
    React.useEffect(() => {
      const isControlled = typeof open !== 'undefined';
      (Panel as any)._wasControlled = (Panel as any)._wasControlled ?? isControlled;
      if ((Panel as any)._wasControlled !== isControlled) {
        console.warn('Shell.Panel: Switching between controlled and uncontrolled `open` is not supported.');
        (Panel as any)._wasControlled = isControlled;
      }
    }, [open]);

    // Notify init open
    React.useEffect(() => {
      if (initNotifiedRef.current) return;
      if (typeof open === 'undefined' && defaultOpen && shell.panelMode === 'expanded') {
        onOpenChange?.(true, { reason: 'init' });
        initNotifiedRef.current = true;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
    const handleChildren = childArray.filter((el: React.ReactElement) => React.isValidElement(el) && el.type === PanelHandle);
    const contentChildren = childArray.filter((el: React.ReactElement) => !(React.isValidElement(el) && el.type === PanelHandle));

    const isOverlay = shell.leftResolvedPresentation === 'overlay';

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
      // Bare number-like string
      const n = Number.parseFloat(str);
      return Number.isFinite(n) ? n : undefined;
    }, []);

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

    // Apply defaultSize on mount when uncontrolled
    React.useEffect(() => {
      if (!localRef.current) return;
      if (typeof size === 'undefined' && typeof defaultSize !== 'undefined') {
        const px = normalizeToPx(defaultSize);
        if (typeof px === 'number' && Number.isFinite(px)) {
          // Clamp to min/max if provided
          const minPx = typeof minSize === 'number' ? minSize : undefined;
          const maxPx = typeof maxSize === 'number' ? maxSize : undefined;
          const clamped = Math.min(maxPx ?? px, Math.max(minPx ?? px, px));
          localRef.current.style.setProperty('--panel-size', `${clamped}px`);
          emitSizeChange(clamped, { reason: 'init' });
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Controlled size sync
    React.useEffect(() => {
      if (!localRef.current) return;
      if (typeof size === 'undefined') return;
      const px = normalizeToPx(size);
      if (typeof px === 'number' && Number.isFinite(px)) {
        const minPx = typeof minSize === 'number' ? minSize : undefined;
        const maxPx = typeof maxSize === 'number' ? maxSize : undefined;
        const clamped = Math.min(maxPx ?? px, Math.max(minPx ?? px, px));
        localRef.current.style.setProperty('--panel-size', `${clamped}px`);
        emitSizeChange(clamped, { reason: 'controlled' });
      }
    }, [size, minSize, maxSize, normalizeToPx, emitSizeChange]);

    // Ensure Left container width is auto whenever Panel is expanded in fixed presentation
    React.useEffect(() => {
      if (!localRef.current) return;
      if (shell.leftResolvedPresentation !== 'overlay' && shell.leftMode === 'expanded' && shell.panelMode === 'expanded') {
        const leftEl = (localRef.current.parentElement as HTMLElement) || null;
        try {
          leftEl?.style.removeProperty('width');
        } catch {}
      }
    }, [shell.leftResolvedPresentation, shell.leftMode, shell.panelMode]);

    const isExpanded = shell.leftMode === 'expanded' && shell.panelMode === 'expanded';

    // Notify on internal toggles and left cascade
    React.useEffect(() => {
      const prevPanel = prevPanelModeRef.current;
      const prevLeft = prevLeftModeRef.current;
      if (prevPanel !== null && prevPanel !== shell.panelMode) {
        const open = shell.panelMode === 'expanded';
        let reason: PanelOpenChangeMeta['reason'] = 'toggle';
        if (prevLeft !== shell.leftMode && shell.leftMode === 'collapsed' && !open) {
          reason = 'left';
        }
        onOpenChange?.(open, { reason });
      }
      prevPanelModeRef.current = shell.panelMode;
      prevLeftModeRef.current = shell.leftMode;
    }, [shell.panelMode, shell.leftMode, onOpenChange]);

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
              emitSizeChange(size, { reason: 'resize' });
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
          {handleChildren.length > 0 ? handleChildren.map((el, i) => React.cloneElement(el, { key: el.key ?? i })) : <PaneHandle />}
        </PaneResizeContext.Provider>
      ) : null;

    return (
      <div
        {...panelDomProps}
        ref={setRef}
        className={classNames('rt-ShellPanel', className)}
        data-mode={shell.panelMode}
        data-visible={(shell.currentBreakpointReady && (isExpanded || (shell.leftResolvedPresentation !== 'overlay' && shell.peekTarget === 'panel'))) || undefined}
        data-peek={(shell.currentBreakpointReady && shell.leftResolvedPresentation !== 'overlay' && shell.peekTarget === 'panel') || undefined}
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
  }),
  'Shell.Panel',
) as PanelComponent;
Panel.displayName = 'Shell.Panel';
Panel.Handle = PanelHandle;

// Sidebar moved to ./_internal/shell-sidebar

// Content (always required)
interface ShellContentProps extends React.ComponentPropsWithoutRef<'main'> {}

const Content = React.forwardRef<HTMLElement, ShellContentProps>(({ className, ...props }, ref) => <main {...props} ref={ref} className={classNames('rt-ShellContent', className)} />);
Content.displayName = 'Shell.Content';
assignShellSlot(Content as any, 'Shell.Content');

// Inspector moved to ./_internal/shell-inspector

// Bottom
// Bottom moved to ./_internal/shell-bottom
// (Bottom implementation extracted)

// Trigger
// PaneTarget type moved to shell.types.ts
type TriggerAction = 'toggle' | 'expand' | 'collapse';

interface TriggerProps extends React.ComponentPropsWithoutRef<'button'> {
  target: PaneTarget;
  action?: TriggerAction;
  /**
   * Whether to show peek preview on hover when the target pane is collapsed.
   * Defaults to false.
   */
  peekOnHover?: boolean;
}

const Trigger = React.forwardRef<HTMLButtonElement, TriggerProps>(({ target, action = 'toggle', peekOnHover, onClick, onMouseEnter, onMouseLeave, children, ...props }, ref) => {
  const shell = useShell();

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);

      // Clear any active peek on this target before toggling to avoid sticky peek state
      if ((shell as any).peekTarget === target) {
        shell.clearPeek();
      }

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
      if (!peekOnHover || !isCollapsed) return;
      // Use the actual target for peek behavior (not mapped to left)
      shell.peekPane(target);
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
    <button {...props} ref={ref} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} data-shell-trigger={target} data-shell-action={action}>
      {children}
    </button>
  );
});
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
