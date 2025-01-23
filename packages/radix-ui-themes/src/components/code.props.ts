import { asChildPropDef } from '../props/as-child.prop';
import { accentColorPropDef } from '../props/color.prop';
import { highContrastPropDef } from '../props/high-contrast.prop';
import { textWrapPropDef } from '../props/text-wrap.prop';
import { truncatePropDef } from '../props/truncate.prop';
import { weightPropDef } from '../props/weight.prop';

import type { PropDef } from '../props/prop-def';

const sizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
const variants = ['solid', 'soft', 'outline', 'ghost'] as const;

const codePropDefs = {
  ...asChildPropDef,
  size: {
    type: 'enum',
    className: 'rt-r-size',
    values: sizes,
    responsive: true,
  },
  variant: { type: 'enum', className: 'rt-variant', values: variants, default: 'soft' },
  ...weightPropDef,
  ...accentColorPropDef,
  ...highContrastPropDef,
  ...truncatePropDef,
  ...textWrapPropDef,
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
};

export { codePropDefs };
