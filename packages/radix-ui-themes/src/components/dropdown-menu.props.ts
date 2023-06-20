const dropdownMenuSizes = ['1', '2'] as const;
type DropdownMenuSize = (typeof dropdownMenuSizes)[number];
const defaultDropdownMenuSize: DropdownMenuSize = '2';

const dropdownMenuVariants = ['solid', 'solid-mono', 'subtle', 'subtle-mono'] as const;
type DropdownMenuVariant = (typeof dropdownMenuVariants)[number];
const defaultDropdownMenuVariant: DropdownMenuVariant = 'solid';

export {
  dropdownMenuSizes,
  defaultDropdownMenuSize,
  dropdownMenuVariants,
  defaultDropdownMenuVariant,
};
export type { DropdownMenuSize, DropdownMenuVariant };
