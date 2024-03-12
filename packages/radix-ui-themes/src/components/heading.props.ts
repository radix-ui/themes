import {
  textAlignProp,
  asChildProp,
  highContrastProp,
  inheritedColorProp,
  textWrapProp,
  leadingTrimProp,
  truncateProp,
  weightProp,
} from '../props/index.js';
import type { PropDef } from '../props/index.js';

const as = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
const sizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
const weights = weightProp.weight.values;

const headingPropDefs = {
  as: { type: 'enum', values: as, default: 'h1' },
  ...asChildProp,
  size: {
    type: 'enum',
    className: 'rt-r-size',
    values: sizes,
    default: '6',
    responsive: true,
  },
  weight: { ...weightProp.weight, default: 'bold' },
  ...textAlignProp,
  ...leadingTrimProp,
  ...truncateProp,
  ...textWrapProp,
  ...inheritedColorProp,
  ...highContrastProp,
} satisfies {
  as: PropDef<(typeof as)[number]>;
  size: PropDef<(typeof sizes)[number]>;
  weight: PropDef<(typeof weights)[number]>;
};

export { headingPropDefs };
