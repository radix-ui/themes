import { asChildProp, colorProp, highContrastProp } from '../helpers';
import type { PropDef } from '../helpers';

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
  color: colorProp,
  shortcut: { type: 'string', default: undefined },
} satisfies {
  asChild: typeof asChildProp;
  color: typeof colorProp;
  shortcut: PropDef<string>;
};

const baseMenuCheckboxItemPropDefs = {
  color: colorProp,
  shortcut: { type: 'string', default: undefined },
} satisfies {
  color: typeof colorProp;
  shortcut: PropDef<string>;
};

const baseMenuRadioItemPropDefs = {
  color: colorProp,
} satisfies {
  color: typeof colorProp;
};

export {
  baseMenuContentPropDefs,
  baseMenuItemPropDefs,
  baseMenuCheckboxItemPropDefs,
  baseMenuRadioItemPropDefs,
};
