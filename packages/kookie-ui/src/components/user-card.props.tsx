import { asChildPropDef } from '../props/as-child.prop.js';
import { accentColorPropDef } from '../props/color.prop.js';
import { highContrastPropDef } from '../props/high-contrast.prop.js';
import { radiusPropDef } from '../props/radius.prop.js';

import type { PropDef } from '../props/prop-def.js';

const sizes = ['1', '2', '3', '4'] as const;
const variants = ['ghost', 'surface', 'classic'] as const;
const avatarVariants = ['solid', 'soft', 'surface', 'outline'] as const;
const panelBackgrounds = ['solid', 'translucent'] as const;

const userCardPropDefs = {
  ...asChildPropDef,
  size: { type: 'enum', className: 'rt-r-size', values: sizes, default: '2', responsive: true },
  variant: { type: 'enum', className: 'rt-variant', values: variants, default: 'surface' },

  // Content props
  src: { type: 'string' },
  fallback: { type: 'ReactNode', required: true },
  name: { type: 'string', required: true },
  description: { type: 'string' },

  // Avatar styling
  avatarVariant: { type: 'enum', values: avatarVariants, default: 'soft' },
  ...radiusPropDef,

  // Card styling
  ...accentColorPropDef,
  ...highContrastPropDef,
  panelBackground: { type: 'enum', values: panelBackgrounds, default: undefined },
  flush: { type: 'boolean', default: false },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
  src: PropDef<string>;
  fallback: PropDef<React.ReactNode>;
  name: PropDef<string>;
  description: PropDef<string>;
  avatarVariant: PropDef<(typeof avatarVariants)[number]>;
  panelBackground: PropDef<(typeof panelBackgrounds)[number] | undefined>;
  flush: PropDef<boolean>;
};

export { userCardPropDefs };
