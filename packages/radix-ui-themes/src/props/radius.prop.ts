import type { PropDef } from './prop-def.js';

const radii = ['none', 'small', 'medium', 'large', 'full'] as const;

const radiusProp = {
  type: 'enum',
  values: radii,
  default: undefined,
} satisfies PropDef<(typeof radii)[number]>;

export { radiusProp, radii };
