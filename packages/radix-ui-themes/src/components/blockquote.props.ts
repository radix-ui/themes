import { asChildPropDef } from '../props/as-child.prop';
import { colorPropDef } from '../props/color.prop';
import { highContrastPropDef } from '../props/high-contrast.prop';
import { textWrapPropDef } from '../props/text-wrap.prop';
import { truncatePropDef } from '../props/truncate.prop';
import { weightPropDef } from '../props/weight.prop';

import type { PropDef } from '../props/prop-def';

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
