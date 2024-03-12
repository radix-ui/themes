import {
  weightProp,
  textAlignProp,
  leadingTrimProp,
  highContrastProp,
  inheritedColorProp,
  textWrapProp,
  truncateProp,
  asChildProp,
} from '../props/index.js';
import type { PropDef } from '../props/index.js';

const as = ['span', 'div', 'label', 'p'] as const;
const sizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;

const textPropDefs = {
  as: { type: 'enum', values: as, default: 'span' },
  ...asChildProp,
  size: {
    type: 'enum',
    className: 'rt-r-size',
    values: sizes,
    default: undefined,
    responsive: true,
  },
  ...weightProp,
  ...textAlignProp,
  ...leadingTrimProp,
  ...truncateProp,
  ...textWrapProp,
  ...inheritedColorProp,
  ...highContrastProp,
} satisfies {
  as: PropDef<(typeof as)[number]>;
  size: PropDef<(typeof sizes)[number]>;
};

export { textPropDefs };
