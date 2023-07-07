import { weightProp, alignProp, trimProp, colorProp, highContrastProp } from '../helpers';
import type { PropDef } from '../helpers';

const sizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;

const textPropDefs = {
  size: { type: 'enum', values: sizes, default: undefined, responsive: true },
  weight: weightProp,
  align: alignProp,
  trim: trimProp,
  color: colorProp,
  highContrast: highContrastProp,
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  weight: typeof weightProp;
  align: typeof alignProp;
  trim: typeof trimProp;
  color: typeof colorProp;
  highContrast: typeof highContrastProp;
};

export { textPropDefs };
