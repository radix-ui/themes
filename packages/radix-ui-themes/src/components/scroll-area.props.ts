import { asChildProp, radiusProp } from '../helpers/index.js';
import type { PropDef } from '../helpers/index.js';

const sizes = ['1', '2', '3'] as const;
const scrollbarsValues = ['vertical', 'horizontal', 'both'] as const;

const scrollAreaPropDefs = {
  asChild: asChildProp,
  size: { type: 'enum', className: 'rt-r-size', values: sizes, default: '1', responsive: true },
  radius: radiusProp,
  scrollbars: { type: 'enum', values: scrollbarsValues, default: 'both' },
} satisfies {
  asChild: typeof asChildProp;
  size: PropDef<(typeof sizes)[number]>;
  radius: typeof radiusProp;
  scrollbars: PropDef<(typeof scrollbarsValues)[number]>;
};

export { scrollAreaPropDefs };
