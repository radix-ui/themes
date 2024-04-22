import {
  asChildPropDef,
  accentColorPropDef,
  highContrastPropDef,
  radiusPropDef,
} from '../props/index.js';
import type { PropDef } from '../props/index.js';

const sizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
const variants = ['solid', 'soft'] as const;

const avatarPropDefs = {
  ...asChildPropDef,
  size: { type: 'enum', className: 'rt-r-size', values: sizes, default: '3', responsive: true },
  variant: { type: 'enum', className: 'rt-variant', values: variants, default: 'soft' },
  ...accentColorPropDef,
  ...highContrastPropDef,
  ...radiusPropDef,
  fallback: { type: 'ReactNode', required: true },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
  fallback: PropDef<React.ReactNode>;
};

export { avatarPropDefs };
