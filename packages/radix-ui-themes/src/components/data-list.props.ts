import { widthPropDefs, trimProp } from '../helpers';
import type { PropDef } from '../helpers';

const alignValues = ['start', 'center', 'end', 'baseline', 'stretch'] as const;
const gapValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
const orientationValues = ['horizontal', 'vertical'] as const;
const sizes = ['1', '2', '3'] as const;
const widthValues = ['1', '2', '3'] as const;

const dataListPropDefs = {
  gap: {
    type: 'enum | string',
    className: 'rt-r-gap',
    customProperties: ['--gap'],
    values: gapValues,
    default: '4',
    responsive: true,
  },
  gapX: {
    type: 'enum | string',
    className: 'rt-r-cg',
    customProperties: ['--column-gap'],
    values: gapValues,
    default: undefined,
    responsive: true,
  },
  gapY: {
    type: 'enum | string',
    className: 'rt-r-rg',
    customProperties: ['--row-gap'],
    values: gapValues,
    default: undefined,
    responsive: true,
  },
  orientation: {
    type: 'enum',
    className: 'rt-r-dl-orient',
    values: orientationValues,
    default: 'horizontal',
    responsive: true,
  },
  size: {
    type: 'enum',
    className: 'rt-r-size',
    values: sizes,
    default: '2',
    responsive: true,
  },
  trim: {
    ...trimProp,
    className: 'rt-r-dl-trim', // Custom trim styles due to grid layout
  },
} satisfies {
  orientation?: PropDef<(typeof orientationValues)[number]>;
  gap?: PropDef<(typeof gapValues)[number]>;
  gapX?: PropDef<(typeof gapValues)[number]>;
  gapY?: PropDef<(typeof gapValues)[number]>;
  size?: PropDef<(typeof sizes)[number]>;
  trim?: typeof trimProp;
};

const dataListItemPropDefs = {
  align: {
    type: 'enum',
    className: 'rt-r-ai',
    values: alignValues,
    default: undefined,
    responsive: true,
  },
} satisfies {
  align?: PropDef<(typeof alignValues)[number]>;
};

const dataListLabelPropDefs = widthPropDefs;

export { dataListPropDefs, dataListItemPropDefs, dataListLabelPropDefs };
