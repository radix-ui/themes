import { textPropDefs } from './text.props';

const linkPropDefs = {
  size: textPropDefs.size,
  weight: textPropDefs.weight,
  trim: textPropDefs.trim,
  color: textPropDefs.color,
  highContrast: textPropDefs.highContrast,
} satisfies {
  size: typeof textPropDefs.size;
  weight: typeof textPropDefs.weight;
  trim: typeof textPropDefs.trim;
  color: typeof textPropDefs.color;
  highContrast: typeof textPropDefs.highContrast;
};

export { linkPropDefs };
