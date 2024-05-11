import { asChildPropDef } from '../props/as-child.prop.js';
import { colorPropDef } from '../props/color.prop.js';
import { highContrastPropDef } from '../props/high-contrast.prop.js';
import { textWrapPropDef } from '../props/text-wrap.prop.js';
import { truncatePropDef } from '../props/truncate.prop.js';
import { weightPropDef } from '../props/weight.prop.js';

import type { PropDef } from '../props/prop-def.js';

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
