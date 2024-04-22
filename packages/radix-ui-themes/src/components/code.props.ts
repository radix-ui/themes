import {
  weightPropDef,
  accentColorPropDef,
  highContrastPropDef,
  textWrapPropDef,
  truncatePropDef,
} from '../props/index.js';
import { asChildPropDef } from '../props/as-child.prop.js';

import type { PropDef } from '../props/index.js';

const sizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
const variants = ['solid', 'soft', 'outline', 'ghost'] as const;

const codePropDefs = {
  ...asChildPropDef,
  size: {
    type: 'enum',
    className: 'rt-r-size',
    values: sizes,
    responsive: true,
  },
  variant: { type: 'enum', className: 'rt-variant', values: variants, default: 'soft' },
  ...weightPropDef,
  ...accentColorPropDef,
  ...highContrastPropDef,
  ...truncatePropDef,
  ...textWrapPropDef,
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
};

export { codePropDefs };
