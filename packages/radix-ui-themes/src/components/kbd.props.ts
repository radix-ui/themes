import { asChildProp } from '../props/index.js';
import type { PropDef } from '../props/index.js';

const sizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;

const kbdPropDefs = {
  ...asChildProp,
  size: {
    type: 'enum',
    className: 'rt-r-size',
    values: sizes,
    default: undefined,
    responsive: true,
  },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
};

export { kbdPropDefs };
