import { baseButtonPropDefs } from './base-button.props';
import { colorProp, highContrastProp, radiusProp } from '../helpers';

import type { PropDef } from '../helpers';

const sizes = ['1', '2'] as const;
const variants = baseButtonPropDefs.variant.values;

const selectRootPropDefs = {
  size: { type: 'enum', values: sizes, default: '2', responsive: true },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
};

const selectTriggerPropDefs = {
  variant: { ...baseButtonPropDefs.variant, default: 'solid' },
  color: baseButtonPropDefs.color,
  highContrast: baseButtonPropDefs.highContrast,
  radius: radiusProp,
} satisfies {
  variant: PropDef<(typeof variants)[number]>;
  color: typeof baseButtonPropDefs.color;
  highContrast: typeof baseButtonPropDefs.highContrast;
  radius: typeof radiusProp;
};

const contentVariants = ['solid', 'soft'] as const;

const selectContentPropDefs = {
  variant: { type: 'enum', values: contentVariants, default: 'solid' },
  color: colorProp,
  highContrast: highContrastProp,
} satisfies {
  variant: PropDef<(typeof contentVariants)[number]>;
  color: typeof colorProp;
  highContrast: typeof highContrastProp;
};

export { selectRootPropDefs, selectTriggerPropDefs, selectContentPropDefs };
