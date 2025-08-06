import { colorPropDef } from '../props/color.prop.js';
import { highContrastPropDef } from '../props/high-contrast.prop.js';
import { radiusPropDef } from '../props/radius.prop.js';

import type { PropDef } from '../props/prop-def.js';

const sizes = ['1', '2', '3', '4'] as const;
const variants = ['surface', 'soft', 'outline'] as const;

const progressPropDefs = {
  size: { type: 'enum', className: 'rt-r-size', values: sizes, default: '2', responsive: true },
  variant: { type: 'enum', className: 'rt-variant', values: variants, default: 'surface' },
  ...colorPropDef,
  ...highContrastPropDef,
  ...radiusPropDef,
  duration: { type: 'string' },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
  duration: PropDef<string>;
};

export { progressPropDefs };
