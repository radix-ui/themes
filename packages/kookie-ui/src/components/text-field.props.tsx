import { colorPropDef } from '../props/color.prop.js';
import { paddingPropDefs } from '../props/padding.props.js';
import { radiusPropDef } from '../props/radius.prop.js';
import { flexPropDefs } from './flex.props.js';

import type { PropDef } from '../props/prop-def.js';

const sizes = ['1', '2', '3'] as const;
const variants = ['classic', 'surface', 'soft'] as const;

const textFieldRootPropDefs = {
  size: { type: 'enum', className: 'rt-r-size', values: sizes, default: '2', responsive: true },
  variant: { type: 'enum', className: 'rt-variant', values: variants, default: 'surface' },
  ...colorPropDef,
  ...radiusPropDef,
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
};

const sides = ['left', 'right'] as const;

const textFieldSlotPropDefs = {
  side: { type: 'enum', values: sides },
  ...colorPropDef,
  gap: flexPropDefs.gap,
  px: paddingPropDefs.px,
  pl: paddingPropDefs.pl,
  pr: paddingPropDefs.pr,
} satisfies {
  side: PropDef<(typeof sides)[number]>;
  gap: typeof flexPropDefs.gap;
  px: typeof paddingPropDefs.px;
  pl: typeof paddingPropDefs.pl;
  pr: typeof paddingPropDefs.pr;
};

export { textFieldRootPropDefs, textFieldSlotPropDefs };
