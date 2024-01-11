import type { PropDef } from '..';

const sizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;

const textSize = {
  type: 'enum',
  values: sizes,
  default: undefined,
  responsive: true,
} satisfies PropDef<(typeof sizes)[number]>;

export { textSize };
