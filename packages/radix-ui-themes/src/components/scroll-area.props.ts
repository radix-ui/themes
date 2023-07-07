import { radiusProp } from '../helpers';
import type { PropDef } from '../helpers';

const sizes = ['1', '2', '3'] as const;
const scrollbarsValues = ['vertical', 'horizontal', 'both'] as const;

const scrollAreaPropDefs = {
  size: { type: 'enum', values: sizes, default: '1', responsive: true },
  radius: radiusProp,
  scrollbars: { type: 'enum', values: scrollbarsValues, default: 'both' },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  radius: typeof radiusProp;
  scrollbars: PropDef<(typeof scrollbarsValues)[number]>;
};

export { scrollAreaPropDefs };
