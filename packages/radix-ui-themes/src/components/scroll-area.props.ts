import type { ThemeRadius } from '../theme-options';

const scrollAreaSizes = ['1', '2', '3'] as const;
type ScrollAreaSize = (typeof scrollAreaSizes)[number];
const scrollAreaSizeDefault: ScrollAreaSize = '1';

const scrollAreaRadiusDefault: ThemeRadius | undefined = undefined;

const scrollAreaScrollbarsValues = ['vertical', 'horizontal', 'both'] as const;
type ScrollAreaScrollbars = (typeof scrollAreaScrollbarsValues)[number];
const scrollAreaScrollbarsDefault: ScrollAreaScrollbars = 'both';

export {
  scrollAreaSizes,
  scrollAreaSizeDefault,
  scrollAreaRadiusDefault,
  scrollAreaScrollbarsValues,
  scrollAreaScrollbarsDefault,
};
export type { ScrollAreaSize, ScrollAreaScrollbars };
