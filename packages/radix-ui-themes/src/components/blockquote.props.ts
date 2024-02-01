import { asChildProp } from '../helpers/props/as-child.prop';
import { textPropDefs } from './text.props';

const blockquotePropDefs = {
  asChild: asChildProp,
  size: textPropDefs.size,
  weight: textPropDefs.weight,
  color: textPropDefs.color,
  highContrast: textPropDefs.highContrast,
} satisfies {
  asChild: typeof asChildProp;
  size: typeof textPropDefs.size;
  weight: typeof textPropDefs.weight;
  color: typeof textPropDefs.color;
  highContrast: typeof textPropDefs.highContrast;
};

export { blockquotePropDefs };
