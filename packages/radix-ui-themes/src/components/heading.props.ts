import {
  alignProp,
  highContrastProp,
  inheritedColorProp,
  textWrapProp,
  trimProp,
  truncateProp,
  weightProp,
} from '../helpers';
import type { PropDef } from '../helpers';

const sizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
const weights = weightProp.values;

const headingPropDefs = {
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
