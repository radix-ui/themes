import { asChildPropDef } from '../props/as-child.prop.js';
import { accentColorPropDef } from '../props/color.prop.js';
import { highContrastPropDef } from '../props/high-contrast.prop.js';
import { radiusPropDef } from '../props/radius.prop.js';

import type { PropDef } from '../props/prop-def.js';

const sizes = ['1', '2', '3', '4'] as const;
const variants = ['solid', 'soft', 'surface', 'outline', 'ghost', 'classic'] as const;
const panelBackgrounds = ['solid', 'translucent'] as const;
const materials = ['solid', 'translucent'] as const;

const badgePropDefs = {
  ...asChildPropDef,
  size: { type: 'enum', className: 'rt-r-size', values: sizes, default: '1', responsive: true },
  variant: { type: 'enum', className: 'rt-variant', values: variants, default: 'soft' },
  ...accentColorPropDef,
  ...highContrastPropDef,
  ...radiusPropDef,
  material: { type: 'enum', values: materials, default: undefined },
  /**
   * @deprecated Use `material` prop instead. This prop will be removed in a future version.
   */
  panelBackground: { type: 'enum', values: panelBackgrounds, default: undefined },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
  material: PropDef<(typeof materials)[number] | undefined>;
  panelBackground: PropDef<(typeof panelBackgrounds)[number] | undefined>;
};

export { badgePropDefs };
