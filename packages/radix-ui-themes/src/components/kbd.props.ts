import { asChildPropDef } from '../props/index.js';
import type { PropDef } from '../props/index.js';

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
