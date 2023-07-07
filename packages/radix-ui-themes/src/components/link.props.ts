import { weightProp, colorProp, highContrastProp } from '../helpers';
import type { PropDef } from '../helpers';

const sizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;

const linkPropDefs = {
  size: { type: 'enum', values: sizes, default: undefined, responsive: true },
  weight: weightProp,
  color: colorProp,
  highContrast: highContrastProp,
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  weight: typeof weightProp;
  color: typeof colorProp;
  highContrast: typeof highContrastProp;
};

export { linkPropDefs };
