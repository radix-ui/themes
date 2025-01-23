import { asChildPropDef } from '../../props/as-child.prop.js';
import { accentColorPropDef } from '../../props/color.prop.js';
import { highContrastPropDef } from '../../props/high-contrast.prop.js';
import { radiusPropDef } from '../../props/radius.prop.js';

import type { PropDef } from '../../props/prop-def.js';

const sizes = ['1', '2', '3', '4'] as const;
const variants = ['classic', 'solid', 'soft', 'surface', 'outline', 'ghost'] as const;

const baseButtonPropDefs = {
  ...asChildPropDef,
  size: { type: 'enum', className: 'rt-r-size', values: sizes, default: '2', responsive: true },
  variant: { type: 'enum', className: 'rt-variant', values: variants, default: 'solid' },
  ...accentColorPropDef,
  ...highContrastPropDef,
  ...radiusPropDef,
  loading: { type: 'boolean', className: 'rt-loading', default: false },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
  loading: PropDef<boolean>;
};

export { baseButtonPropDefs };
