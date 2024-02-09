import type { PropDef } from './prop-def.js';

const alignValues = ['left', 'center', 'right'] as const;

const alignProp = {
  type: 'enum',
  className: 'rt-r-ta',
  values: alignValues,
  default: undefined,
  responsive: true,
} satisfies PropDef<(typeof alignValues)[number]>;

export { alignProp };
