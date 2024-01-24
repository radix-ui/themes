import { colorProp, highContrastProp } from '../helpers';
import type { PropDef } from '../helpers';
import { gridPropDefs } from './grid.props';

const sizes = ['1', '2', '3'] as const;
const variants = ['surface', 'classic'] as const;

const radioCardGroupPropDefs = {
  size: { type: 'enum', className: 'rt-r-size', values: sizes, default: '2', responsive: true },
  variant: { type: 'enum', className: 'rt-variant', values: variants, default: 'surface' },
  color: colorProp,
  highContrast: highContrastProp,
  columns: gridPropDefs.columns,
  gap: { ...gridPropDefs.gap, default: '4' },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
  color: typeof colorProp;
  highContrast: typeof highContrastProp;
  columns: PropDef<(typeof gridPropDefs.columns.values)[number]>;
  gap: PropDef<(typeof gridPropDefs.gap.values)[number]>;
};

export { radioCardGroupPropDefs };
