import { asChildPropDef } from '../props/as-child.prop';
import { accentColorPropDef } from '../props/color.prop';
import { highContrastPropDef } from '../props/high-contrast.prop';
import { leadingTrimPropDef } from '../props/leading-trim.prop';
import { textWrapPropDef } from '../props/text-wrap.prop';
import { truncatePropDef } from '../props/truncate.prop';
import { weightPropDef } from '../props/weight.prop';

import type { PropDef } from '../props/prop-def';

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
