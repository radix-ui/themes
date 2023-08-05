import { colorProp, highContrastProp, radiusProp } from '../helpers';
import { PropDef } from '../helpers';

const sizes = ['1', '2', '3'] as const;
const variants = ['classic', 'surface', 'soft'] as const;

const switchPropDefs = {
  size: { type: 'enum', values: sizes, default: '2', responsive: true },
  variant: { type: 'enum', values: variants, default: 'surface' },
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

export { switchPropDefs };
