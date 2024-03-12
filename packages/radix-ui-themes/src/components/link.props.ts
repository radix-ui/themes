import {
  asChildProp,
  colorProp,
  highContrastProp,
  textWrapProp,
  leadingTrimProp,
  truncateProp,
  weightProp,
} from '../props/index.js';
import { type PropDef } from '../props/index.js';

const sizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
const underline = ['auto', 'always', 'hover', 'none'] as const;

const linkPropDefs = {
  ...asChildProp,
  size: {
    type: 'enum',
    className: 'rt-r-size',
    values: sizes,
    default: undefined,
    responsive: true,
  },
  ...weightProp,
  ...leadingTrimProp,
  ...truncateProp,
  ...textWrapProp,
  underline: { type: 'enum', className: 'rt-underline', values: underline, default: 'auto' },
  ...colorProp,
  ...highContrastProp,
} satisfies {
  size: PropDef<(typeof sizes)[number]>;

  underline: PropDef<(typeof underline)[number]>;
};

export { linkPropDefs };
