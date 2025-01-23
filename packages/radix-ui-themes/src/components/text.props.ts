import { asChildPropDef } from '../props/as-child.prop';
import { colorPropDef } from '../props/color.prop';
import { highContrastPropDef } from '../props/high-contrast.prop';
import { leadingTrimPropDef } from '../props/leading-trim.prop';
import { textAlignPropDef } from '../props/text-align.prop';
import { textWrapPropDef } from '../props/text-wrap.prop';
import { truncatePropDef } from '../props/truncate.prop';
import { weightPropDef } from '../props/weight.prop';

import type { PropDef } from '../props/prop-def';

const as = ['span', 'div', 'label', 'p'] as const;
const sizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;

const textPropDefs = {
  as: { type: 'enum', values: as, default: 'span' },
  ...asChildPropDef,
  size: {
    type: 'enum',
    className: 'rt-r-size',
    values: sizes,
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

export { textPropDefs };
