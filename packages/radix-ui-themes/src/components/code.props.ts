import { colorProp, highContrastProp } from '../helpers';
import type { PropDef } from '../helpers';

const sizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
const variants = ['solid', 'soft', 'outline', 'plain'] as const;
const weights = ['normal', 'bold'] as const;

const codePropDefs = {
  size: { type: 'enum', values: sizes, default: undefined, responsive: true },
  variant: { type: 'enum', values: variants, default: 'soft' },
  weight: { type: 'enum', values: weights, default: 'normal', responsive: true },
  color: colorProp,
  highContrast: highContrastProp,
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
  weight: PropDef<(typeof weights)[number]>;
  color: typeof colorProp;
  highContrast: typeof highContrastProp;
};

export { codePropDefs };
