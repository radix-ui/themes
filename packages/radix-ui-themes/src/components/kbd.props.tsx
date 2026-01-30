import { asChildPropDef } from '../props/as-child.prop.js';

import type { PropDef } from '../props/prop-def.js';

const sizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
const variants = ['classic', 'soft'] as const;

const kbdPropDefs = {
  ...asChildPropDef,
  size: {
    type: 'enum',
    className: 'rt-r-size',
    values: sizes,
    responsive: true,
  },
  variant: {
    type: 'enum',
    className: 'rt-variant',
    values: variants,
    default: 'classic',
  },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
};

export { kbdPropDefs };
