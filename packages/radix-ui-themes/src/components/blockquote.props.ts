import { textPropDefs } from './text.props';

const blockquotePropDefs = {
  size: textPropDefs.size,
  weight: textPropDefs.weight,
  color: textPropDefs.color,
  highContrast: textPropDefs.highContrast,
} satisfies {
  size: typeof textPropDefs.size;
  weight: typeof textPropDefs.weight;
  color: typeof textPropDefs.color;
  highContrast: typeof textPropDefs.highContrast;
};

export { blockquotePropDefs };
