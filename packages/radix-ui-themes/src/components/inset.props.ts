import type { PropDef } from '../helpers';

const sides = ['all', 'x', 'y', 'top', 'bottom', 'left', 'right'] as const;
const paddingValues = ['current', '0'] as const;

const insetPropDefs = {
  side: { type: 'enum', values: sides, default: 'all', responsive: true },
  p: { type: 'enum', values: paddingValues, default: undefined, responsive: true },
  px: { type: 'enum', values: paddingValues, default: undefined, responsive: true },
  py: { type: 'enum', values: paddingValues, default: undefined, responsive: true },
  pt: { type: 'enum', values: paddingValues, default: undefined, responsive: true },
  pr: { type: 'enum', values: paddingValues, default: undefined, responsive: true },
  pb: { type: 'enum', values: paddingValues, default: undefined, responsive: true },
  pl: { type: 'enum', values: paddingValues, default: undefined, responsive: true },
} satisfies {
  side: PropDef<(typeof sides)[number]>;
  p: PropDef<(typeof paddingValues)[number]>;
  px: PropDef<(typeof paddingValues)[number]>;
  py: PropDef<(typeof paddingValues)[number]>;
  pt: PropDef<(typeof paddingValues)[number]>;
  pr: PropDef<(typeof paddingValues)[number]>;
  pb: PropDef<(typeof paddingValues)[number]>;
  pl: PropDef<(typeof paddingValues)[number]>;
};

export { insetPropDefs };
