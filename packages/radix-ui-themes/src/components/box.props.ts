const boxDisplayValues = ['none', 'inline', 'inline-block', 'block'] as const;
type BoxDisplay = (typeof boxDisplayValues)[number];

export { boxDisplayValues };
export type { BoxDisplay };
