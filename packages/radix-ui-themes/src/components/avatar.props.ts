import { asChildProp, colorProp, highContrastProp, radiusProp } from '../props/index.js';
import type { PropDef } from '../props/index.js';

const sizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
const variants = ['solid', 'soft'] as const;

const avatarPropDefs = {
  ...asChildProp,
  size: { type: 'enum', className: 'rt-r-size', values: sizes, default: '3', responsive: true },
  variant: { type: 'enum', className: 'rt-variant', values: variants, default: 'soft' },
  color: colorProp,
  highContrast: highContrastProp,
  radius: radiusProp,
  fallback: { type: 'ReactNode', default: undefined, required: true },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
  color: typeof colorProp;
  highContrast: typeof highContrastProp;
  radius: typeof radiusProp;
  fallback: PropDef<React.ReactNode>;
};

export { avatarPropDefs };
