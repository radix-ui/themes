import { colorPropDef } from '../props/color.prop.js';
import { paddingPropDefs } from '../props/padding.props.js';
import { radiusPropDef } from '../props/radius.prop.js';
import { flexPropDefs } from './flex.props.js';

import type { PropDef } from '../props/prop-def.js';

const sizes = ['1', '2', '3'] as const;
const variants = ['classic', 'surface', 'soft', 'ghost', 'outline'] as const;
const panelBackgrounds = ['solid', 'translucent'] as const;
const materials = ['solid', 'translucent'] as const;

const textFieldRootPropDefs = {
  size: { type: 'enum', className: 'rt-r-size', values: sizes, default: '2', responsive: true },
  variant: { type: 'enum', className: 'rt-variant', values: variants, default: 'surface' },
  // Error and validation props
  error: { type: 'boolean', default: false },
  errorMessage: { type: 'string', default: undefined },
  isInvalid: { type: 'boolean', default: false },
  required: { type: 'boolean', default: false },
  // Accessibility props
  'aria-describedby': { type: 'string', default: undefined },
  'aria-labelledby': { type: 'string', default: undefined },
  ...colorPropDef,
  ...radiusPropDef,
  panelBackground: { type: 'enum', values: panelBackgrounds, default: undefined },
  material: { type: 'enum', values: materials, default: undefined },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
  error: PropDef<boolean>;
  errorMessage: PropDef<string | undefined>;
  isInvalid: PropDef<boolean>;
  required: PropDef<boolean>;
  'aria-describedby': PropDef<string | undefined>;
  'aria-labelledby': PropDef<string | undefined>;
  panelBackground: PropDef<(typeof panelBackgrounds)[number] | undefined>;
  material: PropDef<(typeof materials)[number] | undefined>;
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
