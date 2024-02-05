import {
  alignProp,
  asChildProp,
  highContrastProp,
  inheritedColorProp,
  textWrapProp,
  trimProp,
  truncateProp,
  weightProp,
} from '../helpers/index.js';
import type { PropDef } from '../helpers/index.js';

const as = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
const sizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
const weights = weightProp.values;

const headingPropDefs = {
  as: { type: 'enum', values: as, default: 'h1' },
  asChild: asChildProp,
  size: {
    type: 'enum',
    className: 'rt-r-size',
    values: sizes,
    default: '6',
    responsive: true,
  },
  weight: { ...weightProp, default: 'bold' },
  align: alignProp,
  trim: trimProp,
  truncate: truncateProp,
  wrap: textWrapProp,
  color: inheritedColorProp,
  highContrast: highContrastProp,
} satisfies {
  as: PropDef<(typeof as)[number]>;
  asChild: typeof asChildProp;
  size: PropDef<(typeof sizes)[number]>;
  weight: PropDef<(typeof weights)[number]>;
  align: typeof alignProp;
  trim: typeof trimProp;
  truncate: typeof truncateProp;
  wrap: typeof textWrapProp;
  color: typeof inheritedColorProp;
  highContrast: typeof highContrastProp;
};

export { headingPropDefs };
