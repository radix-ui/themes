import type { PropDef } from '../props/prop-def.js';

const positions = ['static', 'fixed', 'sticky'] as const;
const sizes = ['1', '2', '3'] as const;

const navbarRootPropDefs = {
  position: {
    type: 'enum',
    values: positions,
    default: 'fixed',
  },
  size: {
    type: 'enum',
    values: sizes,
    default: '2',
  },
} satisfies {
  position: PropDef<(typeof positions)[number]>;
  size: PropDef<(typeof sizes)[number]>;
};

export { navbarRootPropDefs };
