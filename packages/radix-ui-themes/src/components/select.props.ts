import { colorProp, highContrastProp, radiusProp } from '../helpers/index.js';

import type { PropDef } from '../helpers/index.js';

const sizes = ['1', '2', '3'] as const;

const selectRootPropDefs = {
  size: { type: 'enum', className: 'rt-r-size', values: sizes, default: '2', responsive: true },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
};

const triggerVariants = ['classic', 'surface', 'soft', 'ghost'] as const;

const selectTriggerPropDefs = {
  variant: { type: 'enum', className: 'rt-variant', values: triggerVariants, default: 'surface' },
  color: colorProp,
  radius: radiusProp,
  placeholder: { type: 'string', default: undefined },
} satisfies {
  variant: PropDef<(typeof triggerVariants)[number]>;
  color: typeof colorProp;
  radius: typeof radiusProp;
  placeholder: PropDef<string>;
};

const contentVariants = ['solid', 'soft'] as const;

const selectContentPropDefs = {
  variant: { type: 'enum', className: 'rt-variant', values: contentVariants, default: 'solid' },
  color: colorProp,
  highContrast: highContrastProp,
} satisfies {
  variant: PropDef<(typeof contentVariants)[number]>;
  color: typeof colorProp;
  highContrast: typeof highContrastProp;
};

export { selectRootPropDefs, selectTriggerPropDefs, selectContentPropDefs };
