import { Color } from '../helpers';

const contextMenuContentSizes = ['1', '2'] as const;
type ContextMenuContentSize = (typeof contextMenuContentSizes)[number];
const defaultContextMenuContentSize: ContextMenuContentSize = '2';

const contextMenuContentVariants = ['solid', 'soft'] as const;
type ContextMenuContentVariant = (typeof contextMenuContentVariants)[number];
const defaultContextMenuContentVariant: ContextMenuContentVariant = 'solid';

const defaultContextMenuContentColor: Color | undefined = undefined;
const defaultContextMenuContentHighContrast: boolean | undefined = undefined;

const defaultContextMenuItemColor: Color | undefined = undefined;

export {
  contextMenuContentSizes,
  defaultContextMenuContentSize,
  contextMenuContentVariants,
  defaultContextMenuContentVariant,
  defaultContextMenuContentColor,
  defaultContextMenuContentHighContrast,
  defaultContextMenuItemColor,
};
export type { ContextMenuContentSize, ContextMenuContentVariant };
