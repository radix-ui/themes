import type { PropDef } from './prop-def';

const truncatePropDef = {
  truncate: {
    type: 'boolean',
    className: 'rt-truncate',
  },
} satisfies {
  truncate: PropDef<boolean>;
};

export { truncatePropDef };
