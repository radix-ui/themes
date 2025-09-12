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

  // Sidebar presentation sequencing phase (library-managed)
  sidebarPhase?: 'idle' | 'hiding' | 'resizing' | 'showing';

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

export function useShell() {
  const ctx = React.useContext(ShellContext);
  if (!ctx) throw new Error('Shell components must be used within <Shell.Root>');
  return ctx;
}

export function ShellProvider({ value, children }: { value: ShellContextValue; children: React.ReactNode }) {
  return <ShellContext.Provider value={value}>{children}</ShellContext.Provider>;
}
