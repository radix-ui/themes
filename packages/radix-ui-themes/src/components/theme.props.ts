import { asChildPropDef } from '../props/as-child.prop.js';
import { accentColors, grayColors } from '../props/color.prop.js';
import { radii } from '../props/radius.prop.js';

import type { GetPropDefTypes, PropDef } from '../props/prop-def.js';

const appearances = ['inherit', 'light', 'dark'] as const;
const panelBackgrounds = ['solid', 'translucent'] as const;
const scalings = ['90%', '95%', '100%', '105%', '110%'] as const;

const themePropDefs = {
  ...asChildPropDef,
  /**
   * Whether to apply background color to the Theme element.
   *
   * Defaults to true for the root Theme and for Theme elements that
   * have an explicit light or dark appearance prop.
   */
  hasBackground: { type: 'boolean', default: true },
  /**
   * Sets the color scheme of the theme, typcially referred to as light and dark mode.
   *
   * @link
   * https://www.radix-ui.com/themes/docs/theme/dark-mode
   */
  appearance: { type: 'enum', values: appearances, default: 'inherit' },
  /**
   * Selects one of the accent color options to use in the Theme.
   *
   * @link
   * https://www.radix-ui.com/themes/docs/theme/color
   */
  accentColor: { type: 'enum', values: accentColors, default: 'indigo' },
  /**
   * Selects one of the gray color options to use in the Theme.
   *
   * @link
   * https://www.radix-ui.com/themes/docs/theme/color
   */
  grayColor: { type: 'enum', values: grayColors, default: 'auto' },
  /**
   * Controls whether to use a solid or translucent background color on panelled
   * elements such as Card or Table is solid or translucent.
   *
   * @link
   * https://www.radix-ui.com/themes/docs/theme/visual-style
   */
  panelBackground: { type: 'enum', values: panelBackgrounds, default: 'translucent' },
  /**
   * Sets the default radius of the components.
   *
   * @link
   * https://www.radix-ui.com/themes/docs/theme/visual-style
   */
  radius: { type: 'enum', values: radii, default: 'medium' },
  /**
   * Sets a scaling multiplier for values like spacing, font sizes, line heights, etc. are scaled.
   *
   * @link
   * https://www.radix-ui.com/themes/docs/theme/layout
   */
  scaling: { type: 'enum', values: scalings, default: '100%' },
} satisfies {
  hasBackground: PropDef<boolean>;
  appearance: PropDef<(typeof appearances)[number]>;
  accentColor: PropDef<(typeof accentColors)[number]>;
  grayColor: PropDef<(typeof grayColors)[number]>;
  panelBackground: PropDef<(typeof panelBackgrounds)[number]>;
  radius: PropDef<(typeof radii)[number]>;
  scaling: PropDef<(typeof scalings)[number]>;
};

type ThemeOwnProps = GetPropDefTypes<typeof themePropDefs & typeof asChildPropDef>;

export { themePropDefs };
export type { ThemeOwnProps };
