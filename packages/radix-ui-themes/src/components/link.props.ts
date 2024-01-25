import {
  colorProp,
  highContrastProp,
  textWrapProp,
  trimProp,
  truncateProp,
  weightProp,
} from '../helpers';
import { type PropDef } from '../helpers';

const sizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
const underline = ['auto', 'hover', 'always'] as const;

const linkPropDefs = {
  size: {
    type: 'enum',
    className: 'rt-r-size',
    values: sizes,
    default: undefined,
    responsive: true,
  },
  weight: weightProp,
  trim: trimProp,
  truncate: truncateProp,
  wrap: textWrapProp,
  underline: { type: 'enum', className: 'rt-underline', values: underline, default: 'auto' },
  color: colorProp,
  highContrast: highContrastProp,
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  weight: typeof weightProp;
  trim: typeof trimProp;
  truncate: typeof truncateProp;
  wrap: typeof textWrapProp;
  underline: PropDef<(typeof underline)[number]>;
  color: typeof colorProp;
  highContrast: typeof highContrastProp;
};

export { linkPropDefs };
