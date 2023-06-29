import { Color } from '../helpers';

const dropdownMenuContentSizes = ['1', '2'] as const;
type DropdownMenuContentSize = (typeof dropdownMenuContentSizes)[number];
const defaultDropdownMenuContentSize: DropdownMenuContentSize = '2';

const dropdownMenuContentVariants = ['solid', 'subtle'] as const;
type DropdownMenuContentVariant = (typeof dropdownMenuContentVariants)[number];
const defaultDropdownMenuContentVariant: DropdownMenuContentVariant = 'solid';

const defaultDropdownMenuContentColor: Color | undefined = undefined;
const defaultDropdownMenuContentHighContrast: boolean | undefined = undefined;

const defaultDropdownMenuItemColor: Color | undefined = undefined;

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
