import { asChildPropDef } from '../props/as-child.prop.js';

import type { PropDef } from '../props/prop-def.js';

const positions = ['static', 'fixed', 'sticky'] as const;
const heights = ['56', '64', '72'] as const;

const navbarRootPropDefs = {
  position: {
    type: 'enum',
    values: positions,
    default: 'fixed',
  },
  height: {
    type: 'enum',
    values: heights,
    default: '64',
  },
} satisfies {
  position: PropDef<(typeof positions)[number]>;
  height: PropDef<(typeof heights)[number]>;
};

const navbarSlotPropDefs = {
  ...asChildPropDef,
} satisfies {
  asChild: PropDef<boolean>;
};

export { navbarRootPropDefs, navbarSlotPropDefs };
