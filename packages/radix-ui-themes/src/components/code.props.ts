import {
  weightProp,
  colorProp,
  highContrastProp,
  textWrapProp,
  truncateProp,
} from '../props/index.js';
import { asChildProp } from '../props/as-child.prop.js';

import type { PropDef } from '../props/index.js';

const sizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
const variants = ['solid', 'soft', 'outline', 'ghost'] as const;

const codePropDefs = {
  ...asChildProp,
  size: {
    type: 'enum',
    className: 'rt-r-size',
    values: sizes,
    default: undefined,
    responsive: true,
  },
  variant: { type: 'enum', className: 'rt-variant', values: variants, default: 'soft' },
  ...weightProp,
  ...colorProp,
  ...highContrastProp,
  ...truncateProp,
  ...textWrapProp,
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
};

export { codePropDefs };
