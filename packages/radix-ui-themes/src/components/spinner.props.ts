import { colorProp, highContrastProp, radiusProp } from '../helpers';
import type { PropDef } from '../helpers';

const sizes = ['1', '2', '3'] as const;

const spinnerPropDefs = {
  size: { type: 'enum', values: sizes, default: '2', responsive: true },
  color: { ...colorProp, default: undefined },
  highContrast: highContrastProp,
  radius: radiusProp,
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  color: typeof colorProp;
  highContrast: typeof highContrastProp;
  radius: typeof radiusProp;
};

export { spinnerPropDefs };
