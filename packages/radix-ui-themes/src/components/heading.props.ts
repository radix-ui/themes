import { asChildPropDef } from '../props/as-child.prop';
import { colorPropDef } from '../props/color.prop';
import { highContrastPropDef } from '../props/high-contrast.prop';
import { leadingTrimPropDef } from '../props/leading-trim.prop';
import { textAlignPropDef } from '../props/text-align.prop';
import { textWrapPropDef } from '../props/text-wrap.prop';
import { truncatePropDef } from '../props/truncate.prop';
import { weightPropDef } from '../props/weight.prop';

import type { PropDef } from '../props/prop-def';

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
