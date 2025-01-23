import { colorPropDef } from '../props/color.prop';
import { highContrastPropDef } from '../props/high-contrast.prop';
import { radiusPropDef } from '../props/radius.prop';

import type { PropDef } from '../props/prop-def';

const sizes = ['1', '2', '3'] as const;
const variants = ['classic', 'surface', 'soft'] as const;

const switchPropDefs = {
  size: { type: 'enum', className: 'rt-r-size', values: sizes, default: '2', responsive: true },
  variant: { type: 'enum', className: 'rt-variant', values: variants, default: 'surface' },
  ...colorPropDef,
  ...highContrastPropDef,
  ...radiusPropDef,
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
};

export { switchPropDefs };
