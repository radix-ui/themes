import { asChildProp } from '../props/as-child.prop.js';
import { textPropDefs } from './text.props.js';

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
