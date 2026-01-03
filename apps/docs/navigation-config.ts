import type { DocsNavigationConfig } from '@kushagradhawan/kookie-blocks';
import {
  Download01Icon,
  LayoutBottomIcon,
  Settings01Icon,
  ColorsIcon,
  Grid02Icon,
  Layers01Icon,
  SwatchIcon,
  JoinRoundIcon,
  TextSquareIcon,
  LayoutIcon,
  InputCursorTextIcon,
  LayoutTopIcon,
  DropdownFieldTypeIcon,
} from '@hugeicons/core-free-icons';

export const docsNavigation: DocsNavigationConfig = {
  groups: [
    {
      label: 'Get Started',
      items: [{ href: '/docs/installation', title: 'Installation', icon: Download01Icon }],
    },
    {
      label: 'Theme',
      items: [
        { href: '/docs/theme', title: 'Theme', icon: Settings01Icon },
        { href: '/docs/colors', title: 'Colors', icon: ColorsIcon },
        { href: '/docs/constants', title: 'Constants', icon: Grid02Icon, badge: 'Alpha' },
        { href: '/docs/shadows', title: 'Shadows', icon: Layers01Icon },
        { href: '/docs/material', title: 'Material', icon: SwatchIcon, badge: 'Alpha' },
        { href: '/docs/radius', title: 'Radius', icon: JoinRoundIcon },
        { href: '/docs/typography', title: 'Typography', icon: TextSquareIcon },
      ],
    },
    {
      label: 'Components',
      items: [
        {
          href: '/docs/button',
          title: 'Button',
          icon: LayoutBottomIcon,
          badge: 'Alpha',
        },
        {
          href: '/docs/combobox',
          title: 'Combobox',
          icon: DropdownFieldTypeIcon,
          badge: 'Alpha',
        },
        {
          href: '/docs/icon-button',
          title: 'Icon Button',
          icon: LayoutBottomIcon,
          badge: 'Alpha',
        },
        {
          href: '/docs/navbar',
          title: 'Navbar',
          icon: LayoutTopIcon,
          badge: 'Alpha',
        },
        {
          href: '/docs/segmented-control',
          title: 'Segmented Control',
          icon: LayoutBottomIcon,
          badge: 'Alpha',
        },
        {
          href: '/docs/shell',
          title: 'Shell',
          icon: LayoutIcon,
          badge: 'Alpha',
        },
        {
          href: '/docs/text-field',
          title: 'Text Field',
          icon: InputCursorTextIcon,
          badge: 'Alpha',
        },
        {
          href: '/docs/toggle-button',
          title: 'Toggle Button',
          icon: LayoutBottomIcon,
          badge: 'Alpha',
        },
        {
          href: '/docs/toggle-icon-button',
          title: 'Toggle Icon Button',
          icon: LayoutBottomIcon,
          badge: 'Alpha',
        },
      ],
    },
  ],
};
