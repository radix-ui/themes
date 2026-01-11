import type * as React from 'react';

export type PresentationValue = 'fixed' | 'overlay' | 'stacked';

export type ResponsivePresentation = PresentationValue | Partial<Record<'initial' | 'xs' | 'sm' | 'md' | 'lg' | 'xl', PresentationValue>>;

export type PaneMode = 'expanded' | 'collapsed';
export type SidebarMode = 'collapsed' | 'thin' | 'expanded';

export type ResponsiveMode = PaneMode | Partial<Record<'initial' | 'xs' | 'sm' | 'md' | 'lg' | 'xl', PaneMode>>;

export type ResponsiveSidebarMode = SidebarMode | Partial<Record<'initial' | 'xs' | 'sm' | 'md' | 'lg' | 'xl', SidebarMode>>;

export type Responsive<T> = T | Partial<Record<'initial' | 'xs' | 'sm' | 'md' | 'lg' | 'xl', T>>;

export type PaneSizePersistence = {
  load?: () => number | Promise<number | undefined> | undefined;
  save?: (size: number) => void | Promise<void>;
};

export interface PaneBaseProps extends React.ComponentPropsWithoutRef<'div'> {
  presentation?: ResponsivePresentation;
  expandedSize?: number;
  minSize?: number;
  maxSize?: number;
  height?: string | number;
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

export const _BREAKPOINTS = {
  xs: '(min-width: 520px)',
  sm: '(min-width: 768px)',
  md: '(min-width: 1024px)',
  lg: '(min-width: 1280px)',
  xl: '(min-width: 1640px)',
} as const;

export type Breakpoint = 'initial' | keyof typeof _BREAKPOINTS;

export type PaneTarget = 'left' | 'rail' | 'panel' | 'sidebar' | 'inspector' | 'bottom';

/**
 * CSS custom property key type for type-safe style objects.
 * Allows any string prefixed with '--'.
 */
export type CSSCustomProperty = `--${string}`;

/**
 * Style object that supports CSS custom properties.
 */
export type CSSPropertiesWithVars = React.CSSProperties & {
  [key: CSSCustomProperty]: string | number | undefined;
};
