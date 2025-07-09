import { asChildPropDef } from '../props/as-child.prop.js';
import { colorPropDef } from '../props/color.prop.js';
import { highContrastPropDef } from '../props/high-contrast.prop.js';

import type { PropDef } from '../props/prop-def.js';

// Re-export base menu props for sidebar menu components
export {
  baseMenuContentPropDefs as sidebarContentPropDefs,
  baseMenuItemPropDefs as sidebarItemPropDefs,
  baseMenuCheckboxItemPropDefs as sidebarCheckboxItemPropDefs,
  baseMenuRadioItemPropDefs as sidebarRadioItemPropDefs,
} from './_internal/base-menu.props.js';

// Sidebar container props
const sizes = ['1', '2'] as const;
const variants = ['soft', 'outline', 'surface', 'ghost'] as const;
const menuVariants = ['solid', 'soft'] as const;
const types = ['sidebar', 'floating'] as const;
const sides = ['left', 'right'] as const;
const collapsibleModes = ['offcanvas', 'icon', 'none'] as const;

const sidebarPropDefs = {
  ...asChildPropDef,
  size: { type: 'enum', className: 'rt-r-size', values: sizes, default: '2', responsive: true },
  variant: { type: 'enum', className: 'rt-variant', values: variants, default: 'outline' },
  menuVariant: {
    type: 'enum',
    className: 'rt-menu-variant',
    values: menuVariants,
    default: 'soft',
  },
  type: { type: 'enum', className: 'rt-type', values: types, default: 'sidebar' },
  side: { type: 'enum', className: 'rt-side', values: sides, default: 'left' },
  collapsible: {
    type: 'enum',
    className: 'rt-collapsible',
    values: collapsibleModes,
    default: 'offcanvas',
  },
  panelBackground: { type: 'enum', values: ['solid', 'translucent'], default: undefined },
  ...colorPropDef,
  ...highContrastPropDef,
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
  menuVariant: PropDef<(typeof menuVariants)[number]>;
  type: PropDef<(typeof types)[number]>;
  side: PropDef<(typeof sides)[number]>;
  collapsible: PropDef<(typeof collapsibleModes)[number]>;
  panelBackground: PropDef<'solid' | 'translucent'>;
};

export { sidebarPropDefs };
