import { asChildPropDef } from '../../props/as-child.prop.js';
import { colorPropDef } from '../../props/color.prop.js';
import { highContrastPropDef } from '../../props/high-contrast.prop.js';

import type { PropDef } from '../../props/prop-def.js';

const contentSizes = ['1', '2'] as const;
const contentVariants = ['solid', 'soft'] as const;
const panelBackgrounds = ['solid', 'translucent'] as const;
const materials = ['solid', 'translucent'] as const;
const submenuBehaviors = ['cascade', 'drill-down'] as const;

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
  material: {
    type: 'enum',
    values: materials,
    default: undefined,
  },
  /**
   * @deprecated Use `material` prop instead. This prop will be removed in a future version.
   */
  panelBackground: {
    type: 'enum',
    values: panelBackgrounds,
    default: undefined,
  },
  /**
   * Controls how submenus behave.
   * - `cascade`: Default cascading behavior where submenus open to the side (portal-based)
   * - `drill-down`: Mobile-friendly behavior where submenus replace the content inline
   * Supports responsive values: `{ initial: 'drill-down', md: 'cascade' }`
   */
  submenuBehavior: {
    type: 'enum',
    values: submenuBehaviors,
    default: 'cascade',
    responsive: true,
  },
  ...colorPropDef,
  ...highContrastPropDef,
} satisfies {
  size: PropDef<(typeof contentSizes)[number]>;
  variant: PropDef<(typeof contentVariants)[number]>;
  material: PropDef<(typeof materials)[number] | undefined>;
  panelBackground: PropDef<(typeof panelBackgrounds)[number] | undefined>;
  submenuBehavior: PropDef<(typeof submenuBehaviors)[number]>;
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
  submenuBehaviors,
};
