import { ThemeMode, ThemeAccentScale } from '../theme';

const contextMenuContentModeDefault: ThemeMode | undefined = undefined;

const contextMenuContentSizes = ['1', '2'] as const;
type ContextMenuContentSize = (typeof contextMenuContentSizes)[number];
const contextMenuContentSizeDefault: ContextMenuContentSize = '2';

const contextMenuContentVariants = ['solid', 'soft'] as const;
type ContextMenuContentVariant = (typeof contextMenuContentVariants)[number];
const contextMenuContentVariantDefault: ContextMenuContentVariant = 'solid';

const contextMenuContentColorDefault: ThemeAccentScale | undefined = undefined;
const contextMenuContentHighContrastDefault: boolean | undefined = undefined;

const contextMenuItemColorDefault: ThemeAccentScale | undefined = undefined;

export {
  contextMenuContentModeDefault,
  contextMenuContentSizes,
  contextMenuContentSizeDefault,
  contextMenuContentVariants,
  contextMenuContentVariantDefault,
  contextMenuContentColorDefault,
  contextMenuContentHighContrastDefault,
  contextMenuItemColorDefault,
};
export type { ContextMenuContentSize, ContextMenuContentVariant };
