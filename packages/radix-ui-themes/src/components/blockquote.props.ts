import {
  asChildProp,
  highContrastProp,
  inheritedColorProp,
  textWrapProp,
  truncateProp,
  weightProp,
} from '../props/index.js';

import type { PropDef } from '../props/index.js';

const sizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;

const blockquotePropDefs = {
  asChild: asChildProp,
  size: {
    type: 'enum',
    className: 'rt-r-size',
    values: sizes,
    default: undefined,
    responsive: true,
  },
  weight: weightProp,
  color: inheritedColorProp,
  highContrast: highContrastProp,
  truncate: truncateProp,
  wrap: textWrapProp,
} satisfies {
  asChild: typeof asChildProp;
  size: PropDef<(typeof sizes)[number]>;
  weight: typeof weightProp;
  color: typeof inheritedColorProp;
  highContrast: typeof highContrastProp;
  truncate: typeof truncateProp;
  wrap: typeof textWrapProp;
};

export { blockquotePropDefs };
