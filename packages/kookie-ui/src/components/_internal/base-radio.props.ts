import { colorPropDef } from '../../props/color.prop.js';
import { highContrastPropDef } from '../../props/high-contrast.prop.js';

import type { PropDef } from '../../props/prop-def.js';

const sizes = ['1', '2', '3'] as const;
const variants = ['classic', 'solid', 'soft', 'outline', 'surface'] as const;
const materials = ['solid', 'translucent'] as const;

const baseRadioPropDefs = {
  size: { type: 'enum', className: 'rt-r-size', values: sizes, default: '2', responsive: true },
  variant: { type: 'enum', className: 'rt-variant', values: variants, default: 'solid' },
  material: { type: 'enum', values: materials, default: undefined },
  ...colorPropDef,
  ...highContrastPropDef,
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
  material: PropDef<(typeof materials)[number] | undefined>;
};

export { baseRadioPropDefs };
