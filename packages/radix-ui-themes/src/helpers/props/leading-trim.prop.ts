import type { PropDef } from '..';

const trimValues = ['normal', 'start', 'end', 'both'] as const;

const trimProp = {
  type: 'enum',
  className: 'rt-r-trim',
  values: trimValues,
  default: undefined,
  responsive: true,
} satisfies PropDef<(typeof trimValues)[number]>;

export { trimProp };
