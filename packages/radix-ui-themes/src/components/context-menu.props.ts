const contextMenuSizes = ['1', '2'] as const;
type ContextMenuSize = (typeof contextMenuSizes)[number];
const defaultContextMenuSize: ContextMenuSize = '2';

const contextMenuVariants = ['solid', 'solid-mono', 'subtle', 'subtle-mono'] as const;
type ContextMenuVariant = (typeof contextMenuVariants)[number];
const defaultContextMenuVariant: ContextMenuVariant = 'solid';

export { contextMenuSizes, defaultContextMenuSize, contextMenuVariants, defaultContextMenuVariant };
export type { ContextMenuSize, ContextMenuVariant };
