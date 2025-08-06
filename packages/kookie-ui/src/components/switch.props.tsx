import { colorPropDef } from '../props/color.prop.js';
import { highContrastPropDef } from '../props/high-contrast.prop.js';

import type { PropDef } from '../props/prop-def.js';

const sizes = ['1', '2', '3', '4'] as const;
const variants = ['surface', 'soft', 'outline'] as const;
const panelBackgrounds = ['solid', 'translucent'] as const;
const materials = ['solid', 'translucent'] as const;

const switchPropDefs = {
  size: { type: 'enum', className: 'rt-r-size', values: sizes, default: '2', responsive: true },
  variant: { type: 'enum', className: 'rt-variant', values: variants, default: 'surface' },
  ...colorPropDef,
  ...highContrastPropDef,
  /**
   * Material type for visual rendering and depth effects
   * Controls how the switch renders its visual elements
   */
  material: { type: 'enum', values: materials, default: undefined },
  /**
   * Panel background type (deprecated)
   * @deprecated Use `material` prop instead. This prop will be removed in a future version.
   */
  panelBackground: { type: 'enum', values: panelBackgrounds, default: undefined },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
  material: PropDef<(typeof materials)[number] | undefined>;
  panelBackground: PropDef<(typeof panelBackgrounds)[number] | undefined>;
};

export { switchPropDefs };
