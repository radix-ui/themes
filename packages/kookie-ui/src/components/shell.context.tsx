import * as React from 'react';
import type { Breakpoint, PresentationValue, SidebarMode, PaneMode, PaneTarget } from './shell.types.js';

export interface ShellContextValue {
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
  onRailDefaults?: (size: number) => void;
  onPanelDefaults?: (size: number) => void;
}

const ShellContext = React.createContext<ShellContextValue | null>(null);

/** @internal Shell root context. Prefer slice hooks (useSidebarMode, useShellActions, etc.). */
export function useShell() {
  const ctx = React.useContext(ShellContext);
  if (!ctx) throw new Error('Shell components must be used within <Shell.Root>');
  return ctx;
}

export function ShellProvider({ value, children }: { value: ShellContextValue; children: React.ReactNode }) {
  return <ShellContext.Provider value={value}>{children}</ShellContext.Provider>;
}

// Phase 7: Split contexts for render isolation

// Pane mode slice contexts
type ModeSetter<T> = (mode: T) => void;

export const LeftModeContext = React.createContext<{ leftMode: PaneMode; setLeftMode: ModeSetter<PaneMode> } | null>(null);
export function useLeftMode() {
  const ctx = React.useContext(LeftModeContext);
  if (!ctx) throw new Error('useLeftMode must be used within Shell.Root');
  return ctx;
}

export const PanelModeContext = React.createContext<{ panelMode: PaneMode; setPanelMode: ModeSetter<PaneMode> } | null>(null);
export function usePanelMode() {
  const ctx = React.useContext(PanelModeContext);
  if (!ctx) throw new Error('usePanelMode must be used within Shell.Root');
  return ctx;
}

export const SidebarModeContext = React.createContext<{ sidebarMode: SidebarMode; setSidebarMode: ModeSetter<SidebarMode> } | null>(null);
export function useSidebarMode() {
  const ctx = React.useContext(SidebarModeContext);
  if (!ctx) throw new Error('useSidebarMode must be used within Shell.Root');
  return ctx;
}

export const InspectorModeContext = React.createContext<{ inspectorMode: PaneMode; setInspectorMode: ModeSetter<PaneMode> } | null>(null);
export function useInspectorMode() {
  const ctx = React.useContext(InspectorModeContext);
  if (!ctx) throw new Error('useInspectorMode must be used within Shell.Root');
  return ctx;
}

export const BottomModeContext = React.createContext<{ bottomMode: PaneMode; setBottomMode: ModeSetter<PaneMode> } | null>(null);
export function useBottomMode() {
  const ctx = React.useContext(BottomModeContext);
  if (!ctx) throw new Error('useBottomMode must be used within Shell.Root');
  return ctx;
}

// Presentation slice
export const PresentationContext = React.createContext<{ currentBreakpoint: Breakpoint; currentBreakpointReady: boolean; leftResolvedPresentation?: PresentationValue } | null>(null);
export function usePresentation() {
  const ctx = React.useContext(PresentationContext);
  if (!ctx) throw new Error('usePresentation must be used within Shell.Root');
  return ctx;
}

// Peek slice
export const PeekContext = React.createContext<{ peekTarget: PaneTarget | null; setPeekTarget: (t: PaneTarget | null) => void; peekPane: (t: PaneTarget) => void; clearPeek: () => void } | null>(
  null,
);
export function usePeek() {
  const ctx = React.useContext(PeekContext);
  if (!ctx) throw new Error('usePeek must be used within Shell.Root');
  return ctx;
}

// Actions slice (stable callbacks)
export const ActionsContext = React.createContext<{
  togglePane: (t: PaneTarget) => void;
  expandPane: (t: PaneTarget) => void;
  collapsePane: (t: PaneTarget) => void;
  setSidebarToggleComputer?: (fn: (current: SidebarMode) => SidebarMode) => void;
} | null>(null);
export function useShellActions() {
  const ctx = React.useContext(ActionsContext);
  if (!ctx) throw new Error('useShellActions must be used within Shell.Root');
  return ctx;
}

// Composition slice
export const CompositionContext = React.createContext<{ hasLeft: boolean; setHasLeft: (v: boolean) => void; hasSidebar: boolean; setHasSidebar: (v: boolean) => void } | null>(null);
export function useComposition() {
  const ctx = React.useContext(CompositionContext);
  if (!ctx) throw new Error('useComposition must be used within Shell.Root');
  return ctx;
}

// Inset slice - tracks which panes have inset for gray backdrop
export type InsetPaneId = 'left' | 'sidebar' | 'content' | 'inspector' | 'bottom';
export const InsetContext = React.createContext<{
  insetPanes: Set<InsetPaneId>;
  registerInset: (id: InsetPaneId) => void;
  unregisterInset: (id: InsetPaneId) => void;
  hasAnyInset: boolean;
} | null>(null);
export function useInset() {
  const ctx = React.useContext(InsetContext);
  if (!ctx) throw new Error('useInset must be used within Shell.Root');
  return ctx;
}
