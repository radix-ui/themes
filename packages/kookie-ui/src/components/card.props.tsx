import { asChildPropDef } from '../props/as-child.prop.js';

import type { PropDef } from '../props/prop-def.js';

const sizes = ['1', '2', '3', '4', '5'] as const;
const variants = ['surface', 'outline', 'classic', 'ghost', 'soft'] as const;
const panelBackgrounds = ['solid', 'translucent'] as const;
const materials = ['solid', 'translucent'] as const;

const cardPropDefs = {
  ...asChildPropDef,
  size: { type: 'enum', className: 'rt-r-size', values: sizes, default: '1', responsive: true },
  variant: { type: 'enum', className: 'rt-variant', values: variants, default: 'outline' },
  panelBackground: { type: 'enum', values: panelBackgrounds, default: undefined },
  material: { type: 'enum', values: materials, default: undefined },
  flush: { type: 'boolean', default: false },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
  panelBackground: PropDef<(typeof panelBackgrounds)[number] | undefined>;
  material: PropDef<(typeof materials)[number] | undefined>;
  flush: PropDef<boolean>;
};

export { cardPropDefs };
