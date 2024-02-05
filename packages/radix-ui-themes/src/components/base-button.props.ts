import { asChildProp, colorProp, highContrastProp, radiusProp } from '../helpers/index.js';
import type { PropDef } from '../helpers/index.js';

const sizes = ['1', '2', '3', '4'] as const;
const variants = ['classic', 'solid', 'soft', 'surface', 'outline', 'ghost'] as const;

const baseButtonPropDefs = {
  asChild: asChildProp,
  size: { type: 'enum', className: 'rt-r-size', values: sizes, default: '2', responsive: true },
  variant: { type: 'enum', className: 'rt-variant', values: variants, default: 'solid' },
  color: colorProp,
  highContrast: highContrastProp,
  radius: radiusProp,
  loading: { type: 'boolean', className: 'rt-loading', default: false },
} satisfies {
  asChild: typeof asChildProp;
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
  color: typeof colorProp;
  highContrast: typeof highContrastProp;
  radius: typeof radiusProp;
  loading: PropDef<boolean>;
};

export { baseButtonPropDefs };
