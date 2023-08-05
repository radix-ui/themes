import { colorProp, highContrastProp, radiusProp } from '../helpers';
import type { PropDef } from '../helpers';

const sizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
const variants = ['solid', 'soft'] as const;

const avatarPropDefs = {
  size: { type: 'enum', values: sizes, default: '3', responsive: true },
  variant: { type: 'enum', values: variants, default: 'soft' },
  color: { ...colorProp, default: undefined },
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
