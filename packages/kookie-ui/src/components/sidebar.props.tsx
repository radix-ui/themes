import { asChildPropDef } from '../props/as-child.prop.js';
import { accentColorPropDef } from '../props/color.prop.js';
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
const sizes = ['1', '2', '3'] as const;
const variants = ['classic', 'surface', 'ghost'] as const;
const sides = ['left', 'right'] as const;
const collapsibleModes = ['icon', 'offcanvas', 'none'] as const;

const sidebarPropDefs = {
  ...asChildPropDef,
  size: { type: 'enum', className: 'rt-r-size', values: sizes, default: '2', responsive: true },
  variant: { type: 'enum', className: 'rt-variant', values: variants, default: 'surface' },
  side: { type: 'enum', className: 'rt-side', values: sides, default: 'left' },
  collapsible: { type: 'enum', className: 'rt-collapsible', values: collapsibleModes, default: 'icon' },
  floating: { type: 'boolean', className: 'rt-floating', default: false },
  ...accentColorPropDef,
  ...highContrastPropDef,
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
  side: PropDef<(typeof sides)[number]>;
  collapsible: PropDef<(typeof collapsibleModes)[number]>;
  floating: PropDef<boolean>;
};

export { sidebarPropDefs }; 