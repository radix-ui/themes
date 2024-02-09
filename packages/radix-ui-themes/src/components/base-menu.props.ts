import { asChildProp, colorProp, highContrastProp, inheritedColorProp } from '../props/index.js';
import type { PropDef } from '../props/index.js';

const contentSizes = ['1', '2'] as const;
const contentVariants = ['solid', 'soft'] as const;

const baseMenuContentPropDefs = {
  size: {
    type: 'enum',
    className: 'rt-r-size',
    values: contentSizes,
    default: '2',
    responsive: true,
  },
  variant: {
    type: 'enum',
    className: 'rt-variant',
    values: contentVariants,
    default: 'solid',
  },
  color: colorProp,
  highContrast: highContrastProp,
} satisfies {
  size: PropDef<(typeof contentSizes)[number]>;
  variant: PropDef<(typeof contentVariants)[number]>;
  color: typeof colorProp;
  highContrast: typeof highContrastProp;
};

const baseMenuItemPropDefs = {
  asChild: asChildProp,
  color: inheritedColorProp,
  shortcut: { type: 'string', default: undefined },
} satisfies {
  asChild: typeof asChildProp;
  color: typeof inheritedColorProp;
  shortcut: PropDef<string>;
};

const baseMenuCheckboxItemPropDefs = {
  color: inheritedColorProp,
  shortcut: { type: 'string', default: undefined },
} satisfies {
  color: typeof inheritedColorProp;
  shortcut: PropDef<string>;
};

const baseMenuRadioItemPropDefs = {
  color: inheritedColorProp,
} satisfies {
  color: typeof inheritedColorProp;
};

export {
  baseMenuContentPropDefs,
  baseMenuItemPropDefs,
  baseMenuCheckboxItemPropDefs,
  baseMenuRadioItemPropDefs,
};
