import { PropDef } from '../helpers';

const widths = ['command', 'shift', 'space'] as const;

const kbdPropDefs = {
  width: { type: 'enum', values: widths, default: undefined, responsive: true },
} satisfies {
  width: PropDef<(typeof widths)[number]>;
};

export { kbdPropDefs };
