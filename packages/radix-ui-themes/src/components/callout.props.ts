import { colorProp, highContrastProp } from '../helpers';
import type { PropDef } from '../helpers';

const sizes = ['1', '2', '3'] as const;
const variants = ['soft', 'surface', 'outline'] as const;

const calloutRootPropDefs = {
  size: { type: 'enum', values: sizes, default: '2', responsive: true },
  variant: { type: 'enum', values: variants, default: 'soft' },
  color: { ...colorProp, default: undefined },
  highContrast: highContrastProp,
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
  color: typeof colorProp;
  highContrast: typeof highContrastProp;
};

export { calloutRootPropDefs };
