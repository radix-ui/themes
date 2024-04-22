import {
  asChildPropDef,
  highContrastPropDef,
  colorPropDef,
  textWrapPropDef,
  truncatePropDef,
  weightPropDef,
} from '../props/index.js';

import type { PropDef } from '../props/index.js';

const sizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;

const blockquotePropDefs = {
  ...asChildPropDef,
  size: {
    type: 'enum',
    className: 'rt-r-size',
    values: sizes,
    responsive: true,
  },
  ...weightPropDef,
  ...colorPropDef,
  ...highContrastPropDef,
  ...truncatePropDef,
  ...textWrapPropDef,
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
};

export { blockquotePropDefs };
