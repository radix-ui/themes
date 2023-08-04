import type { PropDef } from '../helpers';

const sizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;

const kbdPropDefs = {
  size: { type: 'enum', values: sizes, default: undefined, responsive: true },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
};

export { kbdPropDefs };
