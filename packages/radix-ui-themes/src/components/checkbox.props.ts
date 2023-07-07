import { colorProp, highContrastProp, radiusProp } from '../helpers';
import type { PropDef } from '../helpers';

const sizes = ['1', '2'] as const;
const variants = ['solid'] as const;

const checkboxPropDefs = {
  size: { type: 'enum', values: sizes, default: '1', responsive: true },
  variant: { type: 'enum', values: variants, default: 'solid' },
  color: colorProp,
  highContrast: highContrastProp,
  radius: radiusProp,
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
  color: typeof colorProp;
  highContrast: typeof highContrastProp;
  radius: typeof radiusProp;
};

export { checkboxPropDefs };
