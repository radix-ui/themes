import { asChildPropDef } from '../props/as-child.prop.js';

import type { PropDef } from '../props/prop-def.js';

const sizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;

const kbdPropDefs = {
  ...asChildPropDef,
  size: {
    type: 'enum',
    className: 'rt-r-size',
    values: sizes,
    responsive: true,
  },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
};

export { kbdPropDefs };
