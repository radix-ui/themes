import { Download01Icon, LayoutBottomIcon, CodeIcon, Settings01Icon, ColorsIcon, Grid02Icon, Layers01Icon, SwatchIcon, JoinRoundIcon, TextSquareIcon, LayoutIcon, Menu01Icon } from '@hugeicons/core-free-icons';

export interface NavigationBadge {
  content: string;
  highContrast: boolean;
  size: '1' | '2' | '3';
}

export interface NavigationItem {
  href: string;
  title: string;
  icon: any;
  badge?: NavigationBadge;
}

export interface NavigationGroup {
  label: string;
  items: NavigationItem[];
}

export const navigationGroups: NavigationGroup[] = [
  {
    label: 'Get Started',
    items: [{ href: '/docs/installation', title: 'Installation', icon: Download01Icon, badge: undefined }],
  },
  {
    label: 'Theme',
    items: [
      { href: '/docs/theme', title: 'Theme', icon: Settings01Icon, badge: undefined },
      { href: '/docs/colors', title: 'Colors', icon: ColorsIcon, badge: undefined },
      { href: '/docs/constants', title: 'Constants', icon: Grid02Icon, badge: { content: 'Alpha', highContrast: true, size: '1' } },
      { href: '/docs/shadows', title: 'Shadows', icon: Layers01Icon, badge: undefined },
      { href: '/docs/material', title: 'Material', icon: SwatchIcon, badge: { content: 'Alpha', highContrast: true, size: '1' } },
      { href: '/docs/radius', title: 'Radius', icon: JoinRoundIcon, badge: undefined },
      { href: '/docs/typography', title: 'Typography', icon: TextSquareIcon, badge: undefined },
    ],
  },
  {
    label: 'Components',
    items: [
      {
        href: '/docs/button',
        title: 'Button',
        icon: LayoutBottomIcon,
        badge: { content: 'Alpha', highContrast: true, size: '1' },
      },
      {
        href: '/docs/combobox',
        title: 'Combobox',
        icon: CodeIcon,
        badge: { content: 'Alpha', highContrast: true, size: '1' },
      },
      {
        href: '/docs/navbar',
        title: 'Navbar',
        icon: Menu01Icon,
        badge: { content: 'Alpha', highContrast: true, size: '1' },
      },
      {
        href: '/docs/segmented-control',
        title: 'Segmented Control',
        icon: LayoutBottomIcon,
        badge: { content: 'Alpha', highContrast: true, size: '1' },
      },
      {
        href: '/docs/shell',
        title: 'Shell',
        icon: LayoutIcon,
        badge: { content: 'Alpha', highContrast: true, size: '1' },
      },
      {
        href: '/docs/text-field',
        title: 'Text Field',
        icon: Grid02Icon,
        badge: { content: 'Alpha', highContrast: true, size: '1' },
      },
    ],
  },
];
