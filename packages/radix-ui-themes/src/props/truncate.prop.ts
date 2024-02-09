import type { PropDef } from './prop-def.js';

const truncateProp = {
  type: 'boolean',
  className: 'rt-truncate',
  default: undefined,
} satisfies PropDef<boolean>;

export { truncateProp };
