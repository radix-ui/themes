const kbdWidths = ['command', 'shift', 'space'] as const;
type KbdWidth = (typeof kbdWidths)[number];
const defaultKbdWidth: KbdWidth | undefined = undefined;

export { kbdWidths, defaultKbdWidth };
export type { KbdWidth };
