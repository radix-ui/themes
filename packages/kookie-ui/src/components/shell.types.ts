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

export const BREAKPOINTS = {
  xs: '(min-width: 520px)',
  sm: '(min-width: 768px)',
  md: '(min-width: 1024px)',
  lg: '(min-width: 1280px)',
  xl: '(min-width: 1640px)',
} as const;

export type Breakpoint = 'initial' | keyof typeof BREAKPOINTS;

export type PaneTarget = 'left' | 'rail' | 'panel' | 'sidebar' | 'inspector' | 'bottom';
