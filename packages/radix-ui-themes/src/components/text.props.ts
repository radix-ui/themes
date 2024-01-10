import { weightProp, alignProp, trimProp, colorProp, highContrastProp } from '../helpers';
import { textSize } from '../helpers/props/text-size.prop';

const textPropDefs = {
  size: textSize,
  weight: weightProp,
  align: alignProp,
  trim: trimProp,
  color: colorProp,
  highContrast: highContrastProp,
} satisfies {
  size: typeof textSize;
  weight: typeof weightProp;
  align: typeof alignProp;
  trim: typeof trimProp;
  color: typeof colorProp;
  highContrast: typeof highContrastProp;
};

export { textPropDefs };
