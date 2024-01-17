import { PropDef } from '../helpers';

const orientationValues = ['horizontal', 'vertical'] as const;
const gapValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
const alignValues = ['start', 'center', 'end', 'baseline'] as const;
const sizes = ['1', '2', '3'] as const;

export const dataListPropDefs = {
  columns: {
    type: 'string',
    default: undefined,
    responsive: true,
  },
  orientation: {
    type: 'enum',
    className: 'rt-r-o',
    values: orientationValues,
    default: 'horizontal',
    responsive: true,
  },
  gap: { type: 'enum', className: 'rt-r-gap', values: gapValues, default: '4', responsive: true },
  gapX: {
    type: 'enum',
    className: 'rt-r-cg',
    values: gapValues,
    default: undefined,
    responsive: true,
  },
  gapY: {
    type: 'enum',
    className: 'rt-r-rg',
    values: gapValues,
    default: undefined,
    responsive: true,
  },
  size: {
    type: 'enum',
    values: sizes,
    default: '2',
    responsive: true,
  },
} satisfies {
  columns?: PropDef<'string'>;
  orientation?: PropDef<(typeof orientationValues)[number]>;
  gap?: PropDef<(typeof gapValues)[number]>;
  gapX?: PropDef<(typeof gapValues)[number]>;
  gapY?: PropDef<(typeof gapValues)[number]>;
  size?: PropDef<(typeof sizes)[number]>;
};

export const dataListItemPropDefs = {
  align: {
    type: 'enum',
    className: 'rt-r-vaf',
    values: alignValues,
    default: 'baseline',
    responsive: true,
  },
} satisfies {
  align?: PropDef<(typeof alignValues)[number]>;
};
