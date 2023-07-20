import type { PropDef } from '../helpers';

const contentSizes = ['1', '2', '3', '4'] as const;

const popoverContentPropDefs = {
  size: { type: 'enum', values: contentSizes, default: '2', responsive: true },
} satisfies {
  size: PropDef<(typeof contentSizes)[number]>;
};

export { popoverContentPropDefs };
