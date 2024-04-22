import {
  textAlignPropDef,
  asChildPropDef,
  highContrastPropDef,
  colorPropDef,
  textWrapPropDef,
  leadingTrimPropDef,
  truncatePropDef,
  weightPropDef,
} from '../props/index.js';
import type { PropDef } from '../props/index.js';

const as = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
const sizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;

const headingPropDefs = {
  as: { type: 'enum', values: as, default: 'h1' },
  ...asChildPropDef,
  size: {
    type: 'enum',
    className: 'rt-r-size',
    values: sizes,
    default: '6',
    responsive: true,
  },
  ...weightPropDef,
  ...textAlignPropDef,
  ...leadingTrimPropDef,
  ...truncatePropDef,
  ...textWrapPropDef,
  ...colorPropDef,
  ...highContrastPropDef,
} satisfies {
  as: PropDef<(typeof as)[number]>;
  size: PropDef<(typeof sizes)[number]>;
};

export { headingPropDefs };
