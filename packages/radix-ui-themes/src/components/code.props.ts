import { weightProp, colorProp, highContrastProp } from '../helpers';
import type { PropDef } from '../helpers';

const sizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
const variants = ['solid', 'soft', 'outline', 'ghost'] as const;

const codePropDefs = {
  size: {
    type: 'enum',
    className: 'rt-r-size',
    values: sizes,
    default: undefined,
    responsive: true,
  },
  variant: { type: 'enum', className: 'rt-variant', values: variants, default: 'soft' },
  weight: weightProp,
  color: colorProp,
  highContrast: highContrastProp,
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
  weight: typeof weightProp;
  color: typeof colorProp;
  highContrast: typeof highContrastProp;
};

export { codePropDefs };
