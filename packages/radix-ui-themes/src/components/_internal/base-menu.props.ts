import { asChildPropDef } from '../../props/as-child.prop';
import { colorPropDef } from '../../props/color.prop';
import { highContrastPropDef } from '../../props/high-contrast.prop';

import type { PropDef } from '../../props/prop-def';

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
  ...colorPropDef,
  ...highContrastPropDef,
} satisfies {
  size: PropDef<(typeof contentSizes)[number]>;
  variant: PropDef<(typeof contentVariants)[number]>;
};

const baseMenuItemPropDefs = {
  ...asChildPropDef,
  ...colorPropDef,
  shortcut: { type: 'string' },
} satisfies {
  shortcut: PropDef<string>;
};

const baseMenuCheckboxItemPropDefs = {
  ...colorPropDef,
  shortcut: { type: 'string' },
} satisfies {
  shortcut: PropDef<string>;
};

const baseMenuRadioItemPropDefs = {
  ...colorPropDef,
};

export {
  baseMenuContentPropDefs,
  baseMenuItemPropDefs,
  baseMenuCheckboxItemPropDefs,
  baseMenuRadioItemPropDefs,
};
