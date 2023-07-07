import { weightProp, alignProp, trimProp, colorProp, highContrastProp } from '../helpers';
import type { PropDef } from '../helpers';

const sizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
const weights = weightProp.values;

const headingPropDefs = {
  size: { type: 'enum', values: sizes, default: '6', responsive: true },
  weight: { ...weightProp, default: 'bold' },
  align: alignProp,
  trim: trimProp,
  color: colorProp,
  highContrast: highContrastProp,
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  weight: PropDef<(typeof weights)[number]>;
  align: typeof alignProp;
  trim: typeof trimProp;
  color: typeof colorProp;
  highContrast: typeof highContrastProp;
};

export { headingPropDefs };
