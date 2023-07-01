import { ThemeAccentScale } from '../theme';

const dropdownMenuContentSizes = ['1', '2'] as const;
type DropdownMenuContentSize = (typeof dropdownMenuContentSizes)[number];
const defaultDropdownMenuContentSize: DropdownMenuContentSize = '2';

const dropdownMenuContentVariants = ['solid', 'soft'] as const;
type DropdownMenuContentVariant = (typeof dropdownMenuContentVariants)[number];
const defaultDropdownMenuContentVariant: DropdownMenuContentVariant = 'solid';

const defaultDropdownMenuContentColor: ThemeAccentScale | undefined = undefined;
const defaultDropdownMenuContentHighContrast: boolean | undefined = undefined;

const defaultDropdownMenuItemColor: ThemeAccentScale | undefined = undefined;

export {
  dropdownMenuContentSizes,
  defaultDropdownMenuContentSize,
  dropdownMenuContentVariants,
  defaultDropdownMenuContentVariant,
  defaultDropdownMenuContentColor,
  defaultDropdownMenuContentHighContrast,
  defaultDropdownMenuItemColor,
};
export type { DropdownMenuContentSize, DropdownMenuContentVariant };
