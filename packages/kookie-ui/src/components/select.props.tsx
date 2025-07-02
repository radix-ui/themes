import { colorPropDef } from '../props/color.prop.js';
import { highContrastPropDef } from '../props/high-contrast.prop.js';
import { radiusPropDef } from '../props/radius.prop.js';

import type { PropDef } from '../props/prop-def.js';

const sizes = ['1', '2', '3'] as const;

const selectRootPropDefs = {
  size: { type: 'enum', className: 'rt-r-size', values: sizes, default: '2', responsive: true },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
};

const triggerVariants = ['classic', 'surface', 'soft', 'outline', 'ghost'] as const;

const selectTriggerPropDefs = {
  variant: { type: 'enum', className: 'rt-variant', values: triggerVariants, default: 'surface' },
  panelBackground: {
    type: 'enum',
    className: 'rt-panel-background',
    values: ['solid', 'translucent'],
  },
  ...colorPropDef,
  ...radiusPropDef,
  placeholder: { type: 'string' },
} satisfies {
  variant: PropDef<(typeof triggerVariants)[number]>;
  panelBackground: PropDef<'solid' | 'translucent'>;
  placeholder: PropDef<string>;
};

const contentVariants = ['solid', 'soft'] as const;

const selectContentPropDefs = {
  variant: { type: 'enum', className: 'rt-variant', values: contentVariants, default: 'solid' },
  ...colorPropDef,
  ...highContrastPropDef,
} satisfies {
  variant: PropDef<(typeof contentVariants)[number]>;
};

export { selectRootPropDefs, selectTriggerPropDefs, selectContentPropDefs };
