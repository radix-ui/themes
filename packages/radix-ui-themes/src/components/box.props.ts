import { asChildProp } from '../helpers/index.js';
import type { PropDef } from '../helpers/index.js';

const as = ['div', 'span'] as const;
const displayValues = ['none', 'inline', 'inline-block', 'block'] as const;

const boxPropDefs = {
  as: { type: 'enum', values: as, default: 'div' },
  asChild: asChildProp,
  display: {
    type: 'enum',
    className: 'rt-r-display',
    values: displayValues,
    default: undefined,
    responsive: true,
  },
} satisfies {
  as: PropDef<(typeof as)[number]>;
  asChild: typeof asChildProp;
  display: PropDef<(typeof displayValues)[number]>;
};

export { boxPropDefs };
