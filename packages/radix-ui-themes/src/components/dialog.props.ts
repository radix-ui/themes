import type { PropDef } from '../helpers';

const contentSizes = ['1', '2', '3', '4'] as const;

const dialogContentPropDefs = {
  size: { type: 'enum', values: contentSizes, default: '3', responsive: true },
} satisfies {
  size: PropDef<(typeof contentSizes)[number]>;
};

export { dialogContentPropDefs };
