import type { PropDef } from './prop-def.js';

const trimValues = ['normal', 'start', 'end', 'both'] as const;

const trimProp = {
  type: 'enum',
  className: 'rt-r-lt',
  values: trimValues,
  default: undefined,
  responsive: true,
} satisfies PropDef<(typeof trimValues)[number]>;

export { trimProp };
