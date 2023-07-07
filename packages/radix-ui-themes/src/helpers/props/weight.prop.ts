import type { PropDef } from '..';

const weights = ['light', 'regular', 'medium', 'bold'] as const;

const weightProp = {
  type: 'enum',
  values: weights,
  default: undefined,
  responsive: true,
} satisfies PropDef<(typeof weights)[number]>;

export { weightProp };
