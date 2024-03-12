import type { PropDef } from './prop-def.js';

const truncatePropDef = {
  truncate: {
    type: 'boolean',
    className: 'rt-truncate',
    default: undefined,
  },
} satisfies {
  truncate: PropDef<boolean>;
};

export { truncatePropDef };
