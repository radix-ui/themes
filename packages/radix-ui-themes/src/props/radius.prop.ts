import type { PropDef } from './prop-def.js';

const radii = ['none', 'small', 'medium', 'large', 'full'] as const;

const radiusProp = {
  radius: {
    type: 'enum',
    values: radii,
    default: undefined,
  },
} satisfies {
  radius: PropDef<(typeof radii)[number]>;
};

export { radiusProp, radii };
