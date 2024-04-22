import {
  asChildPropDef,
  accentColorPropDef,
  highContrastPropDef,
  textWrapPropDef,
  leadingTrimPropDef,
  truncatePropDef,
  weightPropDef,
} from '../props/index.js';
import { type PropDef } from '../props/index.js';

const sizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
const underline = ['auto', 'always', 'hover', 'none'] as const;

const linkPropDefs = {
  ...asChildPropDef,
  size: {
    type: 'enum',
    className: 'rt-r-size',
    values: sizes,
    responsive: true,
  },
  ...weightPropDef,
  ...leadingTrimPropDef,
  ...truncatePropDef,
  ...textWrapPropDef,
  underline: { type: 'enum', className: 'rt-underline', values: underline, default: 'auto' },
  ...accentColorPropDef,
  ...highContrastPropDef,
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  underline: PropDef<(typeof underline)[number]>;
};

export { linkPropDefs };
