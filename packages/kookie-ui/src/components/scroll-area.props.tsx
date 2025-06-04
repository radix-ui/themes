import { asChildPropDef } from '../props/as-child.prop.js';
import { radiusPropDef } from '../props/radius.prop.js';

import type { PropDef } from '../props/prop-def.js';

const sizes = ['1', '2', '3'] as const;
const scrollbarsValues = ['vertical', 'horizontal', 'both'] as const;

const scrollAreaPropDefs = {
  ...asChildPropDef,
  size: { type: 'enum', className: 'rt-r-size', values: sizes, default: '1', responsive: true },
  ...radiusPropDef,
  scrollbars: { type: 'enum', values: scrollbarsValues, default: 'both' },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  scrollbars: PropDef<(typeof scrollbarsValues)[number]>;
};

export { scrollAreaPropDefs };
