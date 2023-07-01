const kbdWidths = ['command', 'shift', 'space'] as const;
type KbdWidth = (typeof kbdWidths)[number];
const kbdWidthDefault: KbdWidth | undefined = undefined;

export { kbdWidths, kbdWidthDefault };
export type { KbdWidth };
