import { colorProp, highContrastProp, radiusProp } from '../helpers';

import type { PropDef } from '../helpers';

const sizes = ['1', '2', '3'] as const;

const selectRootPropDefs = {
  size: { type: 'enum', values: sizes, default: '2', responsive: true },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
};

const triggerVariants = ['classic', 'surface', 'soft', 'ghost'] as const;

const selectTriggerPropDefs = {
  variant: { type: 'enum', values: triggerVariants, default: 'surface' },
  color: colorProp,
  radius: radiusProp,
} satisfies {
  variant: PropDef<(typeof triggerVariants)[number]>;
  color: typeof colorProp;
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
