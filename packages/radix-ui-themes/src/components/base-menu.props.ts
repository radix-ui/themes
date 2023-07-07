import { colorProp, highContrastProp } from '../helpers';
import type { PropDef } from '../helpers';

const contentSizes = ['1', '2'] as const;
const contentVariants = ['solid', 'soft'] as const;

const baseMenuContentPropDefs = {
  size: { type: 'enum', values: contentSizes, default: '2', responsive: true },
  variant: { type: 'enum', values: contentVariants, default: 'solid' },
  color: colorProp,
  highContrast: highContrastProp,
} satisfies {
  size: PropDef<(typeof contentSizes)[number]>;
  variant: PropDef<(typeof contentVariants)[number]>;
  color: typeof colorProp;
  highContrast: typeof highContrastProp;
};

const baseMenuItemPropDefs = {
  color: colorProp,
} satisfies {
  color: typeof colorProp;
};

export { baseMenuContentPropDefs, baseMenuItemPropDefs };
