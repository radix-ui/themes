import { asChildPropDef } from '../props/as-child.prop';
import { accentColorPropDef } from '../props/color.prop';
import { highContrastPropDef } from '../props/high-contrast.prop';

import type { PropDef } from '../props/prop-def';

const sizes = ['1', '2', '3'] as const;
const variants = ['soft', 'surface', 'outline'] as const;

const calloutRootPropDefs = {
  ...asChildPropDef,
  size: { type: 'enum', className: 'rt-r-size', values: sizes, default: '2', responsive: true },
  variant: { type: 'enum', className: 'rt-variant', values: variants, default: 'soft' },
  ...accentColorPropDef,
  ...highContrastPropDef,
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
};

export { calloutRootPropDefs };
