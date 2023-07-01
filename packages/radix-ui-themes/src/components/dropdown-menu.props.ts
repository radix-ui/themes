import { ThemeAccentScale } from '../theme';

const dropdownMenuContentSizes = ['1', '2'] as const;
type DropdownMenuContentSize = (typeof dropdownMenuContentSizes)[number];
const dropdownMenuContentSizeDefault: DropdownMenuContentSize = '2';

const dropdownMenuContentVariants = ['solid', 'soft'] as const;
type DropdownMenuContentVariant = (typeof dropdownMenuContentVariants)[number];
const dropdownMenuContentVariantDefault: DropdownMenuContentVariant = 'solid';

const dropdownMenuContentColorDefault: ThemeAccentScale | undefined = undefined;
const dropdownMenuContentHighContrastDefault: boolean | undefined = undefined;

const dropdownMenuItemColorDefault: ThemeAccentScale | undefined = undefined;

export {
  dropdownMenuContentSizes,
  dropdownMenuContentSizeDefault,
  dropdownMenuContentVariants,
  dropdownMenuContentVariantDefault,
  dropdownMenuContentColorDefault,
  dropdownMenuContentHighContrastDefault,
  dropdownMenuItemColorDefault,
};
export type { DropdownMenuContentSize, DropdownMenuContentVariant };
