import type { Breakpoint, PaneMode } from '../shell.types.js';

type KeyList<T> = readonly (keyof T)[];

export function omitPaneProps<T extends object, K extends KeyList<T>>(source: T, keys: K) {
  const omitSet = new Set<keyof T>(keys as readonly (keyof T)[]);
  const result: Partial<T> = {};
  (Object.keys(source) as Array<keyof T>).forEach((key) => {
    if (!omitSet.has(key)) {
      // @ts-expect-error indexed access on object
      result[key] = (source as any)[key];
    }
  });
  return result as Omit<T, K[number]>;
}

const PANE_BASE_INTERNAL_PROPS = [
const PANE_BASE_INTERNAL_PROPS = [
  'presentation',
  'expandedSize',
  'minSize',
  'maxSize',
  'resizable',
  'collapsible',
  'onExpand',
  'onCollapse',
  'onResize',
  'resizer',
  'onResizeStart',
  'onResizeEnd',
  'snapPoints',
  'snapTolerance',
  'collapseThreshold',
  'paneId',
  'persistence',
] as const;

export function extractPaneDomProps<T extends object, Extra extends KeyList<T> | undefined = undefined>(source: T, extraKeys?: Extra) {
  const omitKeys = extraKeys ? [...PANE_BASE_INTERNAL_PROPS, ...extraKeys] : [...PANE_BASE_INTERNAL_PROPS];
  return omitPaneProps(source, omitKeys as ReadonlyArray<keyof T>);
}

export function mapResponsiveBooleanToPaneMode(value?: boolean | Partial<Record<Breakpoint, boolean>>): PaneMode | Partial<Record<Breakpoint, PaneMode>> | undefined {
  if (value == null) return undefined;
  if (typeof value === 'object') {
    const mapped: Partial<Record<Breakpoint, PaneMode>> = {};
    (Object.entries(value) as Array<[string, boolean]>).forEach(([bp, val]) => {
      if (typeof val === 'boolean') {
        mapped[bp as Breakpoint] = val ? 'expanded' : 'collapsed';
      }
    });
    return mapped;
  }
  return value ? 'expanded' : 'collapsed';
}
